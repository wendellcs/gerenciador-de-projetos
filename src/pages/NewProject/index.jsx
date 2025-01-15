import './newProject.sass'
import Header from '../../components/Header'
import { useState, useEffect } from 'react'
import { CiImageOn } from "react-icons/ci";

import {db} from "../../services/firebaseConnections"
import { useSelector } from 'react-redux';

import LoginAlert from '../../components/LoginAlert';
import { collection, addDoc } from 'firebase/firestore';
import ProjectStatus from '../../components/ProjectStatus';

export default function NewProject(){    
    const [projectName, setProjectName] = useState('')
    const [projectStatus, setProjectStatus] = useState('not-started')
    const [projectDescription, setProjectDescription] = useState('')

    const [startDate, setStartDate] = useState('')
    const [completionDate, setCompletionDate] = useState('')
    const [projectImage, setProjectImage] = useState(null)

    const [user, setUser] = useState()
    const userData = useSelector(state => state.user.currentUser)

    const [statusMessage, setStatusMessage] = useState([])

    useEffect(() => {
        setUser(userData)
    }, [userData])

    const statusMessages = {
        'not-started': 'Projeto ainda não iniciado.',
        'paused': 'Projeto pausado...',
        'in-progress': 'Trabalhando no projeto.',
        'completed': 'Projeto concluído.'
    }

    useEffect(()=> {
        setStatusMessage([projectStatus, statusMessages[projectStatus]])
    }, [projectStatus])

    async function addProject(e){
        e.preventDefault()

        const dates = [startDate, completionDate]

        await addDoc(collection(db, 'projects'), {
            name: projectName,
            dates,
            description: projectDescription,
            image: projectImage,
            status: projectStatus,
            userUid: user.uid
        }).then(() => {
            alert('Projeto adicionado')

            setProjectStatus('')
            setProjectName('')
            setProjectDescription('')
            setStartDate('')
            setCompletionDate('')
            setProjectImage(null)   
        }).catch(e => {
            console.log(e.message)
        })
    }

    return (
        <main>
            <Header/>
            <div className="new-container">
                <h1>Adicionar Projeto</h1>
                
                {user && user.email ? (

                    <form>
                    <h2 className='title'>Informações do projeto</h2>
                    <div className="form-box">
                        <label htmlFor = 'project-name'>Nome do projeto</label>
                        <input type="text" placeholder='Nome do projeto' id='project-name' value={projectName} onChange={e => {setProjectName(e.target.value)}}/>
                    </div>

                    <div className="form-box">
                        <h3>Status do projeto</h3>

                        <ProjectStatus simple={false} checkStatus={setProjectStatus}/>

                        <p className={`text ${statusMessage[0]}`}>{statusMessage[1]}</p>
                    </div>

                    <div className="form-box">
                        <label htmlFor = 'project-description'>Descrição do projeto</label>
                        <textarea placeholder='Descreva seu projeto' className='description' id="project-description" value={projectDescription} onChange={(e) => setProjectDescription(e.target.value)}></textarea>
                    </div>

                    <div className="form-box">
                        <div className="date-container">
                            <div className="box">
                                <label htmlFor = 'project-description'>Data de inicio</label>
                                <div className='date'>
                                    <p className='start-date'>08/1/25</p>
                                </div>
                            </div>

                            <div className="box">
                                <label htmlFor = 'project-description'>Conclusão</label>
                                <div className='date'>
                                    <p className='completion-date'>{projectStatus == 'completed' ? 'Incompleto' : '10/1/25' }</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='form-box'>
                        <label htmlFor = 'project-image'>Print do projeto</label>

                        <div className="preview">
                            <CiImageOn className='icon primary'/>
                        </div>

                        <input type="file" className='project-image' onChange={(e) => setProjectImage(e.target.files[0])}/>
                    </div>

                    <button className='btn add-project form' onClick={(e) => addProject(e)}>Adicionar</button>
                </form>
                ):(
                    <LoginAlert message={'para acessar essa página.'}/>
                )}
            </div>
        </main>
    )
}