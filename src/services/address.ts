export const insertMaskInCEP = (cep: string) => {
  return cep.replace(/(\d{5})(\d{3})/, '$1-$2')
}