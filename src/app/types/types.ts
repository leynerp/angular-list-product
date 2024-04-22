export interface ProductResponse {
  products: Product[];
  totalElements:number,
  next:boolean,
  prev:boolean
}

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  badgeStyle: string;
  color:string;
  productDetails: ProductDetails;
}
export interface ProductDetails {
  salePrice: number
  gender: Gender
  images: string[]
  link: string
  previewTo: Date
  discountText: string
}

export enum Gender {
  M = 'M',
  U = 'U',
}
