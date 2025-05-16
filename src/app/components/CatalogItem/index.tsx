import React from 'react'
import { Product } from '@/types/types'
import Link from 'next/link'

import './style.scss'

export default function CatalogItem({productItem}:{productItem:Product}) {
  console.log(productItem)
  return (
    <Link href={`/product/${productItem.slug}`} className='catalog_item'>
      <div className='catalog_image'>
        <img src={productItem.media.normal.url} />
      </div>
      <p className='catalog_name_product'>{productItem.name}</p>
      <p>{productItem.price}</p>
    </Link>
  )
}
