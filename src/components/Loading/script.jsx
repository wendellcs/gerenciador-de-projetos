import './loading.sass'
import { RiLoaderFill } from "react-icons/ri";

export default function Loading(){
    return (
        <div className='loading'>
            <RiLoaderFill className='icon primary'/>
            <p>Carregando projetos</p> 
        </div>
    )
}