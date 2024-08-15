import { Link } from 'react-router-dom'
import './signIn.sass'
import Header from '../../components/Header/index.jsx'
import { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../services/firebaseConnections.jsx'

export default function SignIn(){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function handleSignIn(e){
        e.preventDefault()

        console.log(password, email)

        if(!password || !email){
            alert('fields cannot be empty')
        }

        await signInWithEmailAndPassword(auth, email, password)
            .then((value) => {
                console.log(value.user)
            }).catch(err => {
                console.log(err)
            })
            
    }


    return (
        <div className='container-login'>
            <Header headerStyle='login'/>
            
            <form className='login-form'>
                <h2 className='login-form-title'>Faça login</h2>

                <div className='login-form-box'>
                    <label>Seu e-mail:</label>
                    <input type='email' value={email} onChange={(e) => {setEmail(e.target.value)}} placeholder='exemplo@exemplo.com'/>
                </div>
                <div className='login-form-box'>
                    <label>Sua senha:</label>
                    <input type='password' value={password} onChange={(e) => {setPassword(e.target.value)}}  placeholder='********'/>
                </div>

                <button className='btn form' onClick={(e) => {handleSignIn(e)}} type='submit'>Entrar</button>

                <div className='login-form-text'>
                    <p>Ainda não tem uma conta?</p>
                    <Link to={'/register'}>Crie uma aqui</Link>
                </div>
            </form>
        </div>
    )
}