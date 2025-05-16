const  BASE_URL = 'https://apivesti.vesti.mobi/appmarca/v2/catalogue/company/vesti'

export const catalogFetch = async (endpoint:string) => {
  const req = await fetch(endpoint)
  const data = await req.json()
  return data
}