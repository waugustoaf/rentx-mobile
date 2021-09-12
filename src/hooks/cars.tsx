import axios from 'axios';
import { format } from 'date-fns';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { ICarDTO } from '../dtos/ICarDTO';
import { IScheduleByCarDTO } from '../dtos/IScheduleByCarDTO';
import { api } from '../services/api';

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
      const requestCars = api.get('/cars');
      const requestSchedules = api.get('/schedules_bycars');

      const [respOne, respTwo] = await axios.all([
        requestCars,
        requestSchedules,
      ]);

      const responseCar: ICarDTO[] = respOne.data;
      const responseSchedule: IScheduleByCarDTO[] = respTwo.data;

      const availableCars = responseCar.filter(car => {
        const carSchedules = responseSchedule.find(
          schedule => schedule.id === car.id,
        );

        if (
          carSchedules &&
          carSchedules.unavailable_dates &&
          carSchedules.unavailable_dates.includes(
            format(new Date(), 'yyyy-MM-dd'),
          )
        ) {
          return false;
        }

        return true;
      });

      setCars(availableCars);
      setLoading(false);
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
