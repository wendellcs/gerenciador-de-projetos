import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { collection, getDocs } from 'firebase/firestore'; 
import { db } from '../../services/firebaseConnections'

import { IoCheckmarkDoneCircleOutline, IoCodeWorkingSharp, IoAddCircleSharp } from 'react-icons/io5';
import { CiSearch, CiSettings } from 'react-icons/ci';
import { IoMdOptions } from 'react-icons/io';
import { MdCancel } from 'react-icons/md';
import { GiNightSleep } from 'react-icons/gi';

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

                <section className='home-menu'>
                    <form className='home-menu-form'>
                        <input type='text' placeholder='Buscar projeto'/>
                        <CiSearch className='icon light'/>
                    </form>
                    <h2 className='home-menu-title'>Seus Projetos</h2>
                    <div className='menu-icons'>
                        <IoMdOptions className='icon primary'/>
                        <Link to={'/newproject'}><IoAddCircleSharp className='icon primary'/></Link>
                    </div>
                </section>

                <section className='projects-section'>
                    {user.email ? (
                        <div className='conected'>
                            {projectList.length > 0 && projectList.map((project) =>
                                <div className='project'>
                                    <h3 className='project-title'>{project.name}</h3>

                                    <div className='project-container'>
                                        <div className='project-container-image'>
                                            { project.image ? (
                                                <img src={project.image} alt={`Imagem do projeto ${project.name}`} />
                                            ):(
                                                <img src='' alt='Imagem do projeto'/>
                                            )}
                                        </div>

                                        <div className='project-container-infos'>
                                            <p className='project-tasks'>5</p>

                                            <div className='project-status'>
                                                {project.status == 'not-started' && <MdCancel className='icon not-started'/>}
                                                {project.status == 'paused' && <GiNightSleep className='icon paused'/>}
                                                {project.status == 'in-progress' && <IoCodeWorkingSharp className='icon in-progress'/>}
                                                {project.status == 'completed' && <IoCheckmarkDoneCircleOutline className='icon completed'/>}
                                            </div>

                                            <div className='project-settings'>
                                                <Link/>
                                                <CiSettings className='icon primary project-icon'/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                )}
                        </div>
                    ):(
                      <LoginAlert message={'para ver seus projetos.'}/>
                    )}
                    
                </section>
            </div>
        </main>
    )
}