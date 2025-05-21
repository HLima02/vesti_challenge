import React, { useEffect, useState } from 'react'
import { FaPlus, FaMinus  } from "react-icons/fa";
import { AccordionItem } from '@/types/types'

type FilterItemProp = {
  state: string[]
  action: any
  data?: AccordionItem
}

export default function FilterItem({state, action, data}:FilterItemProp) {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [slugArray, setSlugArray] = useState<string[]>([])

  return (
    <div className='filter_container'>
      <button onClick={() => setIsOpen(!isOpen)}>{data?.title} <FaPlus/></button>
      {isOpen && 
        <div className='filter_list_options'>
          <ul>
            {data?.data.map((item:any, index:string) => (
              <li key={index}>
                <input type="checkbox" value={item.slug} checked={state.includes(item.slug)} onChange={() => action(item.slug)} />
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      }
    </div>
  )
}
