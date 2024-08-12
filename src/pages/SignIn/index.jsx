import { Link } from 'react-router-dom'
import './signIn.sass'
import Header from '../../components/Header/index.jsx'

export default function SignIn(){
    return (
        <div className='container-login'>
            <Header headerStyle='login'/>
            
            <form className='login-form'>
                <h2 className='login-form-title'>Faça login</h2>

                <div className='login-form-box'>
                    <label>Seu e-mail:</label>
                    <input type='email' placeholder='exemplo@exemplo.com'/>
                </div>
                <div className='login-form-box'>
                    <label>Sua senha:</label>
                    <input type='password' placeholder='********'/>
                </div>

                <button className='btn form' type='submit'>Entrar</button>

                <div className='login-form-text'>
                    <p>Ainda não tem uma conta?</p>
                    <Link to={'/register'}>Crie uma aqui</Link>
                </div>
            </form>
        </div>
    )
}