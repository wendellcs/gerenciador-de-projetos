import { Link } from 'react-router-dom'
import './signIn.sass'
import Header from '../../components/Header/index.jsx'

export default function SignIn(){
    return (
        <div className='container-login'>
            <Header headerStyle='login'/>
            
            <form className='login-form'>
                <h2 className='form-title'>Faça Login</h2>

                <div className='form-box'>
                    <label>Seu e-mail:</label>
                    <input type='email' placeholder='exemplo@exemplo.com'/>
                </div>
                <div className='form-box'>
                    <label>Sua senha:</label>
                    <input type='password' placeholder='********'/>
                </div>

                <button className='btn form' type='submit'>Entrar</button>

                <div className='form-text'>
                    <p>Ainda não tem uma conta?</p>
                    {/* Colocar para onde o link leva com o to = {} */}
                    <Link>Crie uma aqui</Link>
                </div>
            </form>
        </div>
     
    )
}