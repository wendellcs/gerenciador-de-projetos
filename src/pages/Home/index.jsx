import './home.sass'
import Header from '../../components/Header'
import { CiSearch } from "react-icons/ci";
import { IoMdOptions } from "react-icons/io";

import { useSelector } from 'react-redux';
import rootReducer from '../../redux/root-reducer';

export default function Home(){
    const { user } = useSelector((rootReducer) => rootReducer.user)
    console.log(user)

    return (
       <div>
        <Header/>
        <div className='home-container'>
            <div className="home-header">
                <form className='home-header-form'>
                    <input type="text" placeholder="Buscar projeto"/>
                    <CiSearch className='icon light'/>
                </form>
                <h2 className='home-header-title'>Seus Projetos</h2>
                <IoMdOptions className='filter'/>
            </div>

            <div className='home-projects'>
                
            </div>
        </div>
       </div>
    )
}