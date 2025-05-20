'use client'
import React from 'react'
import Link from 'next/link'
import { useProductContext } from '@/contexts/ProductContext'
import CartItem from '../CartITem'
import { IoMdClose } from "react-icons/io";
import './style.scss'

export default function Cart() {
  const { cart, isCartOpen, setIsCartOpen } = useProductContext()

  console.log("carrinho: ", cart)
  return (
    <div className='cart_container' style={isCartOpen ? {right: 0, display: 'block'} : { right: -350, display: 'none'}}>
      <div className='close_cart' onClick={() => setIsCartOpen(false)} >
        <IoMdClose size={20} color='#000' />
      </div>
      {cart.length == 0 ? (
        <div className='empty_cart'>
          <p >Seu carrinho ainda esta vazio!!</p>
        </div>
      ) : (
        <div className='full_cart'>
          <h3>Lista de produtos</h3>
          <ul>
            {cart.map(item => (
              <CartItem key={item.code} item={item} />
            ))}
          </ul>
          <div className='finalize_order'>
            <Link href="/finalize_order">Finalizar pedido</Link>
          </div>
        </div>
      )}
    </div>
  )
}
