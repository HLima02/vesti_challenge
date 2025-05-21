'use client'
import React, { useMemo, useState } from 'react'
import { useProductContext } from '@/contexts/ProductContext'
import { Product } from '@/types/types'
import CatalogItem from './components/CatalogItem'
import BannerSlider from './components/BannerSlider'
import FilterSide from './components/FilterSide'

import { IoIosArrowForward, IoIosArrowBack  } from "react-icons/io";

import './page.scss'

export default function Home() {
  const { products } = useProductContext()
  const [currentPage, setCurrentPage] = useState<number>(1)
  
  const itensPerPage = 12
  const totalPages = Math.ceil(products.length / itensPerPage)

  const paginatedProducts = useMemo(() => {
    const begin = (currentPage - 1) * itensPerPage
    const end = begin + itensPerPage
    return products.slice(begin, end)
  },[products, currentPage])

  if(products.length == 0){
    return (
      <div className='fail_search'>
        <h2>Nenhum item encontrado com esse nome</h2>
      </div>
    )
  }

  return (
    <div className='width_container catalog_container'>
      <div className='catalog_banner_section'>
         <BannerSlider />
      </div>
      <div className='catalog_filter_products'>
        <div className='catalog_filter'>
          <FilterSide />
        </div>
        <div className='catalog_pagination'>
          <div className='catalog_products'>
          {paginatedProducts.map(item => (
            <CatalogItem key={item.id} productItem={item} />
          ))}
          </div>
          <div className='pagination_control'>
            <button disabled={currentPage == 1}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            ><IoIosArrowBack  /></button>
            <span>Página {currentPage} de {totalPages}</span>
            <button disabled={currentPage == totalPages}
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            ><IoIosArrowForward /></button>
          </div>
        </div>
      </div>
    </div>
  )
}
