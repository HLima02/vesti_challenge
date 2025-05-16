//link para requisição do produto completo
//https://apivesti.vesti.mobi/appmarca/v1/products/company/0ec63cc6-04cb-4400-a0e9-5703eeed20e4/product/jaqueta-perolas-x-22028/showcase?cid=null&reseller_id=null
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
