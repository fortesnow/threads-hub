import { useState, useEffect } from 'react';

interface FetchOptions extends RequestInit {
  params?: Record<string, string>;
}

export function useApi<T>(endpoint: string, options?: FetchOptions) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      
      // URLパラメータの構築
      let url = `${apiUrl}${endpoint}`;
      if (options?.params) {
        const queryParams = new URLSearchParams();
        Object.entries(options.params).forEach(([key, value]) => {
          queryParams.append(key, value);
        });
        url += `?${queryParams.toString()}`;
      }
      
      // リクエストオプションの構築
      const requestOptions: RequestInit = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        ...options,
      };
      
      // パラメータは既にURLに含まれているためオプションからは削除
      delete requestOptions.params;
      
      // 認証トークンの追加
      const token = localStorage.getItem('auth_token');
      if (token) {
        requestOptions.headers = {
          ...requestOptions.headers,
          'Authorization': `Bearer ${token}`,
        };
      }
      
      const response = await fetch(url, requestOptions);
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }
      
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [endpoint, JSON.stringify(options)]);

  // 再取得用関数
  const refetch = () => {
    fetchData();
  };

  return { data, error, loading, refetch };
}

export async function apiClient<T>(
  endpoint: string,
  method: string = 'GET',
  data?: any,
  params?: Record<string, string>
): Promise<T> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
  
  // URLパラメータの構築
  let url = `${apiUrl}${endpoint}`;
  if (params) {
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      queryParams.append(key, value);
    });
    url += `?${queryParams.toString()}`;
  }
  
  // リクエストオプションの構築
  const requestOptions: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };
  
  // 認証トークンの追加
  const token = localStorage.getItem('auth_token');
  if (token) {
    requestOptions.headers = {
      ...requestOptions.headers,
      'Authorization': `Bearer ${token}`,
    };
  }
  
  // リクエストボディの追加
  if (method !== 'GET' && method !== 'HEAD' && data) {
    requestOptions.body = JSON.stringify(data);
  }
  
  try {
    const response = await fetch(url, requestOptions);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
} 