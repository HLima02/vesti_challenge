'use client'
import React, { useState } from 'react'
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import Image from 'next/image';
import './style.scss'
import { useProductContext } from '@/contexts/ProductContext'

import logo_desktop from '@/assets/logo_desktop.png'
import logo_mobile from '@/assets/logo_mobile.jpg'

import { CgProfile } from "react-icons/cg";
import { BsCart3 } from "react-icons/bs";
import { IoSearch } from "react-icons/io5";

export default function Header() {
  const { user, products, filteredList, setFilteredList } = useProductContext()
  const [isInputSearchOpen, setIsInputSearchOpen] = useState<boolean>(false)
  const router = useRouter()

  return (
    <header className='width_container'>
      {/* Header na versão desktop, maior 760px */}
      <div className='header_desktop'>
        <div className='header_left'>
          <Link className='header__logo' href="/">
            <Image src={logo_desktop} alt='Logo'  />
          </Link>
        </div>

        <div className='header_right'>
          <div className='header__input_area'>
            <input value={filteredList} onChange={(e) => setFilteredList(e.target.value)} type='text' placeholder='Buscar produtos' />
            <IoSearch size={20}/>
          </div>
          {(!!user) ? (
            <div>
              <span className='header__cart'>
                <BsCart3 size={20}/>
              </span>
              <span className='header__cart'>
                <CgProfile onClick={() => router.push('/profile')}  size={20}/>
              </span>
            </div>
          ) : (
            <span className='btn_entrar'>
              <button onClick={() => router.push('/signin')}>Entrar</button>
            </span>
          )}
        </div>
      </div>

      {/* Header na versão mobile, menor 760px */}
      <div className='header_mobile'>
        <div className='header_mobile_top'>
          <div className='header_left'>
            <span className='header__menu'></span>
            <Link className='header__logo' href="/">
              <Image src={logo_mobile} alt='Logo'  />
            </Link>
          </div>
          <div className='header_right'>
            <span className='header__search' onClick={() => setIsInputSearchOpen(!isInputSearchOpen)} >
              <IoSearch size={20}/>
            </span>
            {(!!user) ? (
              <div>
                <span className='header__cart'>
                  <BsCart3 size={20}/>
                </span>
                <span onClick={() => router.push('/profile')} className='header__cart'>
                  <CgProfile  size={20}/>
                </span>
              </div>
            ) : (
              <span className='btn_entrar'>
                <button onClick={() => router.push('/signin')}>Entrar</button>
              </span>
            )}
          </div>
        </div>
        {isInputSearchOpen && 
          <div className='header_mobile_bottom'>
            <input value={filteredList} onChange={(e) => setFilteredList(e.target.value)} type='text' placeholder='Buscar produtos' />
          </div>
        }
      </div>
    </header>
  )
}
