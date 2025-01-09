import "./loginAlert.sass"
import { Link } from "react-router-dom"

export default function LoginAlert({message}){
    return (
        <h2 className= 'loginMessage'>Faça <Link className='link' to={'/login'}>login</Link> {message}</h2>
    )
}