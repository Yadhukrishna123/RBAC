import axios from 'axios'
import React, { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { adminAuthSuccess } from '../Redux/adminAuth';
import { useDispatch } from 'react-redux';



function Login() {
    const navigate = useNavigate()
    const [validate, setValidate] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()

    const handleEmail = (e) => {
        setEmail(e.target.value)


    }
    const handlePassword = (e) => {
        setPassword(e.target.value)


    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        const form = e.currentTarget
        if (form.checkValidity() === false) {
            e.stopPropagation()
            setValidate(true)
        } else {
            setValidate(true)

            try {
                const res = await axios.post("https://rbac-server-3.onrender.com/api/v1/adminlogin", {
                    email,
                    password
                },{
                    withCredentials:true
                })
                if (res.data.success) {

                    if (res.data.isAuthentication) {

                        dispatch(adminAuthSuccess({ admin: res.data.admin, isAuthentication: res.data.isAuthentication }))

                        toast.success(res.data.message)

                        await new Promise((back) => setTimeout(back, 2000))

                        navigate("/users")
                    } else {
                        toast.error(res.data.message)
                    }




                } else {
                    toast.error(res.data.message)
                }
            } catch (error) {
                toast.error(error.message)
            }
        }
    }
    return (
        <Container>
            <ToastContainer />
            <Row>
                <Col>
                    <h2 className='register-brand'>Login</h2>
                </Col>
            </Row>
            <Row>
                <Col>
                    <div className='register-container'>
                        <form noValidate validate={validate} onSubmit={handleSubmit}>

                            <label htmlFor="">Email:</label>
                            <input type="email" onChange={handleEmail} />

                            <label htmlFor="">Password:</label>
                            <input type="password" onChange={handlePassword} />

                            <button>Register</button>
                        </form>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default Login