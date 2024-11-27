import React from 'react'
import { Navigate } from 'react-router-dom'


function ProtectedRoutes({isAuthentication, children}) {
  if(!isAuthentication){
    return <Navigate to="/login"/>
  }
  return children
}

export default ProtectedRoutes