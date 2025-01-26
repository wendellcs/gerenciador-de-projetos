import { Link } from "react-router-dom"

export default function LoginAlert({message}){
    return (
        <div className="alert-container">
            <h3 className= 'small-title'>Faça <Link className='link' to={'/login'}>login</Link> {message}</h3>
        </div>
    )
}