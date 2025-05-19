'use client'
import React, {createContext, useContext, useEffect, useState} from 'react'
import { catalogFetch } from '@/services/api'
import { Product, ProductContextType, USerProsps } from '@/types/types'
import { auth, db } from '@/services/firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { doc, getDoc, setDoc} from 'firebase/firestore'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

const ProductContext = createContext<ProductContextType>({
  products: [],
  productFetched: null,
  setProductFetched: null,
  filteredList: undefined,
  setFilteredList: null,
  user: null,
  setUser: null,
  signUp: null
})

export default function ProductProvider({children}:{children:React.ReactNode}) {
  const [user, setUser] = useState<USerProsps | null >(null)
  const [products, setProducts] = useState<Product[]>([])
  const [productFetched, setProductFetched] = useState()
  const [filteredList, setFilteredList] = useState<string>()
  const [auxProductList, setProductList] = useState<Product[]>([])

  const router = useRouter()

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

  //Cadastro
  async function signUp(name: string, email:string, password:string){
    await createUserWithEmailAndPassword(auth, email, password)
    .then(async (value) => {
      let uid = value.user.uid

      await  setDoc(doc(db, "users", uid), {
        name
      })
      .then(() => {
        let data = {
          uid,
          name,
          email: value.user.email,
        }
        setUser(data)
        router.push('/')
        toast.success("Bem vindo ao sistema")
      })
    })
  }

  return (
    <ProductContext.Provider value={{
    products: auxProductList, 
    productFetched, 
    setProductFetched,
    filteredList,
    setFilteredList,
    user,
    setUser,
    signUp
    }}>
      {children}
    </ProductContext.Provider>
  )
}

export const useProductContext = () => useContext(ProductContext)