import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'

function Profile() {

  const { id } = useParams()
  const [user, setUser]= useState([])

  useEffect(()=>{
    const getUserDetauls = async()=>{
      try {
        const res =await axios.get(`https://rbac-server-3.onrender.com/api/v1/user/${id}`)
        setUser(res.data.user)
       
        
      } catch (error) {
        
      }
    }
    getUserDetauls()
  },[])
  console.log(user);
  
  return (

    <Container>
      <Row>
        <Col>
          <h2 className='register-brand'>User Profile</h2>
        </Col>
      </Row>
      <Row>
        <Col>
          
           
              <div className='profileContainer' >

              <p>ID:<br />{user._id}</p>

              <h5>Email/userName:<br />{user.email}</h5>

              <h4>Role:<br />{user.role}</h4>
              
              

              <h5 className='userObject'>User Object:<br />
              
                id:{user._id}<br/>Full name:{user.fullName}<br/>email:{user.email}<br/>Role:{user.role}
              </h5>
            </div>
         
          
          
          
        </Col>
      </Row>
    </Container>
  )
}

export default Profile