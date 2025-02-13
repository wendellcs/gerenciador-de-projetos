import Header from "../../components/Header"
import ProjectStatus from "../../components/ProjectStatus"

import { FaGithub, FaTrashAlt, FaCheck } from "react-icons/fa";
import { CiGlobe } from "react-icons/ci";

import { getDocs, collection, setDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from '../../services/firebase/firebaseConnections'
import { useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../components/Loading";
import { DatePicker } from "../../components/DateInput";

import { verifyDate } from "../../services/dateFunctions";

export default function Manage(){
    const [projectData, setProjectData] = useState(null)
    const [loading, setLoading] = useState(false)
    
    const [task, setTask] = useState('')
    const [taskList, setTaskList] = useState([])
    
    const [projectStatus, setProjectStatus] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [liveSiteLink, setLiveSiteLink] = useState('')
    const [repoLink, setRepoLink] = useState('')

    const { id } = useParams()

    const navigate = useNavigate()

    useEffect(() => {
        setLoading(true)

        async function getProjectData(){
            try {
                const querySnapshot = collection(db, 'projects')
                const snapshot = await getDocs(querySnapshot)

                let project = null

                snapshot.forEach(doc => {
                    if (doc.id == id){
                        project = {...doc.data()}
                    }
                })
                setProjectData(project)
            } catch (e) {
                console.log(e)
            } finally {
                setLoading(false)
            }

        }
        getProjectData()
    }, [id, setProjectData])


    useEffect(() => {
        if  (projectData && projectData.taskList){
            setTaskList(projectData.taskList)
        }
    }, [projectData])


    async function addTask(){
        const newTask = {
            task,
            done: false,
            id: taskList.length
        }

        const updatedTaskList = [...taskList, newTask]
        setTaskList(updatedTaskList)
        updateDataBase(updatedTaskList)
        setTask('')
    }

    async function updateDataBase(data){
        const docRef = doc(db, 'projects', id)
        await setDoc(docRef, {...projectData, taskList: data})
    }


    function deleteTask(taskId){
        const updatedTaskList = taskList.filter(task => task.id !== taskId)

        updateDataBase(updatedTaskList)
        setTaskList(updatedTaskList)
    }

    function toggleTaskDoneState(taskId){
        const newTaskList = taskList.map(t => {
            if(t.id === taskId){
                return {...t, done:!t.done}
            }
            return t
        })
        updateDataBase(newTaskList)
        setTaskList(newTaskList)
    }

    function updateProject(e){
        e.preventDefault()

        console.log(projectData)

        const newData = {
            status: projectStatus,
            startDate: startDate,
            endDate: endDate,
            liveSiteLink: liveSiteLink,
            repoLink: repoLink
        }

        console.log(newData)

        if(verifyDate(startDate)){
          
        }
    }

    async function deleteProject(e){
        e.preventDefault()

        if(sendDeletePopup()){
            const docRef = doc(db, 'projects', id)
            await deleteDoc(docRef)
        } 

        navigate('/')
    }

    function sendDeletePopup(){
        // Criar um popup mais bonito
        return window.confirm('Deseja excluir este projeto?')
    }

    return (
        <main>
            <Header/>

            {loading || !projectData ? (
                <Loading/>
            ) : (
                <div className="container">
                    <div className="container-project">
                        <h2 className="subtitle">{projectData.name}</h2>

                        <div className="project">
                            <div className="project-image">
                                <img src="" alt="Imagem do projeto"/>
                            </div>

                            <div className="project-infos">
                                <div className="top-box">
                                    <div className="top-box-tasks">
                                        <h3 className="smaller-title">Tasks</h3>
                                        <p className="tasks">{taskList.filter(t => t.done == false).length}</p>
                                    </div>
                                    <div className="top-box-status">
                                        <h3 className="smaller-title">Status</h3>
                                        <ProjectStatus simple={true} status={projectData.status}/>
                                        <p className={`status ${projectData.status}`}>{projectData.status}</p>
                                    </div>
                                </div>

                                <div className="box">
                                    <div className="box-links">
                                        <h3 className="smaller-title">Links</h3>
                                        <div className="link">
                                            <CiGlobe className="icon light"/>
                                            <a href={projectData.liveSiteLink || 'https://github.com'} target="_blank" className="link secondary">{projectData.liveSiteLink || 'github.com'}</a>
                                        </div>
                                        <div className="link">
                                            <FaGithub className="icon light"/>
                                            <a href={projectData.repoLink || 'https://github.com'} target="_blank" className="link secondary">{projectData.repoLink || 'github.com'}</a>
                                        </div>
                                    </div>

                                    <div className="box-description">
                                        <h3 className="smaller-title">Descrição</h3>
                                        <p className="box-description">{projectData.description || 'Aqui aparecerá a descrição do seu projeto.'}</p>
                                    </div>
                                </div>

                                <div className="box">
                                    <h3 className="smaller-title">Data de inicio do projeto</h3>
                                    <p className="text date">{projectData.dates[0]}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="container-todo">
                        <h2 className="subtitle">Tarefas do projeto</h2>

                        <div className="todo">
                            <div className="tasks-container">
                                {taskList.map(t => {
                                    return (
                                            <div className={t.done ? 'task done' : 'task'} key={t.id}>
                                                <div className="delete-box" onClick={() => {deleteTask(t.id)}}>
                                                    <FaTrashAlt className="icon delete"/>
                                                </div>
                                                
                                                <input type="text" placeholder={t.task} disabled='true' className="task-name" />
                                                <div className="done-box" onClick={() => {toggleTaskDoneState(t.id)}}>
                                                    {t.done && (
                                                        <FaCheck className="icon primary"/>
                                                    )}
                                                </div>
                                            </div>
                                        )
                                    }
                                )}
                            </div>

                            <div className="entry">
                                <div className="box">
                                    <input type="text" className="input-task" placeholder="Tarefa" value={task} onChange={(e) => setTask(e.target.value)}/>
                                    <button className="btn add-task" onClick={() => addTask()}>Add</button>
                                </div>
                                <p className="text small">As tasks são únicas de cada projeto</p>
                            </div>
                        </div>
                    </div>

                    <form className="container-edit">
                        <h3 className="small-title">Área de edição</h3>

                        <div className="container-edit-basic">
                            <h4 className="smaller-title">Editar informações básicas do projeto</h4>
                            <div className="box">
                                <label className="label">Nome do projeto</label>
                                <input type="text" placeholder={projectData.name} className="container-edit-input"/>
                            </div>
                            <div className="box">
                                <label className="label">Atualize o status atual do projeto</label>
                                <ProjectStatus simple={false} checkStatus={setProjectStatus}/>
                            </div>

                            <div className="box">
                                <div className="box">
                                    <label className="label">Inicio</label>
                                    <DatePicker/>
                                </div>
                            </div>
                        </div>

                        <div className="container-edit-others">
                            <h4 className="smaller-title">Editar links e descrição</h4>
                            <div className="left">
                                <div className="box">
                                    <label className="label">Insira o link do live site</label>
                                    <input type="text"  className="container-edit-input" placeholder={projectData.liveSite || "www.meusite.com"} value={liveSiteLink} onChange={e => setLiveSiteLink(e.target.value)}/>
                                </div>
                                <div className="box">
                                    <label className="label">Insira o link do repositório</label>
                                    <input type="text"  className="container-edit-input" placeholder={projectData.repo || "www.github.com/seuGitHub/repo"} value={repoLink} onChange={e => setRepoLink(e.target.value)}/>
                                </div>
                            </div>
                
                            <div className="box">
                                <label className="label">Editar a descrição do projeto</label>
                                <textarea type="text" className="container-edit-textarea" placeholder={projectData.description || 'Descrição do projeto'}/>
                            </div>
                        </div>

                        <button className="btn save" onClick={updateProject}>Salvar</button>
                        <div className="danger-area">
                            <h4 className="smaller-title">Área de risco</h4>
                            <p className="text normal">Cuidado! <br/>Caso delete seu projeto <span className="highlight danger">você perderá tudo vinculado à ele</span> !</p>
                            <button className="btn delete" onClick={(e) => deleteProject(e)}>Deletar projeto</button>
                        </div>
                    </form>
                </div>
            )}
        </main>
    )
}