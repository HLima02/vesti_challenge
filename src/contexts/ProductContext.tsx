'use client'
import React, {createContext, useContext, useEffect, useState} from 'react'
import { catalogFetch } from '@/services/api'
import { Product, ProductContextType } from '@/types/types'

const ProductContext = createContext<ProductContextType>({
  products: []
})

export default function ProductProvider({children}:{children:React.ReactNode}) {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const loadApi = async () => {
      try {
        const catalog = await catalogFetch('https://apivesti.vesti.mobi/appmarca/v2/catalogue/company/vesti')
        setProducts(catalog.products)
      } catch (error){
        console.log('Error: ', error)
      }
    }

    loadApi()
  }, [])

  return (
    <ProductContext.Provider value={{products}}>
      {children}
    </ProductContext.Provider>
  )
}

export const useProductContext = () => useContext(ProductContext)