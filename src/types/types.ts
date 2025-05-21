import { StaticImageData  } from "next/image"

export type Product = {
  id?: string;
  name: string;
  code: string;
  price?: number | null;
  promotion?: boolean;
  price_promotional?: number | null;
  stockout?: boolean;
  slug?: string;
  media?: {
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
  colors?: string[] | null;
};

export type UserProps = {
  uid: string
  name: string
  email: string
}

export type OrderDetails = {
  color: string,
  sizes: string[]
  quantity: number
}

export type CartProps = {
  code: string,
  name: string,
  url: string,
  items: OrderDetails[]
}

export interface ProductContextType {
  products: Product[]
  productFetched: any
  setProductFetched: React.Dispatch<React.SetStateAction<any>>
  filteredList: string | undefined
  setFilteredList: any
  user: UserProps | null,
  setUser: any,
  signUp:any,
  signIn: any,
  logout: any,
  cart: Product[],
  setCart: React.Dispatch<React.SetStateAction<any>>,
  isCartOpen: boolean,
  setIsCartOpen:  React.Dispatch<React.SetStateAction<any>>,
  address: AddressType[],
  setAddress:  React.Dispatch<React.SetStateAction<any>>,
  sideFilter: string[],
  setSideFilter: React.Dispatch<React.SetStateAction<any>>,
  typeFilter:string | undefined,
  setTypeFilter: React.Dispatch<React.SetStateAction<any>>
}

export interface BannerItem {
  id: number
  url: string | StaticImageData
}

export type AddressType = {
  bairro: string
  cep: string
  estado:string
  localidade: string
  logradouro: string
  uf: string
  erro?: boolean
}

export interface AccordionItem {
  title?: string;
  data: any;
}