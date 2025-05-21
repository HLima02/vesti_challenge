'use client'
import React, {createContext, useContext, useEffect, useState} from 'react'
import { ProductFetch } from '@/services/api'
import { Product, ProductContextType, USerProsps, CartProps, AddressType } from '@/types/types'
import { auth, db } from '@/services/firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { doc, getDoc, setDoc} from 'firebase/firestore'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { filterbrands } from '@/services/filters'


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
  logout: null,
  cart: [],
  setCart: () => {},
  isCartOpen: false,
  setIsCartOpen: () => {},
  address: [],
  setAddress: () => {},
  sideFilter: [],
  setSideFilter: () => {}
})

export default function ProductProvider({children}:{children:React.ReactNode}) {
  const [user, setUser] = useState<USerProsps | null >(null)
  const [products, setProducts] = useState<Product[]>([])
  const [productFetched, setProductFetched] = useState()
  const [filteredList, setFilteredList] = useState<string>()
  const [auxProductList, setProductList] = useState<Product[]>([])
  const [cart, setCart] = useState<CartProps[]>([])
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false)
  const [address, setAddress] = useState<AddressType[]>([])
  const [sideFilter, setSideFilter] = useState<string[]>([])

  const router = useRouter()

  useEffect(() => {
    const storageUser = localStorage.getItem('@vestiUser')
    const storageCart = localStorage.getItem('@vestiCart')
    const storageAddress = localStorage.getItem('@storage_address')

    if(storageUser) setUser(JSON.parse(storageUser))
    if(storageCart) setCart(JSON.parse(storageCart))
    if(storageAddress) setAddress(JSON.parse(storageAddress))
    
    //Carrega a API de produtos
    const loadApi = async () => {
      try {
        const catalog = await ProductFetch('https://apivesti.vesti.mobi/appmarca/v2/catalogue/company/vesti/?page=1&perpage=60&with_colors=true')
      
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
    const filtered = products.filter((prod) => prod.slug?.includes(lowerProduct))
    setProductList(filtered)

  }, [filteredList, products])

  //Ciclo execucado quando a lista for filtrada atraves dos checkbox
  useEffect(() => {
    async function loadSideFilter(){
      if(!sideFilter){
        setProductList(products)
        return
      }

      const auxSideFilter = await filterbrands(sideFilter)
      console.log('Context: ', auxSideFilter)
      setProductList(auxSideFilter)
    }
    
    loadSideFilter()
  }, [sideFilter, products])



  useEffect(() => {
    localStorage.setItem('@vestiCart', JSON.stringify(cart))
  }, [cart])

  useEffect(() => {
    localStorage.setItem('@storage_address', JSON.stringify(address))
  }, [address])

  //Login
  async function signIn(email:string, password:string){
    await signInWithEmailAndPassword(auth, email, password)
    .then(async (value) => {
      let uid = value.user.uid
      const docRef = doc(db, "users", uid)
      const docSnap = await getDoc(docRef)

      let data = {
        uid,
        name: docSnap.data()?.name,
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
    logout,
    cart,
    setCart,
    isCartOpen,
    setIsCartOpen,
    address,
    setAddress,
    sideFilter,
    setSideFilter
    }}>
      {children}
    </ProductContext.Provider>
  )
}

export const useProductContext = () => useContext(ProductContext)