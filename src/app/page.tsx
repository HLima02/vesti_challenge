'use client'
import React, { useContext, useState } from 'react'
import { useProductContext } from '@/contexts/ProductContext'
import { Product } from '@/types/types'
import CatalogItem from './components/CatalogItem'

import './page.scss'

export default function Home() {
  const { products } = useProductContext()

  if(products.length == 0){
    return (
      <div className='fail_search'>
        <h2>Nenhum item encontrado com esse nome</h2>
      </div>
    )
  }

  return (
    <div className='width_container catalog_container'>
      {products.map(item => (
        <CatalogItem key={item.id} productItem={item} />
      ))}
    </div>
  )
}
