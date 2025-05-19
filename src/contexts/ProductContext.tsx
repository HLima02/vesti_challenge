'use client'
import React, {createContext, useContext, useEffect, useState} from 'react'
import { catalogFetch } from '@/services/api'
import { Product, ProductContextType } from '@/types/types'

const ProductContext = createContext<ProductContextType>({
  products: [],
  productFetched: null,
  setProductFetched: null,
  filteredList: undefined,
  setFilteredList: null
})

export default function ProductProvider({children}:{children:React.ReactNode}) {
  const [products, setProducts] = useState<Product[]>([])
  const [productFetched, setProductFetched] = useState()
  const [filteredList, setFilteredList] = useState<string>()
  const [auxProductList, setProductList] = useState<Product[]>([])

  useEffect(() => {
    const loadApi = async () => {
      try {
        const catalog = await catalogFetch('https://apivesti.vesti.mobi/appmarca/v2/catalogue/company/vesti/?page=1&perpage=60&with_colors=true')
        setProducts(catalog.products)
        setProductList(catalog.products)
        
      } catch (error){
        console.log('Error: ', error)
      }
    }

    loadApi()
  }, [])

  useEffect(() => {
    if(!filteredList){
      setProductList(products)
      return
    }

    const lowerProduct = filteredList?.toLowerCase().replace(" ", "-")
    const filtered = products.filter((prod) => prod.slug.includes(lowerProduct))
    setProductList(filtered)

  }, [filteredList, products])

  return (
    <ProductContext.Provider value={{
    products: auxProductList, 
    productFetched, 
    setProductFetched,
    filteredList,
    setFilteredList}}>
      {children}
    </ProductContext.Provider>
  )
}

export const useProductContext = () => useContext(ProductContext)