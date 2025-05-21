'use client'
import React, { useEffect, useState } from 'react'
import { FaPlus, FaMinus  } from "react-icons/fa";
import { AccordionItem } from '@/types/types'

type FilterItemProp = {
  state: string[]
  action: any
  data?: AccordionItem,
  type: string
}

export default function FilterItem({state, action, data, type}:FilterItemProp) {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  useEffect(() => {
    const initialWidth = window.innerWidth
    setIsOpen(initialWidth > 760)
  }, [])
  
  return (
    <div className='filter_container'>
      <button onClick={() => setIsOpen(!isOpen)}>{data?.title} {isOpen ? <FaMinus/> : <FaPlus/> }</button>
      {isOpen && 
        <div className='filter_list_options'>
          <ul>
            {data?.data.map((item:any, index:string) => (
              <li key={index}>
                <input type="checkbox" value={item.slug} checked={state.includes(item.slug)} onChange={() => action(type, item.slug)} />
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      }
    </div>
  )
}
