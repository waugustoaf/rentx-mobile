export type IAccessoryTypes =
  | 'speed'
  | 'acceleration'
  | 'turning_diameter'
  | 'electric_motor'
  | 'gasoline_motor'
  | 'exchange'
  | 'seats';

export interface IAccessoryDTO {
  id: string;
  type: IAccessoryTypes;
  name: string;
  car_id: string;
}
