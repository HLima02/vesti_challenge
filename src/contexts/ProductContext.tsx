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
  setProductFetched: () => {},
  filteredList: undefined,
  setFilteredList: null,
  user: null,
  setUser: null,
  signUp: null,
  signIn: null,
  logout: null
})

export default function ProductProvider({children}:{children:React.ReactNode}) {
  const [user, setUser] = useState<USerProsps | null >(null)
  const [products, setProducts] = useState<Product[]>([])
  const [productFetched, setProductFetched] = useState()
  const [filteredList, setFilteredList] = useState<string>()
  const [auxProductList, setProductList] = useState<Product[]>([])

  const router = useRouter()

  useEffect(() => {
    const storageUser = localStorage.getItem('@vestiUser')
    if(storageUser){
      setUser(JSON.parse(storageUser))
      router.push('/')
    }

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

  //Login
  async function signIn(email:string, password:string){
    await signInWithEmailAndPassword(auth, email, password)
    .then(async (value) => {
      let uid = value.user.uid
      const docRef = doc(db, "users", uid)
      const docSnap = await getDoc(docRef)

      let data = {
        uid,
        //name: docSnap.data().name,
        email: value.user.email,
      }
      setUser(data)
      storageUser(data)
      toast.success("Bem-vindo(a) de volta!")
      router.push('/')
    })
  }

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
        storageUser(data)
        router.push('/')
        toast.success("Bem vindo ao sistema")
      })
    })
  }

  //LogOut
  async function logout(){
    await signOut(auth)
    localStorage.removeItem('@vestiUser')
    setUser(null)
    router.push('/')
  }

  function storageUser(data:USerProsps){
    localStorage.setItem('@vestiUser', JSON.stringify(data))
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
    signUp,
    signIn,
    logout
    }}>
      {children}
    </ProductContext.Provider>
  )
}

export const useProductContext = () => useContext(ProductContext)