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

export const filterbrands = async (list:string[]) => {
  const listString = list.join(',')
  try {
    const sideFilter = await ProductFetch(`https://apivesti.vesti.mobi/appmarca/v2/catalogue/company/vesti/?page=1&perpage=60&filter[brand_slugs]=${listString}%20&with_colors=true`)  
    //console.log(sideFilter.products)
    return sideFilter.products
    
  } catch (error) {
    console.log("Erro:", error)
  }
  
}