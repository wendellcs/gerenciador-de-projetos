import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { CiSearch } from "react-icons/ci";
import { IoMdOptions } from "react-icons/io";
import { IoAddCircleSharp } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore'; 
import {db} from "../../services/firebaseConnections"

import LoginAlert from '../../components/LoginAlert';
import Header from '../../components/Header'
import './home.sass'

export default function Home(){
    const [projectList , setProjectList] = useState([])
    const [user, setUser] = useState('')
    
    const userData = useSelector((state) => state.user.currentUser)

    useEffect(() => {
        setUser(userData)
    }, [userData])

    useEffect(() => {
        async function getProjects(){
            const querySnapshot = collection(db, 'projects') 
            await getDocs(querySnapshot).then((snapshot) => {
                const list = []

                snapshot.forEach((doc) => {
                    if(doc.data().userUid == user.uid){
                        list.push({...doc.data(), id: doc.id })
                    }
                })

                setProjectList(list)
            })
        }

        getProjects()
    }, [])

    return (
        <main>
            <Header/>
            <div className='home-container'>

                <div className="home-menu">
                    <form className='home-menu-form'>
                        <input type="text" placeholder="Buscar projeto"/>
                        <CiSearch className='icon light'/>
                    </form>
                    <h2 className='home-menu-title'>Seus Projetos</h2>
                    <div className='menu-icons'>
                        <IoMdOptions className='icon primary'/>
                        <Link to={'/newproject'}><IoAddCircleSharp className='icon primary'/></Link>
                    </div>
                </div>

                <div className='projects-container'>
                    {user.email ? (
                        <div className='conected'>
                            <div className='conected-projects'>
                                {projectList.length > 0 && projectList.map((project) =>
                                    <p key={project.id}>{project.name}</p>
                                )}
                            </div>
                            oi
                        </div>
                    ):(
                      <LoginAlert message={'para ver seus projetos.'}/>
                    )}
                    
                </div>
            </div>
        </main>
    )
}