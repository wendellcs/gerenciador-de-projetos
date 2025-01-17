import Header from "../../components/Header"
import ProjectStatus from "../../components/ProjectStatus"

import { FaGithub, FaTrashAlt, FaCheck } from "react-icons/fa";
import { CiGlobe } from "react-icons/ci";

import { setDoc } from "firebase/firestore";
import { db } from '../../services/firebaseConnections'

import './manage.sass'
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
export default function Manage(){
    const { id } = useParams()

    const [projectStatus, setProjectStatus] = useState()

    const [task, setTask] = useState('')

    const [taskList, setTaskList] = useState([
        {task: 'Jogar o lixo fora',
        done: false, 
        id: 0
    }])

    async function addTask(){
        const newTask = {
            task,
            done: false,
            id: taskList.length
        }

        setTaskList([...taskList, newTask])
        setTask('')  
    }

    return (
        <main>
            <Header/>
            <div className="container">
                <div className="container-project">
                    <h2 className="container-project-title">Exemplo</h2>

                    <div className="project">
                        <div className="project-image">
                            <img src="" alt="Imagem do projeto"/>
                        </div>

                        <div className="project-infos">
                            <div className="box">
                                <h3 className="box-title">Tasks</h3>
                                <p className="tasks">5</p>
                            </div>

                            <div className="box">
                                <h3 className="box-title">Status</h3>
                                <div className="box-status">
                                    <ProjectStatus simple={true} status={'paused'}/>
                                </div>
                                <p className="status paused">paused</p>
                            </div>

                            <div className="box">
                                <h3 className="box-title">Links</h3>
                                <a href="#" target="_blank" className="link"><CiGlobe className="icon light"/></a>
                                <a href="#" target="_blank" className="link"><FaGithub className="icon light"/></a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container-todo">
                    <h2 className="container-todo-title">Tarefas</h2>

                    <div className="todo">
                        <div className="tasks">
                            {taskList.map(t => {
                                return (
                                    <div className="task" key={t.id}>
                                        <div className="delete-box">
                                            <FaTrashAlt className="icon delete"/>
                                        </div>
                                        
                                        <input type="text" placeholder={t.task} disabled={false} className="task-name" />
                                        
                                        <div className="done-box">
                                            <FaCheck className="icon done"/>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                        <div className="entry">
                            <div className="box">
                                <input type="text" placeholder="Tarefa" value={task} onChange={(e) => setTask(e.target.value)}/>
                                <button className="btn add-task" onClick={() => addTask()}>Add</button>
                            </div>
                            <p className="text">As tasks são únicas de cada projeto</p>
                        </div>
                    </div>
                </div>

                <div className="container-edit">
                    <div className="left-box">
                        <div className="box">
                            <label>Atualize o status atual do projeto</label>

                            <div className="status-box">
                                <ProjectStatus simple={false} status={'in-progress'} checkStatus={setProjectStatus}/>
                            </div>
                        </div>

                        <div className="date-box">
                            <div className="box">
                                <label>Inicio</label>
                                <input type="text" placeholder="dd/mm/yy"/>
                            </div>
                            <div className="box">
                                <label>Fim</label>
                                <input type="text" placeholder="dd/mm/yy"/>
                            </div>
                        </div>
                    </div>

                    <div className="right-box">
                        <div className="box">
                            <label>Insira o link do live site</label>
                            <input type="text" placeholder="www.meusite.com" />
                        </div>
                        <div className="box">
                            <label>Insira o link do repositório</label>
                            <input type="text" placeholder="www.github.com/seuGitHub/repo" />
                        </div>
                    </div>

                    <button className="btn save">Salvar</button>
                </div>
            </div>
        </main>
    )
}