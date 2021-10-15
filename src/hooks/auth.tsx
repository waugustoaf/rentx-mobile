import React, {
  createContext,
  useState,
  useContext,
  useCallback,
  useEffect,
} from 'react';
import { database } from '../database';
import { User as UserModel } from '../database/models/User';
import { api } from '../services/api';

interface User {
  id: string;
  user_id: string;
  email: string;
  name: string;
  driver_license: string;
  avatar: string;
  token: string;
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
  const [user, setUser] = useState<User>({} as User);

  useEffect(() => {
    (async () => {
      const userCollection = database.get<UserModel>('users');
      const response = await userCollection.query().fetch();

      if (response.length > 0) {
        const userData = response[0]._raw as unknown as User;

        setUser(userData);
      }
    })();
  }, []);

  const signIn = useCallback(
    async ({ email, password, callbackFunction }: SignInProps) => {
      try {
        const response = await api.post('/sessions', { email, password });
        const { user } = response.data;

        api.defaults.headers.authorization = `Bearer ${user.token}`;

        const userCollection = database.get<UserModel>('users');
        await database.write(async () => {
          await userCollection.create(newUser => {
            newUser.user_id = user.id;
            newUser.name = user.name;
            newUser.email = user.email;
            newUser.driver_license = user.driver_license;
            newUser.avatar = user.avatar;
            newUser.token = user.token;
          });
        });

        if (callbackFunction) callbackFunction();

        setUser({ ...user });
      } catch (err) {
        throw new Error(err);
      }
    },
    [],
  );

  return (
    <AuthContext.Provider value={{ user, signIn }}>
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
