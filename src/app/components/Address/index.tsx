import React, { useState } from 'react'
import { insertMaskInCEP } from '@/services/address'
import { AddressType } from '@/types/types'
import { useProductContext } from '@/contexts/ProductContext'
import { IoMdClose } from "react-icons/io";

import './style.scss'
import { toast } from 'react-toastify';

export default function Address() {
  const [cep, setCep] = useState<string>("")
  //const [address, setAddress] = useState<AddressType | null>(null)
  const [error, setError] = useState<string>('')
  const { address, setAddress } =  useProductContext()

  console.log("Endereço: ", address)

  const handleAddress = async () => {
    const cleanCEP = cep.replace(/\D/g, '')

    if(cleanCEP.length !== 8){
      setError('CEP inválido. Deve conter 8 dígitos')
      return
    }

    try {
      const req = await fetch(`https://viacep.com.br/ws/${cleanCEP}/json/`)
      const data:AddressType = await req.json()
      
      if(data.erro){
        setError('CEP não encontrado.');
        setCep('')
      } else {
        setError('');
        const checkAddress = address.findIndex(item => item.cep == data.cep)
        console.log(checkAddress)
        if(checkAddress == 0 ){
          toast.warning("Esse CEP já esta cadastrado!")
          return
        }
        setAddress((prev:AddressType[]) => [...prev, data] );
        setCep('')
      }
    } 

    catch {
      setError('Erro ao consultar o CEP.');
      setAddress(null);
    }
  }

  const handleDelete = (item:AddressType) => {
    console.log(item)
  }
  
  return (
    <div className='address_section'>
      <h3>Meus endereços</h3>
      {address.length > 0 ? (
        <ul className='address_list'>
          {address.map((item, index) => (
            <li className='address_item' key={index}>
              <span className='end'>Endereço: {item.logradouro}</span>
              <span>Bairro: {item.bairro}</span>
              <span>Cidade: {item.localidade}</span>
              <span>CEP: {item.cep}</span>
              <span className='close' onClick={() => handleDelete(item)}><IoMdClose size={20} /></span>
            </li>
          ))}
        </ul>
      ) : (
        <div>
          <p>Você ainda não possui endereços cadastrados</p>
        </div>
      )}
      <div className='address_input_section'>
        <input value={insertMaskInCEP(cep)} onChange={(e) => setCep(e.target.value)} type='text' placeholder='Digite seu CEP' />
        <button onClick={handleAddress}>Verificar </button>
      </div>
      {error && <p className='address_error'>{error}</p>}
    </div>
  )
}
