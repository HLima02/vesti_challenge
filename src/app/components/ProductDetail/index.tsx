'use client'
import React, { useState } from 'react'
import { useProductContext } from '@/contexts/ProductContext'
import { BsCart3 } from "react-icons/bs";
import Link from 'next/link'

import './style.scss'

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
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [selectedColor, setSelectedColor] = useState<string | null>(null)
  const [quantity, setQuantity] = useState<number>(0)

  if(!productFetched) {
    return <div></div>
  }

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
        <Link className='btn btn_keep_buying' href="/"><BsCart3 />Continuar Comprando</Link>
        <button className='btn btn_add_cart'>Adicionar ao Carrinho</button>
      </div>
    </div>
  )
}
