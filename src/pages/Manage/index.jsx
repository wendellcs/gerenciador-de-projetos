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
    const [doneTaskList, setDoneTaskList] = useState([])
    
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
            setDoneTaskList(projectData.taskList.filter(task => task.done))
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
        const updatedDoneTaskList = updatedTaskList.filter(task => task.done)

        setDoneTaskList(updatedDoneTaskList)
        updateDataBase(updatedTaskList)
        setTaskList(updatedTaskList)
    }

    function toggleTaskDoneState(taskId){
        const updatedTaskList = []
        for(let task of taskList){
            if(task.id == taskId){
                task.done = !task.done
                updateDataBase(taskList)
                updatedTaskList.push(...taskList)
                break
            }
        }
        const updatedDoneTaskList = taskList.filter(task => task.done)
        setDoneTaskList(updatedDoneTaskList)

        setTaskList(updatedTaskList)
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


        // if(verifyDate(startDate)){
          
        // }
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
                                <div className="box">
                                    <h3 className="smaller-title">Tasks</h3>
                                    <p className="tasks">{taskList.filter(t => t.done == false).length}</p>
                                </div>

                                <div className="box">
                                    <h3 className="smaller-title">Status</h3>
                                    <div className="box-status">
                                        <ProjectStatus simple={true} status={projectData.status}/>
                                    </div>
                                    <p className={`status ${projectData.status}`}>{projectData.status}</p>
                                </div>

                                <div className="box">
                                    <h3 className="smaller-title">Links</h3>
                                    <a href="#" target="_blank" className="link"><CiGlobe className="icon light"/></a>
                                    <a href="#" target="_blank" className="link"><FaGithub className="icon light"/></a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="container-todo">
                        <h2 className="subtitle">Tarefas</h2>

                        <div className="todo">
                            <div className="tasks-container">
                                <div className="tasks-todo">
                                    {taskList.map(t => {
                                        if(!t.done) {
                                            return (
                                                <div className='task' key={t.id}>
                                                    <div className="delete-box" onClick={() => {deleteTask(t.id)}}>
                                                        <FaTrashAlt className="icon delete"/>
                                                    </div>
                                                    
                                                    <input type="text" placeholder={t.task} disabled={false} className="task-name" />
                                                    <div className="done-box" onClick={() => {toggleTaskDoneState(t.id)}}></div>
                                                </div>
                                            )
                                        }
                                    })}
                                </div>

                                <div className="tasks-done">
                                    {doneTaskList.map((t) => {
                                        return (
                                            <div className='task' key={t.id}>
                                                <div className="delete-box" onClick={() => {deleteTask(t.id)}}>
                                                    <FaTrashAlt className="icon delete"/>
                                                </div>
                                                
                                                <input type="text" placeholder={t.task} disabled={false} className="task-name" />
                                                <div className="done-box" onClick={() => {toggleTaskDoneState(t.id)}}>
                                                    <FaCheck className="icon done"/>
                                                </div>
                                            </div>
                                        )   
                                    })}
                                </div>
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
                        <h3 className="small-title form-title">Editar informações do projeto</h3>

                        <div className="left-box">
                            <div className="box">
                                <label className="label">Atualize o status atual do projeto</label>

                                <div className="status-box">
                                    <ProjectStatus simple={false} checkStatus={setProjectStatus}/>
                                </div>
                            </div>

                            <div className="date-box">
                                <div className="box">
                                    <label className="label">Inicio</label>
                                    <DatePicker/>
                                </div>
                                {projectData.dates.length > 1 && projectData.dates[1] !== '' && (
                                    <div className="box">
                                        <label className="label">Conclusão</label>
                                        <input type="text" value={endDate} onChange={e => setEndDate(e.target.value)}/>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="right-box">
                            <div className="box">
                                <label className="label">Insira o link do live site</label>
                                <input type="text" className="edit-input" placeholder={projectData.liveSite || "www.meusite.com"} value={liveSiteLink} onChange={e => setLiveSiteLink(e.target.value)}/>
                            </div>
                            <div className="box">
                                <label className="label">Insira o link do repositório</label>
                                <input type="text" className="edit-input" placeholder={projectData.repo || "www.github.com/seuGitHub/repo"} value={repoLink} onChange={e => setRepoLink(e.target.value)}/>
                            </div>
                        </div>

                        <button className="btn save" onClick={updateProject}>Salvar</button>
                        <div className="danger-area">
                            <h3 className="small-title">Área de risco</h3>
                            <p className="text normal">Cuidado! <br/>Caso delete seu projeto <span className="highlight danger">você perderá tudo vinculado à ele</span> !</p>
                            <button className="btn delete" onClick={(e) => deleteProject(e)}>Deletar projeto</button>
                        </div>
                    </form>
                </div>
            )}
        </main>
    )
}