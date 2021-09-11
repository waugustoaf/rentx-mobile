import React, { createContext, useContext, useState, useEffect } from 'react';
import { ICarDTO } from '../dtos/ICarDTO';
import { api } from '../services/api';

interface CarsProps {
  cars: ICarDTO[];
  loading: boolean;
}

const CarsContext = createContext<CarsProps>({} as CarsProps);

export const CarsProvider: React.FC = ({ children }) => {
  const [cars, setCars] = useState<ICarDTO[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const response: ICarDTO[] = (await api.get('/cars')).data;

      setCars(response);
      setLoading(false);
    })();
  }, []);

  return (
    <CarsContext.Provider value={{ cars, loading }}>
      {children}
    </CarsContext.Provider>
  );
};

export const useCars = () => {
  const context = useContext(CarsContext);

  if (!context) {
    throw new Error('useCars must be used with CarsProvider.');
  }

  return context;
};
