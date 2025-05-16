'use client'
import React, { useContext, useState } from 'react'
import { useProductContext } from '@/contexts/ProductContext'
import { Product } from '@/types/types'
import CatalogItem from './components/CatalogItem'

import './page.scss'

export default function Home() {
  const { products } = useProductContext()

  return (
    <div className='width_container catalog_container'>
      {products.map(item => (
        <CatalogItem key={item.id} productItem={item} />
      ))}
    </div>
  )
}
