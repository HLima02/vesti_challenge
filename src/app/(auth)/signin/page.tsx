'use client'
import React, { useState} from 'react'
import Link from 'next/link'
import { useProductContext } from '@/contexts/ProductContext'
import { toast } from 'react-toastify'
import './style.scss'

export default function SignIn() {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const { signIn } = useProductContext()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if(email != "" && password != ""){
      signIn(email, password)
    } else {
      toast.warning("Por favor, preencha todos os campos!")
      return
    }
    
  }

  return (
    <div className='auth_container'>
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input value={email}  onChange={(e) => setEmail(e.target.value)} type='email' placeholder='E-mail' />
        <input  value={password}  onChange={(e) => setPassword(e.target.value)} type='password' placeholder='Senha' />
        <input type='submit' value="Enviar" />
        <Link href='/signup'>Não possui uma conta? Cadastre-se.</Link>
      </form>
    </div>
  )
}
