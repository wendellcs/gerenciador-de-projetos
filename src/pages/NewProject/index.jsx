import './newProject.sass'
import Header from '../../components/Header'
import { useEffect, useState } from 'react'
import { IoCheckmarkDoneCircleOutline, IoCodeWorkingSharp } from "react-icons/io5";
import { MdCancel } from "react-icons/md";
import { GiNightSleep } from "react-icons/gi";

export default function NewProject(){
    const [projectName, setProjectName] = useState('')

    const [checkNotStarted, setCheckNotStarted] = useState(true)
    const [checkPaused, setCheckPaused] = useState(false)
    const [checkInProgress, setCheckInProgress] = useState(false)
    const [checkCompleted, setCheckCompleted] = useState(false)
    const [checkMessage, setCheckMessage] = useState(['not-started', 'Projeto ainda não iniciado'])

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
                        <textarea placeholder='Descreva seu projeto' className='description' id="project-description"></textarea>
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
                </form>
            </div>
        </main>
    )
}