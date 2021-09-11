export type IAccessoryTypes =
  | 'speed'
  | 'acceleration'
  | 'turning_diameter'
  | 'electric_motor'
  | 'gasoline_motor'
  | 'exchange'
  | 'seats';

export interface IAccessoryDTO {
  type: IAccessoryTypes;
  name: string;
}
