import { ProductFetch } from './api'

export const brands = async () => {
  try {
    const brandList = await ProductFetch('https://apivesti.vesti.mobi/appmarca/v1/company/vesti/brands')
    
    const brands = {
      title: 'Marcas',
      data: brandList.data || [] // fallback para array vazio se não houver dados
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
