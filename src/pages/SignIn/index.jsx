import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth, db} from '../../services/firebase/firebaseConnections'
import { setCurrentUser} from '../../redux/user/slice.jsx'

import Header from '../../components/Header/index.jsx'
import { getDoc, doc } from 'firebase/firestore'

export default function SignIn(){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()
    const dispatch = useDispatch()

    async function handleSignIn(e){
        e.preventDefault()

        if(!password || !email){
            alert('fields cannot be empty')
            return 
        }

        try {
            const userCredentials = await signInWithEmailAndPassword(auth, email, password)
            const user = userCredentials.user

            const docRef = doc(db, 'users', user.uid)
            const docSnap = await getDoc(docRef)

            dispatch(setCurrentUser({
                name: docSnap.data().name,
                email: email,
                uid: user.uid,
                online: true
            }))

            setEmail('')
            setPassword('')

            navigate('/')
        } catch (e) {
            console.log(e.message)
        }
    }

    return (
        <div className='container-login'>
            <Header headerStyle='login'/>
            
            <form className='login-form'>
                <h2 className='login-form-title subtitle'>Faça login</h2>

                <div className='login-form-box'>
                    <label className='label secondary'>Seu e-mail:</label>
                    <input type='email' className='login-input' value={email} onChange={(e) => {setEmail(e.target.value)}} placeholder='exemplo@exemplo.com'/>
                </div>
                <div className='login-form-box'>
                    <label className='label secondary'>Sua senha:</label>
                    <input type='password' className='login-input' value={password} onChange={(e) => {setPassword(e.target.value)}}  placeholder='********'/>
                </div>

                <button className='btn form' onClick={(e) => {handleSignIn(e)}} type='submit'>Entrar</button>

                <div className='login-form-text'>
                    <p className='text normal'>Ainda não tem uma conta?</p>
                    <Link className='link' to={'/register'}>Crie uma aqui</Link>
                </div>
            </form>
        </div>
    )
}