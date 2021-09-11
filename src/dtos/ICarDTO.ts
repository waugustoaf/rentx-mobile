import { IAccessoryDTO } from './IAccessoryDTO';

export interface ICarDTO {
  id: string;
  brand: string;
  name: string;
  about: string;
  rent: {
    period: string;
    price: number;
  };
  thumbnail: string;
  fuel_type: 'gasoline_motor' | 'electric';
  accessories: IAccessoryDTO[];
  photos: string[];
}
