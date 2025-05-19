import React from 'react'
import Link from 'next/link'
import './style.scss'

export default function SignIn() {
  return (
    <div className='auth_container'>
      <form >
        <h2>Login</h2>
        <input type='email' placeholder='E-mail' />
        <input type='password' placeholder='Senha' />
        <input type='submit' value="Enviar" />
        <Link href='/signup'>Não possui uma conta? Cadastre-se.</Link>
      </form>
    </div>
  )
}
