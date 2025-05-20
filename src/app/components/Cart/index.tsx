'use client'
import React from 'react'
import { useProductContext } from '@/contexts/ProductContext'
import CartItem from '../CartITem'
import { IoMdClose } from "react-icons/io";
import './style.scss'

export default function Cart() {
  const { cart, isCartOpen, setIsCartOpen } = useProductContext()
  console.log(cart)
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
        <CartItem />
      )}
    </div>
  )
}
