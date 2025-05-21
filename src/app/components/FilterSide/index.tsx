'use client'
import React, { useEffect, useState } from 'react'
import { filters, category } from '@/services/filters'
import { FaPlus, FaMinus  } from "react-icons/fa";
import { AccordionItem } from '@/types/types'

import FilterItem from '../FilterITem';

import './style.scss'

export default function FilterSide() {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [data, setData] = useState<AccordionItem>()
  const [categoryData, setCategoryData] = useState<AccordionItem>()

  useEffect(() => {
    async function loadFilter(){
      try {
        const filter = await filters('Marcas', 'https://apivesti.vesti.mobi/appmarca/v1/company/vesti/brands')
        const categoryList = await category('Categorias', 'https://apivesti.vesti.mobi/appmarca/v1/categories/company/vesti/filter/?recursive=true')
        setCategoryData(categoryList)
        setData(filter)

      } catch(error) {
        console.log('Erro: ', error)
      }
    }

    loadFilter()
  }, [])
  return (
    <div>
      <FilterItem data={data} />
      <FilterItem data={categoryData} />
    </div>
  )
}
