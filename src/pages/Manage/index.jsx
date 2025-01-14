import Header from "../../components/Header"
export default function Manage(){
    return (
        <main>
            <Header/>
            <div className="container">
                <div className="container-project">
                    <h2 className="container-project-title">Exemplo</h2>

                    <div className="project">
                        <img src="" alt="Imagem do projeto" className="project-image"/>

                        <div className="project-infos">
                            <div className="box"></div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}