import axios from 'axios';
import { format } from 'date-fns';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { ICarDTO } from '../dtos/ICarDTO';
import { IScheduleByCarDTO } from '../dtos/IScheduleByCarDTO';
import { api } from '../services/api';
import { toast } from '../utils/toast';

interface CarsProps {
  cars: ICarDTO[];
  loading: boolean;
  rentCar: (id: string) => void;
}

const CarsContext = createContext<CarsProps>({} as CarsProps);

export const CarsProvider: React.FC = ({ children }) => {
  const [cars, setCars] = useState<ICarDTO[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const response = await api.get('/cars');

        const responseCars = response.data;

        setCars(responseCars);
      } catch (err) {
        toast.error({
          title: 'Houve um erro',
          body: 'Não foi possível listar os carros.',
        });
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const rentCar = (id: string) => {
    setCars(prevState => prevState.filter(car => car.id !== id));
  };

  return (
    <CarsContext.Provider value={{ cars, loading, rentCar }}>
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
