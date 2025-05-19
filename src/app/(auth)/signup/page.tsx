'use client'
import React, {useState} from 'react'
import Link from 'next/link'
import { useProductContext } from '@/contexts/ProductContext'
import { toast } from 'react-toastify'

export default function SignUp() {
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const { signUp } = useProductContext()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if(name != "" && email != "" && password != ""){
      signUp(name, email, password)
    } else {
      toast.warning("Por favor, preencha todos os campos!")
      return
    }
    
  }

  return (
    <div className='auth_container'>
      <form onSubmit={handleSubmit} >
        <h2>Cadastro</h2>
        <input value={name}  onChange={(e) => setName(e.target.value)} type='text' placeholder='Nome' />
        <input value={email}  onChange={(e) => setEmail(e.target.value)}  type='email' placeholder='E-mail' />
        <input value={password}  onChange={(e) => setPassword(e.target.value)}  type='password' placeholder='Senha' />
        <input type='submit' value="Cadastrar" />
        <Link href='/signin'>já possui uma conta? Faça Login.</Link>
      </form>
    </div>
  )
}
