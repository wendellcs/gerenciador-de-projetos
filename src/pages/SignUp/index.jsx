import {Link} from 'react-router-dom'
import { useState } from 'react'

import Header from '../../components/Header/index.jsx'
import './signUp.sass'

export default function SignUp(){
    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    function handleSubmit(e){
        e.preventDefault()

        if(!userName && !email && !password && !confirmPassword){
            alert('Please fill all the fields below')
        }

        if(password !== confirmPassword){
            alert('Passwords are not equal')
        }


    }

    return (
        <div className='container-signup'>
            <Header headerStyle = 'login'/>
            
            <form className='signup-form'>
                <h2 className='signup-form-title'>Faça seu cadastro</h2>

                <div className='signup-form-box'>
                    <label>Seu nome:</label>
                    <input type='text' value={userName} onChange={(e) => {setUserName(e.target.value)}} placeholder='Seu nome'/>
                </div>

                <div className='signup-form-box'>
                    <label>Seu e-mail:</label>
                    <input type='email' value={email} onChange={(e) => {setEmail(e.target.value)}} placeholder='exemplo@exemplo.com'/>
                </div>

                <div className='password-area'>
                    <div className='password-box'>
                        <label>Sua senha:</label>
                        <input type='password' value={password} onChange={(e) => {setPassword(e.target.value)}} placeholder='********'/>
                    </div>
                    <div className='password-box'>
                        <label>Confirme sua senha:</label>
                        <input type='password' value={confirmPassword} onChange={(e) => {setConfirmPassword(e.target.value)}} placeholder='********'/>
                    </div>
                </div>

                <button className='btn form' onClick={(e) => {handleSubmit(e)}} type='submit'>Criar conta</button>

                <div className='signup-form-text'>
                    <p>Já possui uma conta?</p>
                    <Link to={'/'}>Crie uma aqui para fazer login</Link>
                </div>
            </form>
        </div>
    )
}