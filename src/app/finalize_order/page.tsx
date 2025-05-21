'use client'
import React from 'react'
import ProtectedRoute from '../components/ProtectedRouter'
import { useProductContext } from '@/contexts/ProductContext'
import CartItem from '../components/CartITem'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

import './style.scss'

export default function FinalizeOrder() {
  const { cart } = useProductContext()
  const router = useRouter()

  function handleOrder(){
    toast.success("Seu pedido foi enviado com sucesso!")
    router.push("/")
  }
  
  return (
    <ProtectedRoute>
      <div className='finalize_container'>
        <h2>Resumo do pedido</h2>

        <ul className='order_list'>
          {cart.map(item => (
            <CartItem key={item.code} item={item} />
          ))}
        </ul>
        <div className='order_finalize'>
          <button onClick={handleOrder}>Finalizar pedido</button>
        </div>
      </div>
    </ProtectedRoute>
  )
}
