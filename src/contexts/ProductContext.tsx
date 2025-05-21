'use client'

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'

import { ProductFetch } from '@/services/api'
import { auth, db } from '@/services/firebase'
import { filterbrands } from '@/services/filters'

import {
  Product,
  ProductContextType,
  UserProps,
  CartProps,
  AddressType,
} from '@/types/types'

const ProductContext = createContext<ProductContextType>({} as ProductContextType)

type ProductProviderProps = {
  children: ReactNode
}

export default function ProductProvider({ children }: ProductProviderProps) {
  const [user, setUser] = useState<UserProps | null>(null)
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [productFetched, setProductFetched] = useState<Product | null>(null)
  const [filteredList, setFilteredList] = useState<string>()
  const [cart, setCart] = useState<CartProps[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [address, setAddress] = useState<AddressType[]>([])
  const [sideFilter, setSideFilter] = useState<string[]>([])
  const [typeFilter, setTypeFilter] = useState<string | undefined>()

  const router = useRouter()

  useEffect(() => {
    const storedUser = localStorage.getItem('@vestiUser')
    const storedCart = localStorage.getItem('@vestiCart')
    const storedAddress = localStorage.getItem('@storage_address')

    if (storedUser) setUser(JSON.parse(storedUser))
    if (storedCart) setCart(JSON.parse(storedCart))
    if (storedAddress) setAddress(JSON.parse(storedAddress))

    async function loadProducts() {
      try {
        const catalog = await ProductFetch(
          'https://apivesti.vesti.mobi/appmarca/v2/catalogue/company/vesti/?page=1&perpage=60&with_colors=true'
        )
        setProducts(catalog.products)
        setFilteredProducts(catalog.products)
      } catch (err) {
        console.error('Erro ao carregar catálogo:', err)
      }
    }

    loadProducts()
  }, [])

  //debounce de produto do input
  useEffect(() => {
    if (!filteredList) {
      setFilteredProducts(products)
      return
    }

    const keyword = filteredList.toLowerCase().replace(/\s+/g, '-')
    const filtered = products.filter(product =>
      product.slug?.includes(keyword)
    )
    setFilteredProducts(filtered)
  }, [filteredList, products])

  // Filtro atraves dos checkbox (marca e categorias)
  useEffect(() => {
    if (!sideFilter.length) {
      setFilteredProducts(products)
      return
    }

    async function applySideFilter() {
      const result = await filterbrands(typeFilter, sideFilter)
      if (result) setFilteredProducts(result)
    }

    applySideFilter()
  }, [sideFilter, products, typeFilter])

  // Persistencia do carrinho
  useEffect(() => {
    localStorage.setItem('@vestiCart', JSON.stringify(cart))
  }, [cart])

  //Persistencia do endereço
  useEffect(() => {
    localStorage.setItem('@storage_address', JSON.stringify(address))
  }, [address])

  // Autenticação via email e senha
  async function signIn(email: string, password: string) {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password)
      const uid = result.user.uid
      const docRef = doc(db, 'users', uid)
      const docSnap = await getDoc(docRef)

      const userData: UserProps = {
        uid,
        name: docSnap.data()?.name ?? '',
        email: result.user.email ?? '',
      }

      setUser(userData)
      saveUserToStorage(userData)
      toast.success('Bem-vindo(a) de volta!')
      router.push('/')
    } catch (err) {
      console.error('Erro ao fazer login:', err)
    }
  }

  //cadastro de usuarios
  async function signUp(name: string, email: string, password: string) {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password)
      const uid = result.user.uid

      await setDoc(doc(db, 'users', uid), { name })

      const userData: UserProps = {
        uid,
        name,
        email: result.user.email ?? '',
      }

      setUser(userData)
      saveUserToStorage(userData)
      toast.success('Bem vindo ao sistema!')
      router.push('/')
    } catch (err) {
      console.error('Erro ao cadastrar usuário:', err)
    }
  }
  //Logout de usuarios e remoção dos arrays no localstorage
  async function logout() {
    await signOut(auth)
    localStorage.removeItem('@vestiUser')
    localStorage.removeItem('@vestiCart')
     localStorage.removeItem('@storage_address')
    setUser(null)
    router.push('/')
  }

  //Persistencia do usuario no local storage
  function saveUserToStorage(user: UserProps) {
    localStorage.setItem('@vestiUser', JSON.stringify(user))
  }

  return (
    <ProductContext.Provider
      value={{
        products: filteredProducts,
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
        setSideFilter,
        typeFilter,
        setTypeFilter,
      }}
    >
      {children}
    </ProductContext.Provider>
  )
}

export const useProductContext = () => useContext(ProductContext)
