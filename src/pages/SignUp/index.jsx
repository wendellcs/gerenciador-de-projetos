import { useState } from 'react'
import { useDispatch } from 'react-redux'
import {Link, useNavigate} from 'react-router-dom'
import {auth , db} from '../../services/firebase/firebaseConnections'
import { createUserWithEmailAndPassword } from 'firebase/auth'

import Header from '../../components/Header/index.jsx'
import { setDoc , doc} from 'firebase/firestore'
import { setCurrentUser } from '../../redux/user/slice'

export default function SignUp(){
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const navigate = useNavigate()
    const dispatch = useDispatch()

    async function handleSubmit(e){
        e.preventDefault()

        if(!name && !email && !password && !confirmPassword){
            alert('Please fill all the fields below')
        }

        if(password !== confirmPassword){
            alert('Passwords are not equal')
        }

        try {
            const userCredentials = await createUserWithEmailAndPassword(auth, email, password)
            const user = userCredentials.user

            dispatch(setCurrentUser({
                name: name,
                email: user.email, 
                uid: user.uid,
            }))

            await setDoc(doc(db, 'users' , user.uid), {
                name,
                email
            })

            setName('')
            setEmail('')
            setPassword('')
            setConfirmPassword('')
            
            navigate('/')

        } catch(err) {
            console.log(err)
            alert('Erro ao cadastrar, tente novamente')
        }  
    }

    return (
        <div className='container-signup'>
            <Header headerStyle = 'login'/>
            <form className='signup-form'>
                <h2 className='signup-form-title subtitle'>Faça seu cadastro</h2>

                <div className='signup-form-box'>
                    <label className='label secondary'>Seu nome:</label>
                    <input type='text' className='signup-input' value={name} onChange={(e) => {setName(e.target.value)}} placeholder='Seu nome'/>
                </div>

                <div className='signup-form-box'>
                    <label className='label secondary'>Seu e-mail:</label>
                    <input type='email' className='signup-input' value={email} onChange={(e) => {setEmail(e.target.value)}} placeholder='exemplo@exemplo.com'/>
                </div>

                <div className='signup-form-box'>
                    <label className='label'>Sua senha:</label>
                    <input type='password' className='signup-input' value={password} onChange={(e) => {setPassword(e.target.value)}} placeholder='********'/>
                </div>

                <div className='signup-form-box'>
                    <label className='label'>Confirme sua senha:</label>
                    <input type='password' className='signup-input' value={confirmPassword} onChange={(e) => {setConfirmPassword(e.target.value)}} placeholder='********'/>
                </div>

                <button className='btn form' onClick={(e) => {handleSubmit(e)}} type='submit'>Criar conta</button>

                <div className='signup-form-text'>
                    <p className='text normal'>Já possui uma conta?</p>
                    <Link className='link' to={'/login'}>Crie uma aqui para fazer login</Link>
                </div>
            </form>
        </div>
    )
}