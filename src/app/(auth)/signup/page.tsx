import React from 'react'
import Link from 'next/link'

export default function SignUp() {
  return (
    <div className='auth_container'>
      <form >
        <h2>Cadastro</h2>
        <input type='text' placeholder='Nome' />
        <input type='email' placeholder='E-mail' />
        <input type='password' placeholder='Senha' />
        <input type='submit' value="Cadastrar" />
        <Link href='/signin'>já possui uma conta? Faça Login.</Link>
      </form>
    </div>
  )
}
