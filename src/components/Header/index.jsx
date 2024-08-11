import { useEffect, useState } from 'react'
import './header.sass'
export default function Header(headerStyle){
    const [style, setStyle] = useState(null)
    useEffect(( ) => {
        if(headerStyle){
            setStyle(headerStyle.headerStyle)
        }
    }, [headerStyle])

    return (
        <header className={`container-header ` + style}>
            <h1 className='project-title'>Gerenciador de Projetos</h1>
        </header>
    )
}