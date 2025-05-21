import { ProductFetch } from './api'

export const filters = async (title:string, url:string) => {
  try {
    const brandList = await ProductFetch(url)
    const brands = {
      title,
      data: brandList.data || []
    }

    return brands
  } catch (error) {
    console.error('Erro ao buscar marcas:', error)
    return {
      title: 'Marcas',
      data: []
    }
  }
}

export const category = async (title:string, url:string) => {
  try {
    const categoryList = await ProductFetch(url)  
    const category = {
      title,
      data: categoryList || []
    }

    return category

  } catch (error) {
    console.log("Erro:", error)
  }
}