import { StaticImageData  } from "next/image"

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

export type USerProsps = {
  uid: number
  name: string
  email: string
}


export interface ProductContextType {
  products: Product[]
  productFetched: any
  setProductFetched: React.Dispatch<React.SetStateAction<any>>
  filteredList: string | undefined
  setFilteredList: any
  user: USerProsps | null,
  setUser: any,
  signUp:any,
  signIn: any,
  logout: any
}

export interface BannerItem {
  id: number
  url: string | StaticImageData
}