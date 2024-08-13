import { Routes, Route } from 'react-router-dom'
import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'
import Home from '../pages/Home'
import Manage from '../pages/Manage'

export default function RoutesApp(){
    return (
        <Routes>
            <Route path="/" element={<SignIn/>} /> 
            <Route path="/register" element={<SignUp/>} />

            {/* Private */}
            <Route path='/home' element={<Home/>}/>
            <Route path='/manage' element={<Manage/>}/>
     
        </Routes>
    )
}