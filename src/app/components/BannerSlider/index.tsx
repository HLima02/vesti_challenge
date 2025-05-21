import React from 'react'
import Slider from "react-slick";
import Image from 'next/image';
import { BannerData } from '@/services/bannerData'
import banner from '@/assets/banner_01.png'
import banner_mobile from '@/assets/banner_01_mobile.png'

import './style.scss'

export default function BannerSlider() {
   const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <div className='banner_container'>
      <Image src={banner} alt={`Imagem `} className='banner_desktop' />  
      <Image src={banner_mobile} alt={`Imagem `} className='banner_mobile'  />      
    </div>
  )
}
