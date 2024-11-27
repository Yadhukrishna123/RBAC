import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EditUser() {
    const [validate, setValidate] = useState(false)
    const { id } = useParams()
    const navigate = useNavigate()
    const [user, setUser] = useState({
        fullName: "",
        email: ""
    })
    useEffect(() => {

        const getUserDetauls = async () => {

            const res = await axios.get(`https://rbac-server-3.onrender.com/api/v1/user/${id}`)

            setUser({
                fullName: res.data.user.fullName,
                email: res.data.user.email
            })
        }



        getUserDetauls()

    }, [navigate, id])


    const handleSubmit = async (e) => {
        e.preventDefault()
        const form = e.currentTarget
        if (form.checkValidity() === false) {
            e.stopPropagation()
            setValidate(true)
        } else {
            setValidate(true)
            try {
                const res = await axios.put(`https://rbac-server-3.onrender.com/api/v1/user/${id}`, {
                    fullName: user.fullName,
                    email: user.email
                })
                if (res.data.success) {
                    toast.success(res.data.message)
                    await new Promise((back) => setTimeout(back, 2000))
                    navigate("/users")
                } else {
                    toast.error(res.data.message)
                }
            } catch (error) {
                toast.error(error.response.data.message)
            }
        }
    }

    return (
        <Container>
            <ToastContainer />
            <Row>
                <Col>
                    <h2 className='register-brand'>Edit User</h2>
                </Col>
            </Row>
            <Row>
                <Col>
                    <div className='register-container'>
                        <form nonValidate validate={validate} onSubmit={handleSubmit}>
                            <label htmlFor="">Full name:</label>
                            <input type="text" defaultValue={user.fullName} onKeyUp={(e) => setUser({ ...user, fullName: e.target.value })} />

                            <label htmlFor="">Email:</label>
                            <input type="email" defaultValue={user.email} onKeyUp={(e) => setUser({ ...user, email: e.target.value })} />

                            <button style={{ backgroundColor: "green" }}>Update</button>
                        </form>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default EditUser