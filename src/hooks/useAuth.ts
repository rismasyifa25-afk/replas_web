import { useState } from 'react';
import Cookies from 'js-cookie';
import { Fetch } from '@/lib/fetch';

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await Fetch.post('/auth/login', {
        email,
        password,
      });

      const responseData = response.data;

      if (responseData.data && responseData.data.token) {
        Cookies.set('accessToken', responseData.data.token, { expires: 1 });
        setLoading(false);
        return responseData.data;
      } else {
        const errorMessage = 'Login successful, but no token was provided.';
        setError(errorMessage);
        setLoading(false);
        throw new Error(errorMessage);
      }
    } catch (err: any) {
      const errorMessage = err.response.data.error || err.response?.data?.message || err.message || 'An unknown error occurred.';
      setError(errorMessage);
      setLoading(false);
      throw new Error(errorMessage);
    }
  };

  const register = async (fullname: string, phoneNumber: string, email: string, password: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await Fetch.post('/auth/register', {
        name: fullname,
        phone: phoneNumber,
        email,
        password,
      });
      
      const responseData = response.data;
      setLoading(false);
      return responseData;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'An unknown error occurred.';
      setError(errorMessage);
      setLoading(false);
      throw new Error(errorMessage);
    }
  };

  const logout = () => {
    Cookies.remove('accessToken');
  };

  return { loading, error, login, register, logout };
};