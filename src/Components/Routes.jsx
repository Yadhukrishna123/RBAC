import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register from './Register'
import Header from './Header'
import Home from './Home'
import Users from './Users'
import EditUser from './EditUser'
import Login from './Login'
import RoleManagement from './RoleManagement'
import AddRole from './AddRole'
import ProtectedRoutes from './Utils/ProtectedRoutes'
import { useSelector } from 'react-redux'
import Profile from './Profile'
import Footer from './Footer'
import EditRole from './EditRole'



function Routers() {

    const isAuthentication = useSelector((state) => state.admin.isAuthentication)
    console.log(isAuthentication);
    
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/register' element={<Register />} />
                <Route path='/user/:id' element={<EditUser />} />
                <Route path='/login' element={<Login />} />
                <Route path='/profile/:id' element={<Profile />} />
                <Route path='/editRole/:id' element={<EditRole />} />
                <Route path='/rolemangmnt' element={<ProtectedRoutes isAuthentication={isAuthentication}><RoleManagement /></ProtectedRoutes>} />
                <Route path='/addrole' element={<AddRole />} />
                <Route path='/users' element={<ProtectedRoutes isAuthentication={isAuthentication}><Users /></ProtectedRoutes>} />
            
            </Routes>
            <Footer/>
        </BrowserRouter>
    )
}

export default Routers