'use client'
import React, { useState } from 'react'
import { useProductContext } from '@/contexts/ProductContext'
import { BsCart3 } from "react-icons/bs";
import { toast } from 'react-toastify';
import Link from 'next/link'

import './style.scss'
import { CartProps, OrderDetails } from '@/types/types';

type sizeProps = {
  id: string
  name: string
  slug: string
}

type colorsProps = {
  active: boolean
  code: string
  id: string
  media: string | null
  name: string
}

export default function ProductDetail() {
  const { productFetched } = useProductContext()
  const [selectedSize, setSelectedSize] = useState<string>("")
  const [selectedColor, setSelectedColor] = useState<string>("")
  const [quantity, setQuantity] = useState<number>(0)
  const { user, cart, setCart } = useProductContext()

  if(!productFetched) {
    return <div></div>
  }

  //Função para adicionar e remover quantidade do pedido
  function handlerQuantity(value:string){
    let auxValue = quantity
    switch(value){
      case 'minus': 
        if(quantity > 0){
          auxValue = auxValue - 1
          setQuantity(auxValue)
        }
        break
      
      case 'plus': 
        auxValue = auxValue + 1
        setQuantity(auxValue)
        break
    }
  }

  function handleCartAdd(){
    if(selectedColor == null) {
      toast.warning('Selecione uma cor')
      return
    }

    if(selectedSize == null){
      toast.warning('Selecione um tamanho')
      return
    }

    if (quantity == 0){
      toast.warning('Escolha a quantidade desejada')
      return
    }

    toast.success('Pedido adicionado ao carrinho!')
    setSelectedSize("")
    setSelectedColor("")
    setQuantity(0)

    checkCart()
  }

  function checkCart(){
    const {code, name, media} = productFetched
    const url = media?.[0].thumb.url || ''

    const color = selectedSize
    const sizes = [selectedColor]
    const newOrder:OrderDetails = { color, sizes, quantity };

    setCart((prevCart:any) => {
      console.log("prevCart", prevCart)
      const existingProduct = prevCart.find((item:any) => item.code === code);
      
      //Verifica se o produto já existe no carrinho
      if(!existingProduct) {
        const newCartItem = {code, name, url, items: [newOrder]}
        return [...prevCart, newCartItem]
      } 
      
      //Produto já existente no carrinho
      return prevCart.map((item:any) => {
        if(item.code !== code) return item

        const existingOrderIndex = item.items.findIndex((order:any) => {
          return (
            order.color === newOrder.color && 
            JSON.stringify(order.sizes.sort()) === JSON.stringify(newOrder.sizes.sort())
          )
        })

        if(existingOrderIndex !== -1) {
          const updatedItems = [...item.items]
          updatedItems[existingOrderIndex].quantity += newOrder.quantity

          return {...item, items: updatedItems}
        } else {
          return {
            ...item,
            items: [...item.items, newOrder]
          }

        }
      })
    })
    
  }

  return (
    <div className='datail_container'>
      <h3>{ productFetched.name}</h3>
      <small>{ productFetched.code }</small>
      <p className='detail_description'>{ productFetched.description }</p>
      <p className='detail_composition'>{ productFetched.composition }</p>
      <div className='detail_colors_area'>
        <p>Cores: </p>
        <div className='detail_color_section'>
          {productFetched.colors.map((item:colorsProps) => (
            <button key={item.id} 
            className={`detail_color_box ${selectedColor === item.code ? 'selected' : ''}`} 
            style={{backgroundColor: `${item.code}`}}
            onClick={() => setSelectedColor(item.code)}></button>
          ))}
        </div>
      </div>
      <div className='detail_size_area'>
        <p>Tamanhos: </p>
        <div className='detail_sizes_section'>
          {productFetched.sizes.map((item:sizeProps) => (
            <button key={item.id} 
            className={`detail_sizes_option ${selectedSize === item.slug ? 'selected' : ''}`}
            onClick={() => setSelectedSize(item.slug)}>{item.slug}</button>
          ))}
        </div>
      </div>

      <div className='quantity_size_area'>
        <p>Quantidade: </p>
        <div className='quantity_sizes_section'>
          <button onClick={() => handlerQuantity('minus')}>-</button>
          <span>{quantity}</span>
          <button onClick={() => handlerQuantity('plus')}>+</button>
        </div>
      </div>

      <div className='detail_btn_area'>
        {!!user ? (
          <>
            <Link className='btn btn_keep_buying' href="/"><BsCart3 />Continuar Comprando</Link>
            <button onClick={handleCartAdd} className='btn btn_add_cart'>Adicionar ao Carrinho</button>
          </>
        ) : (
          <Link className='btn btn_keep_buying' href="/signin"><BsCart3 />Fazer Login para comprar</Link>
        )}
       
        
      </div>
    </div>
  )
}
