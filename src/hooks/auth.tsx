import { useFocusEffect } from '@react-navigation/core';
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
  signOut: () => Promise<void>;
  updateUser: (user: User) => Promise<void>;
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

        api.defaults.headers.authorization = `BEARER ${userData.token}`;
      }
    })();
  }, []);

  const signIn = useCallback(
    async ({ email, password, callbackFunction }: SignInProps) => {
      try {
        const response = await api.post('/sessions', { email, password });
        const { user: responseUser, token } = response.data;

        responseUser.token = token;
        responseUser.user_id = responseUser.id;

        // @ts-ignore
        delete responseUser.id;

        api.defaults.headers.authorization = `Bearer ${responseUser.token}`;

        const userCollection = database.get<UserModel>('users');

        await database.write(async () => {
          const { _raw: newUser } = (await userCollection.create(newUser => {
            newUser.user_id = responseUser.user_id;
            newUser.name = responseUser.name;
            newUser.email = responseUser.email;
            newUser.driver_license = responseUser.driver_license;
            newUser.avatar = responseUser.avatar;
            newUser.token = responseUser.token;
          })) as unknown as { _raw: User };

          if (callbackFunction) callbackFunction();

          setUser(newUser);
        });
      } catch (err) {
        throw new Error(err);
      }
    },
    [],
  );

  const signOut = useCallback(async () => {
    try {
      const userCollection = database.get<UserModel>('users');

      await database.write(async () => {
        const userSelected = await userCollection.find(user.id);
        await userSelected.destroyPermanently();

        setUser({} as User);
      });
    } catch (err) {
      throw new Error(err);
    }
  }, [user]);

  const updateUser = useCallback(async (currentUser: User) => {
    try {
      const userCollection = database.get<UserModel>('users');
      await database.write(async () => {
        const userSelected = await userCollection.find(currentUser.id);
        await userSelected.update(userData => {
          userData.name = currentUser.name;
          userData.driver_license = currentUser.driver_license;
          userData.avatar = currentUser.avatar;
        });

        setUser(currentUser);
      });
    } catch (err) {
      throw new Error(err);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, updateUser }}>
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
