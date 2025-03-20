'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { apiClient } from '../hooks/useApi';

interface User {
  id: string;
  username: string;
  email: string;
  name: string;
  isAdmin: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: Error | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

interface RegisterData {
  username: string;
  email: string;
  password: string;
  name: string;
}

interface LoginResponse {
  token: string;
  user: User;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // 初期化時にローカルストレージからトークンを読み込み、ユーザー情報を取得
  useEffect(() => {
    const loadUserFromToken = async () => {
      try {
        const token = localStorage.getItem('auth_token');
        if (!token) {
          setLoading(false);
          return;
        }

        // ユーザー情報を取得
        const userData = await apiClient<User>('/auth/me');
        setUser(userData);
      } catch (err) {
        console.error('認証情報の読み込みに失敗しました:', err);
        localStorage.removeItem('auth_token');
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setLoading(false);
      }
    };

    loadUserFromToken();
  }, []);

  // ログイン処理
  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await apiClient<LoginResponse>('/auth/login', 'POST', {
        email,
        password,
      });

      localStorage.setItem('auth_token', response.token);
      setUser(response.user);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('ログインに失敗しました'));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // ログアウト処理
  const logout = async () => {
    try {
      setLoading(true);
      await apiClient('/auth/logout', 'POST');
      localStorage.removeItem('auth_token');
      setUser(null);
    } catch (err) {
      console.error('ログアウト処理でエラーが発生しました:', err);
    } finally {
      setLoading(false);
    }
  };

  // 新規登録処理
  const register = async (userData: RegisterData) => {
    try {
      setLoading(true);
      setError(null);

      const response = await apiClient<LoginResponse>('/auth/register', 'POST', userData);

      localStorage.setItem('auth_token', response.token);
      setUser(response.user);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('アカウント登録に失敗しました'));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    error,
    isAuthenticated: !!user,
    login,
    logout,
    register,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// 認証コンテキストを使用するためのフック
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 