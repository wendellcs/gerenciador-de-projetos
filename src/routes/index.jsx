import { Routes, Route } from 'react-router-dom'
import SignIn from '../pages/SignIn'

export default function RoutesApp(){
    return (
        <Routes>
            <Route path="/" element={<SignIn/>} /> 
            {/* <Route path="/register" element={} /> */}

            {/* Private */}
        </Routes>
    )
}