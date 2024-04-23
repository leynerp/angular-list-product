import {
  type Product,
  type ProductDetails,
  ProductResponse,
} from '../types/types';
const apiCallSimulation = async () => {
  return await new Promise((resolve) => setTimeout(resolve, 4000));
};
export const getMappedData = (
  value: any,
  start: number,
  limit: number,
): ProductResponse => {
  const products: Product[] = value.products
    .slice(start, limit)
    .map((value: any) => {
      const { id, name, price, badgeStyle, color } = value;
      return {
        id,
        name,
        price,
        image: value.image.src,
        badgeStyle,
        color,
      };
    });
  return {
    products,
    totalElements: value.products.length,
    next: start + limit < value.products.length,
    prev: start != 1,
  };
};

export const getDetailsProductById = (
  value: any,
  id: string,
): ProductDetails | null => {
  const findProduct: any = value.products.filter(
    (value: any) => value.id == id,
  );
  if (findProduct.length > 0) {
    const productImage: string[] = findProduct[0].images.map(
      (img: any) => img.src,
    );
    const { id, salePrice, gender, previewTo, link, discountText } =
      findProduct[0];
    return {
      id,
      salePrice,
      gender,
      images: productImage,
      link,
      previewTo: new Date(previewTo),
      discountText,
    };
  }
  return null;
};
