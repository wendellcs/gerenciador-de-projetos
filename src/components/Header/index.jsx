import { useEffect, useState } from 'react'
import { FaGithub, FaLinkedin  } from "react-icons/fa";
import { CiGlobe } from "react-icons/ci";
import { Link } from 'react-router-dom';
export default function Header({headerStyle}){
    const [style, setStyle] = useState(undefined)
    useEffect(( ) => {
        if(headerStyle){ 
            setStyle(headerStyle)
        }
        
    }, [headerStyle])

    return (
        <header className={`container-header ` + style}>
            <h1 className='project-title'>Gerenciador de Projetos</h1>

            {!style && 
                <nav className='header-links'>
                    <ul className='header-links-ul'>
                        <li><Link to={'/'}>Home</Link></li>

                        <div className='header-links-ul-icons'>
                            <li><a href="#"><FaGithub className='icon light'/></a></li>
                            <li><a href="#"><CiGlobe className='icon light'/></a></li>
                            <li><a href="#"><FaLinkedin className='icon light'/></a></li>
                        </div>
                    </ul>
                </nav>
            }
        </header>
    )
}