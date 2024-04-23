export interface ProductResponse {
  products: Product[];
  totalElements: number;
  next: boolean;
  prev: boolean;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  badgeStyle: string;
  color: string;
}
export interface ProductDetails {
  id: string;
  salePrice: number;
  gender: Gender;
  images: string[];
  link: string;
  previewTo: Date;
  discountText: string;
}

export enum Gender {
  M = 'M',
  U = 'U',
}
