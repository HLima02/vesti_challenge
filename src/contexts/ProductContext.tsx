'use client'
import React, {createContext, useContext, useEffect, useState} from 'react'
import { catalogFetch } from '@/services/api'
import { Product, ProductContextType } from '@/types/types'

const ProductContext = createContext<ProductContextType>({
  products: [],
  productFetched: null,
  setProductFetched: null
})

export default function ProductProvider({children}:{children:React.ReactNode}) {
  const [products, setProducts] = useState([])
  const [productFetched, setProductFetched] = useState()

  useEffect(() => {
    const loadApi = async () => {
      try {
        const catalog = await catalogFetch('https://apivesti.vesti.mobi/appmarca/v2/catalogue/company/vesti/?page=1&perpage=60&with_colors=true')
        setProducts(catalog.products)
      } catch (error){
        console.log('Error: ', error)
      }
    }

    loadApi()
  }, [])

  return (
    <ProductContext.Provider value={{products, productFetched, setProductFetched}}>
      {children}
    </ProductContext.Provider>
  )
}

export const useProductContext = () => useContext(ProductContext)