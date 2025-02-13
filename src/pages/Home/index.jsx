import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { collection, getDocs } from 'firebase/firestore'; 
import { db } from '../../services/firebase/firebaseConnections'

import {IoAddCircleSharp } from 'react-icons/io5';
import { CiSearch, CiSettings } from 'react-icons/ci';
import { IoMdOptions } from 'react-icons/io';

import LoginAlert from '../../components/LoginAlert';
import Header from '../../components/Header'
import Loading from '../../components/Loading/';
import ProjectStatus from '../../components/ProjectStatus';

export default function Home(){
    const [projectList , setProjectList] = useState([])
    const [user, setUser] = useState('')
    const [loading, setLoading] = useState(false)
    
    const userData = useSelector((state) => state.user.currentUser)

    useEffect(() => {
        setUser(userData)
    }, [userData])

    useEffect(() => {
        setLoading(true)
        async function getProjects(){
            try {
                const querySnapshot = collection(db, 'projects') 
                const snapshot = await getDocs(querySnapshot)

                const list = []

                snapshot.forEach((doc) => {
                    if(doc.data().userUid == user.uid){
                        list.push({...doc.data(), id: doc.id })
                    }
                })

                setProjectList(list)

            } catch(e) {
                console.log(e)
            } finally {
                setLoading(false)
            }
        }

        getProjects()
    }, [user.uid])

    return (
        <main>
            <Header/>
            <div className='home-container'>
                <section className='home-menu'>
                    <form className='home-menu-form'>
                        <input type='text' placeholder='Buscar projeto' className='home-input'/>
                        <CiSearch className='icon light home-icon'/>
                    </form>
                    <h2 className='home-menu-title subtitle'>Seus Projetos</h2>
                    <div className='menu-icons'>
                        <IoMdOptions className='icon primary'/>
                        <Link to={'/newproject'}><IoAddCircleSharp className='icon primary'/></Link>
                    </div>
                </section>

                {loading ? (
                    <Loading/>
                ): (
                <section className='projects-section'>
                    {user.email ? (
                        <div className='conected'>
                            {projectList.length > 0 && projectList.map((project) =>
                                <div className='project' key={project.id}>
                                    <h3 className='small-title project-title'>{project.name}</h3>

                                    <div className='project-container'>
                                        <div className='project-container-image'>
                                            { project.image ? (
                                                <img src={project.image} alt={`Imagem do projeto ${project.name}`} />
                                            ):(
                                                <img src='' alt='Imagem do projeto'/>
                                            )}
                                        </div>

                                        <div className='project-container-infos'>
                                            <p className='project-tasks'>{project.taskList?.length || '0'}</p>

                                            <div className='project-status'>
                                                <ProjectStatus simple={true} status={project.status}/>
                                            </div>

                                            <div className='project-settings'>
                                                <Link className='link-manage' to={`/manage/${project.id}`}><CiSettings className='icon primary project-icon'/></Link>
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
                )}
            </div>
        </main>
    )
}