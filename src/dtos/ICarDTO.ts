export interface ICarDTO {
  id: string;
  brand: string;
  name: string;
  rent: {
    period: string;
    price: string;
  };
  thumbnail: string;
  type: 'fuel' | 'electric';
}
