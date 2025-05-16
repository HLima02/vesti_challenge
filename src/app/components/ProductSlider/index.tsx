'use client'
import React, { useEffect, useState} from 'react'
import Slider from "react-slick";
import { useProductContext } from '@/contexts/ProductContext'
import { ProductFetch } from '@/services/api'

import './style.scss'

type ProductSliderProps = {
  slug: string
}

type mediaItem = {
  media: {
    url: string
  }
}

type mediaType = {
  media: mediaItem[]
}

export default function ProductSlider({slug}:ProductSliderProps) {
  const { setProductFetched } = useProductContext()
  const [product, setProduct] = useState()
  const [media, setMedia] = useState<mediaType[]>([])

  useEffect(() => {
    async function loadProduct(){
      try {
        const productItem = await ProductFetch(`https://apivesti.vesti.mobi/appmarca/v1/products/company/0ec63cc6-04cb-4400-a0e9-5703eeed20e4/product/${slug}/showcase?cid=null&reseller_id=null`)
        setProductFetched(productItem.product_group)
        setMedia(productItem.product_group.media)
      } catch (error) {
        console.log("Error: ", error)
      }
      
    }

    loadProduct()
  }, [slug])

  if(!media || media.length === 0) {
    return <div>Carregando...</div>
  }

  const settings = {
    customPaging: function (i: number) {
      return (
        <a>
          <div className="relative flex gap-4 w-12 sm:w-16 h-12 sm:h-16 overflow-hidden rounded">
            <img
              src={media[i].normal.url}
              alt={`Thumb ${i + 1}`}
            />
          </div>
        </a>
      );
    },
     dots: true,
    dotsClass: 'slick-dots slick-thumb mt-4',
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  }

  return (
    <div className="slider_container">
      <Slider {...settings}>
        {media.map((item, index) => (
          <div key={index}>
            <img src={item.normal.url} alt={`Imagem ${index}`} />
          </div>
        ))}
      </Slider>
      
    </div>
  )
}
