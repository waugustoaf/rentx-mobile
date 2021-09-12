import { ICarDTO } from './ICarDTO';

export interface IScheduleByUserDTO {
  user_id: number;
  car: ICarDTO;
  startDate: string;
  endDate: string;
  id: number;
}
