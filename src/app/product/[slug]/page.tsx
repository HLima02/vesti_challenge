import React, {useState, useEffect} from 'react'
import ProductSlider from '@/app/components/ProductSlider'
import ProductDetail from '@/app/components/ProductDetail'
import './style.scss'

type ProductItemTypes = {
  params: {
    slug: string
  }
}

export default function ProductItem({params}:ProductItemTypes) {
  const {slug} = params

  if(!slug) {
    return <div></div>
  }

  return (
    <div className='width_container product_container'>
      <ProductSlider slug={slug} />
      <ProductDetail />
    </div>
  )
}
