'use client'
//link para requisição do produto completo
//https://apivesti.vesti.mobi/appmarca/v1/products/company/0ec63cc6-04cb-4400-a0e9-5703eeed20e4/product/jaqueta-perolas-x-22028/showcase?cid=null&reseller_id=null
import React, {useState, useEffect} from 'react'
import { useProductContext } from '@/contexts/ProductContext'
import { ProductFetch } from '@/services/api'

type ProductItemTypes = {
  params: {
    slug: string
  }
}

export default function ProductItem({params}:ProductItemTypes) {
  const {slug} = params


  useEffect(() => {
    async function loadProduct(){
      try {
        const productItem = await ProductFetch(`https://apivesti.vesti.mobi/appmarca/v1/products/company/0ec63cc6-04cb-4400-a0e9-5703eeed20e4/product/${slug}/showcase?cid=null&reseller_id=null`)
        console.log("Produto: ",productItem.product_group)
      } catch (error) {
        console.log("Error: ", error)
      }
      
    }

    loadProduct()
  }, [])

  return (
    <div>
      Pagina de produto
    </div>
  )
}
