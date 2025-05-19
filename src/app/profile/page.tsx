'use client'
import React from 'react'
import Image from 'next/image'
import profile from '@/assets/profile.jpg'
import { useProductContext } from '@/contexts/ProductContext'
import ProtectedRoute from '../components/ProtectedRouter'

import './style.scss'

export default function Profile() {
  const { user } = useProductContext()
  console.log(user)

  return (
    <ProtectedRoute>
      <div className='width_container profile_container'>
        <div className='profile_icon'>
          <Image src={profile} alt='ícone profile'/>
          <h2>{user?.email}</h2>
        </div>
      </div>
    </ProtectedRoute>
  )
}
