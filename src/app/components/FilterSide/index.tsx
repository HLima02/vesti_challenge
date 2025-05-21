'use client'
import React, { useEffect, useState } from 'react'
import { filters, category } from '@/services/filters'
import { FaPlus, FaMinus  } from "react-icons/fa";
import { AccordionItem } from '@/types/types'
import { useProductContext } from '@/contexts/ProductContext'

import FilterItem from '../FilterITem';

import './style.scss'

export default function FilterSide() {
  const [data, setData] = useState<AccordionItem>()
  const [categoryData, setCategoryData] = useState<AccordionItem>()
  const [slugArray, setSlugArray] = useState<string[]>([])
  const { setSideFilter } = useProductContext()

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

  useEffect(() => {
    setSideFilter(slugArray)
  }, [slugArray])

  function handleChecked(slug:string) {
    setSlugArray((prev) =>
      prev.includes(slug)
        ? prev.filter((item) => item !== slug)
        : [...prev, slug]
    );
  }

  return (
    <div>
      <FilterItem data={data} state={slugArray} action={handleChecked} />
      <FilterItem data={categoryData} state={slugArray} action={handleChecked} />
    </div>
  )
}
