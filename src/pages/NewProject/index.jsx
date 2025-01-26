import Header from '../../components/Header'
import { useState, useEffect } from 'react'
import { CiImageOn } from "react-icons/ci";
import { FaCheck } from "react-icons/fa";

import {db} from "../../services/firebase/firebaseConnections"
import { useSelector } from 'react-redux';

import LoginAlert from '../../components/LoginAlert';
import { collection, addDoc } from 'firebase/firestore';
import ProjectStatus from '../../components/ProjectStatus'
import { verifyDate } from '../../services/dateFunctions';

export default function NewProject(){    
    const [projectName, setProjectName] = useState('')
    const [projectStatus, setProjectStatus] = useState('not-started')
    const [projectDescription, setProjectDescription] = useState('')

    const [startDate, setStartDate] = useState('')
    const [projectImage, setProjectImage] = useState(null)
    const [checkboxChecked, setCheckboxChecked] = useState(true)

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

        if(verifyDate(startDate)) {
            await addDoc(collection(db, 'projects'), {
                name: projectName,
                dates: [startDate],
                description: projectDescription,
                image: projectImage,
                status: projectStatus,
                userUid: user.uid
            }).then(() => {
                alert('Projeto adicionado')

                setProjectStatus('')
                setProjectName('')
                setProjectDescription('')
                setStartDate(generateDate())
                setProjectImage(null)   
                setCheckboxChecked(true)
                
            }).catch(e => {
                console.log(e.message)
            })
        }
    }

    function generateDate(){
        const date = new Date()
        return `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`
    }

    useEffect(()=> {
        setStartDate(generateDate())
    }, [])

    return (
        <main>
            <Header/>
            <div className="new-container">
                <h2 className='new-container-title subtitle'>Adicionar Projeto</h2>
                
                {user && user.email ? (

                    <form>
                        <h3 className='form-title small-title'>Informações do projeto</h3>
                        <div className="form-box">
                            <label htmlFor = 'project-name' className='label secondary'>Nome do projeto</label>
                            <input type="text" className='new-input' placeholder='Nome do projeto' id='project-name' value={projectName} onChange={e => {setProjectName(e.target.value)}}/>
                        </div>

                        <div className="form-box">
                            <label className='label secondary'>Status do projeto</label>

                            <ProjectStatus simple={false} checkStatus={setProjectStatus}/>

                            <p className={`text ${statusMessage[0]} normal`}>{statusMessage[1]}</p>
                        </div>

                        <div className="form-box">
                            <label htmlFor = 'project-description' className='label secondary'>Descrição do projeto</label>
                            <textarea placeholder='Descreva seu projeto' className='description' id="project-description" value={projectDescription} onChange={(e) => setProjectDescription(e.target.value)}></textarea>
                        </div>

                        <div className="form-box">
                            <h4 className='date-title smaller-title'>Data de inicio do projeto</h4>
                            <div className="box-date">
                                <label htmlFor = 'project-description' className='label primary'>Data de inicio</label>
                                <div className='date'>
                                    <input type="text" className='new-input date' disabled={checkboxChecked} value={startDate} onChange={(e) => setStartDate(e.target.value)}/>
                                </div>
                            </div>

                            <div className="box-checkbox">
                                <label htmlFor="" className='label secondary'>Nunca trabalhei nesse projeto antes</label>
                                <div className='checkbox' onClick={() => setCheckboxChecked(!checkboxChecked)}>
                                    {checkboxChecked && <FaCheck className='icon primary'/>}
                                </div>
                            </div>
                        </div>

                        <div className='form-box'>
                            <label htmlFor = 'project-image' className='label secondary'>Print do projeto</label>

                            <div className="preview">
                                <CiImageOn className='icon primary'/>
                            </div>

                            <input type="file" id='project-image' className='new-input image'onChange={(e) => setProjectImage(e.target.files[0])}/>
                        </div>

                        <button className='btn form' onClick={(e) => addProject(e)}>Adicionar</button>
                    </form>
                ):(
                    <LoginAlert message={'para acessar essa página.'}/>
                )}
            </div>
        </main>
    )
}