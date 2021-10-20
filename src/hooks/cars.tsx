import React, { createContext, useContext, useEffect, useState } from 'react';
import { database } from '../database';
import { Car } from '../database/models/Car';
import { toast } from '../utils/toast';

interface CarsProps {
  cars: Car[];
  loading: boolean;
  rentCar: (id: string) => void;
}

const CarsContext = createContext<CarsProps>({} as CarsProps);

export const CarsProvider: React.FC = ({ children }) => {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const carCollection = database.get<Car>('cars');
        const currentCars = await carCollection.query().fetch();

        setCars(currentCars);
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
