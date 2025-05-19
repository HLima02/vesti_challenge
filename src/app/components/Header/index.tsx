'use client'
import React, { useState } from 'react'
import Link from 'next/link';
import Image from 'next/image';
import './style.scss'
import { useProductContext } from '@/contexts/ProductContext'

import logo_desktop from '@/assets/logo_desktop.png'
import logo_mobile from '@/assets/logo_mobile.jpg'

import { IoMenu } from "react-icons/io5";
import { BsCart3 } from "react-icons/bs";
import { IoSearch } from "react-icons/io5";

export default function Header() {
  const { products, filteredList, setFilteredList } = useProductContext()

  return (
    <header className='width_container'>
       {/* Header na versão desktop, maior 760px */}
      <div className='header_desktop'>
        <div className='header_left'>
          <span className='header__menu'><IoMenu  color='#000' /></span>
          <Link className='header__logo' href="/">
            <Image src={logo_desktop} alt='Logo'  />
          </Link>
        </div>

        <div className='header_right'>
          <div className='header__input_area'>
            <input value={filteredList} onChange={(e) => setFilteredList(e.target.value)} type='text' placeholder='Buscar produtos' />
            <IoSearch size={20}/>
          </div>
          <span className='header__cart'>
            <BsCart3 size={20}/>
          </span>
        </div>
      </div>

      {/* Header na versão mobile, menor 760px */}
      <div className='header_mobile'>
        <div className='header_mobile_top'>
          <div className='header_left'>
            <span className='header__menu'><IoMenu  color='#000' /></span>
            <Link className='header__logo' href="/">
              <Image src={logo_mobile} alt='Logo'  />
            </Link>
          </div>
          <div className='header_right'>
            <span className='header__search'>
            <IoSearch size={20}/>
            </span>
            <span className='header__cart'>
              <BsCart3 size={20}/>
            </span>
          </div>
        </div>
        <div className='header_mobile_bottom'>
          <input value={filteredList} onChange={(e) => setFilteredList(e.target.value)} type='text' placeholder='Buscar produtos' />
        </div>
      </div>
    </header>
  )
}
