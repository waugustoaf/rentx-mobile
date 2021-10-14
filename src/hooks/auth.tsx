import React, { createContext, useState, useContext, useCallback } from 'react';
import { api } from '../services/api';

interface User {
  id: string;
  email: string;
  name: string;
  driver_license: string;
  avatar: string;
}

interface AuthState {
  token: string;
  user: User;
}

interface SignInProps {
  email: string;
  password: string;
  callbackFunction?: () => void;
}

interface AuthContextData {
  user: User;
  signIn: (data: SignInProps) => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>({} as AuthState);

  const signIn = useCallback(
    async ({ email, password, callbackFunction }: SignInProps) => {
      const response = await api.post('/sessions', { email, password });
      const { token, user } = response.data;

      api.defaults.headers.authorization = `Bearer ${token}`;

      if (callbackFunction) callbackFunction();

      setData({ token, user });
    },
    [],
  );

  return (
    <AuthContext.Provider value={{ user: data.user, signIn }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
};

export { AuthProvider, useAuth };
