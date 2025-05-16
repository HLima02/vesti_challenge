export type Product = {
  id: string;
  name: string;
  code: string;
  price: number | null;
  promotion: boolean;
  price_promotional: number | null;
  stockout: boolean;
  slug: string;
  media: {
    id: string;
    type: string;
    filename: string;
    zoom: {
      url: string;
      fallback: string;
      width: number;
      height: number;
    };
    normal: {
      url: string;
      fallback: string;
      width: number;
      height: number;
    };
    thumb: {
      url: string;
      fallback: string;
      width: number;
      height: number;
    };
  };
  colors: string[] | null;
};

export interface ProductContextType {
  products: Product[]
  productFetched: any
  setProductFetched: any
}