import './newProject.sass'
import Header from '../../components/Header'
import { useState } from 'react'
import { IoCheckmarkDoneCircleOutline, IoCodeWorkingSharp } from "react-icons/io5";
import { CiImageOn } from "react-icons/ci";
import { MdCancel } from "react-icons/md";
import { GiNightSleep } from "react-icons/gi";

export default function NewProject(){
    const [checkNotStarted, setCheckNotStarted] = useState(true)
    const [checkPaused, setCheckPaused] = useState(false)
    const [checkInProgress, setCheckInProgress] = useState(false)
    const [checkCompleted, setCheckCompleted] = useState(false)
    const [checkMessage, setCheckMessage] = useState(['not-started', 'Projeto ainda não iniciado'])
    
    const [projectName, setProjectName] = useState('')
    const [projectStatus, setProjectStatus] = useState('')
    const [projectDescription, setProjectDescription] = useState('')
    const [startDate, setStartDate] = useState('')
    const [completionDate, setCompletionDate] = useState('')
    const [projectImage, setProjectImage] = useState(null)

    function check(element){
        switch(element){
            case 'not-started':
                setCheckNotStarted(true)
                setCheckPaused(false)
                setCheckInProgress(false)
                setCheckCompleted(false)

                setCheckMessage(['not-started', 'Projeto ainda não iniciado'])
                break
            case 'paused':
                setCheckNotStarted(false)
                setCheckPaused(true)
                setCheckInProgress(false)
                setCheckCompleted(false)

                setCheckMessage(['paused', 'Projeto pausado...'])
                break
            case 'in-progress':
                setCheckNotStarted(false)
                setCheckPaused(false)
                setCheckInProgress(true)
                setCheckCompleted(false)

                setCheckMessage(['in-progress', 'Trabalhando no projeto'])
                break
            case 'completed':
                setCheckNotStarted(false)
                setCheckPaused(false)
                setCheckInProgress(false)
                setCheckCompleted(true)

                setCheckMessage(['completed', 'Projeto finalizado!'])
                break
        }

        setProjectStatus(checkMessage[0])
    }

    function addProject(e){
        e.preventDefault()

        const dates = [startDate, completionDate]

        const data = {
            name: projectName,
            status: projectStatus,
            date: dates,
            description: projectDescription,
            image: projectImage
        }

        // Guardar os dados no storage
        console.log(data)
    }

    return (
        <main>
            <Header/>
            <div className="new-container">
                <h1>Adicionar Projeto</h1>
                
                <form>
                    <h2 className='title'>Informações do projeto</h2>
                    <div className="form-box">
                        <label htmlFor = 'project-name'>Nome do projeto</label>
                        <input type="text" placeholder='Nome do projeto' id='project-name' value={projectName} onChange={e => {setProjectName(e.target.value)}}/>
                    </div>

                    <div className="form-box">
                        <h3>Status do projeto</h3>

                        <div className='project-status'>
                            <div className={checkNotStarted ? 'status not-started checked' : 'status not-started'}  onClick={() => {check('not-started')}}>
                                <MdCancel className='icon not-started'/>
                            </div>

                            <div className={ checkPaused ? "status paused checked" : "status paused"} onClick={() => {check('paused')}}>
                                <GiNightSleep className='icon paused'/>
                            </div>
                      
                            <div className={ checkInProgress ? "status in-progress checked" : "status in-progress"} onClick={() => {check('in-progress')}}>
                                <IoCodeWorkingSharp className='icon in-progress'/>
                            </div>

                            <div className={ checkCompleted ? "status completed checked" : "status completed"} onClick={() => {check('completed')}}>
                                <IoCheckmarkDoneCircleOutline className='icon completed'/>
                            </div>
                        </div>

                        <p className={`text ${checkMessage[0]}`}>{checkMessage[1]}</p>
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
                                    <p className='completion-date'>{!checkCompleted ? 'Incompleto' : '10/1/25' }</p>
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
            </div>
        </main>
    )
}