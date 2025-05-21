import React, { useEffect, useState } from 'react'
import { FaPlus, FaMinus  } from "react-icons/fa";
import { AccordionItem } from '@/types/types'


export default function FilterItem({data}:AccordionItem) {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  console.log("filter", data.title)
  return (
    <div className='filter_container'>
      <button onClick={() => setIsOpen(!isOpen)}>{data?.title} <FaPlus/></button>
      {isOpen && 
        <div className='filter_list_options'>
          <ul>
            {data?.data.map((item:any, index:string) => (
              <li key={index}>
                <input type="checkbox" value={item.slug} />
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      }
    </div>
  )
}
