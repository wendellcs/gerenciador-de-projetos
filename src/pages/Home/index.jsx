import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { CiSearch } from "react-icons/ci";
import { IoMdOptions } from "react-icons/io";

import Header from '../../components/Header'
import './home.sass'

export default function Home(){
    const [projectList , setProjectList] = useState([])
    const [user, setUser] = useState('')
    
    const userData = useSelector((state) => state.user.currentUser)

    useEffect(() => {
        setUser(userData)
    }, [userData])

    return (
       <div>
        <Header/>
        <div className='home-container'>
            <div className="home-header">
                <form className='home-header-form'>
                    <input type="text" placeholder="Buscar projeto"/>
                    <CiSearch className='icon light'/>
                </form>
                <h2 className='home-header-title'>Seus Projetos</h2>
                <IoMdOptions className='filter'/>
            </div>

            <div className='home-projects'>

                Seus projetos aparecem aqui

                {user && (
                    <p>
                        {user.email}
                    </p>
                )}
                
            </div>
        </div>
       </div>
    )
}