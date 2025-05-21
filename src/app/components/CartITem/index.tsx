import React from 'react'
import { CartProps } from '@/types/types'
import { useProductContext } from '@/contexts/ProductContext'

export default function CartItem({ item }:{item:CartProps}) {
  const { cart, setCart } = useProductContext()

  function handleDeleteItem(){
    const deleteItem = cart.filter(i => i.code !== item.code)
    setCart(deleteItem)
  }
  return (
    <li key={item.code}>
      <div><img src={item.url} /></div>
      <div className='info_produto'>
        <span className='info_name'>{item.name}</span>
        <div className='info_details'>
          <span className='color' style={{backgroundColor: `${item.items[0].color}`}}></span>
          {item.items.map((item, index) => (
            <span key={index} className='size'>{item.sizes[0]}</span>
          ))}
          <span className='quantity'>Quantidade: {item.items[0].quantity}</span>
        </div>
        <button onClick={handleDeleteItem} className='info_delete'>Excluir</button>
      </div>
    </li>
  )
}
