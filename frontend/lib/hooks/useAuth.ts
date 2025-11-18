import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import apiClient from '../api/client';

export function useAuth() {
  const router = useRouter();

  const login = useCallback(async (email: string, password: string) => {
    try {
      const response = await apiClient.post('/auth/login', { email, password });
      const { accessToken } = response.data;
      localStorage.setItem('accessToken', accessToken);
      router.push('/dashboard');
      return response.data;
    } catch (error) {
      throw error;
    }
  }, [router]);

  const signup = useCallback(async (data: {
    email: string;
    password: string;
    fullName: string;
    role: 'brand' | 'influencer';
    country: string;
  }) => {
    try {
      const response = await apiClient.post('/auth/signup', data);
      const { accessToken } = response.data;
      localStorage.setItem('accessToken', accessToken);
      router.push('/onboarding');
      return response.data;
    } catch (error) {
      throw error;
    }
  }, [router]);

  const logout = useCallback(async () => {
    try {
      await apiClient.post('/auth/logout');
      localStorage.removeItem('accessToken');
      router.push('/');
    } catch (error) {
      localStorage.removeItem('accessToken');
      router.push('/');
    }
  }, [router]);

  return { login, signup, logout };
}
