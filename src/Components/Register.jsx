import axios from 'axios'
import React, { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Register() {
    const navigate = useNavigate()
    const [fullName, setFullNanme] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [validate, setValiodate] = useState("")

    const handleFullName = (e)=>{
        setFullNanme(e.target.value)
    }
    const handleEmail = (e)=>{
        setEmail(e.target.value)
    }
    const handlePassword = (e)=>{
        setPassword(e.target.value)
    }

    const handleSubmit =async (e)=>{
        e.preventDefault()
        const form = e.currentTarget
        if(form.checkValidity()===false){
            e.stopPropagation()
            setValiodate(true)
        }else{
            setValiodate(true)

            try {
                const res =await axios.post("https://rbac-server-3.onrender.com/api/v1/register",{
                    fullName,
                    email,
                    password
                })
                if(res.data.success){
                    toast.success(res.data.message)

                    await new Promise((back)=>setTimeout(back, 2000))
                    navigate("/users")
                }else{
                    toast.error(res.data.message)
                }
            } catch (error) {
                
            }
        }
    }
    return (
        <Container>
            <ToastContainer/>
            <Row>
                <Col>
                    <h2 className='register-brand'>Register</h2>
                </Col>
            </Row>
            <Row>
                <Col>
                    <div className='register-container'>
                        <form noValidate  validate={validate} onSubmit={handleSubmit}>
                            <label htmlFor="">Full name:</label>
                            <input type="text" onChange={handleFullName} />

                            <label htmlFor="">Email:</label>
                            <input type="email" onChange={handleEmail} />

                            <label htmlFor="">Password:</label>
                            <input type="text" onChange={handlePassword} />

                            <button>Register</button>
                        </form>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default Register