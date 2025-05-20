import React from 'react'
import Image from 'next/image'
import { CartProps } from '@/types/types'

export default function CartItem({ item }:{item:CartProps}) {
  console.log(item.items[0].color)
  return (
    <li>
      <div><img src={item.url} /></div>
      <div className='info_produto'>
        <span className='info_name'>{item.name}</span>
        <div className='info_details'>
          <span className='color' style={{backgroundColor: `${item.items[0].color}`}}></span>
          {item.items.map(item => (
            <span className='size'>{item.sizes[0]}</span>
          ))}
        </div>
        <span className='quantity'>Quantidade: {item.items[0].quantity}</span>
      </div>
    </li>
  )
}
