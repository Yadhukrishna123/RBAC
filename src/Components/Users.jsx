import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Col, Container, Form, Row, Table } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'
import DeleteUser from './DeleteUser'
import { TiTick } from "react-icons/ti";
import { toast } from 'react-toastify'


function Users() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [user, setUser] = useState([])
    
    const getAllUsers = async () => {
        try {
            const res = await axios.get("https://rbac-server-3.onrender.com/api/v1/users", {
                withCredentials: true
            })
            setUser(res.data.users)

        } catch (error) {
            toast.error(error.response.data.message)

            await new Promise((back) => setTimeout(back, 2000))

            navigate("/login")
        }
    }
    useEffect(() => {

        getAllUsers()
    }, [])




    return (
        <Container>
            <Row>
                <Col>
                    <h2 className='register-brand'>Users</h2>
                </Col>
            </Row>
            <Link to={"/register"}>
                <button className='add-ne-us-btn' >New User</button>
            </Link>
            <Row>
                <Col>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Full name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Status</th>
                                <th>Edit </th>
                                <th>Delete </th>


                            </tr>
                        </thead>
                        <tbody>

                            {
                                user.map((user, index) => (
                                    <tr>
                                        <td >{index + 1}</td>
                                        <td>{user.fullName}</td>
                                        <td >
                                            <Link to={`/profile/${user._id}`} style={{textDecoration:"none",color:"black"}}>
                                                {user.email}
                                            </Link>
                                        </td>
                                        <td>
                                            <Form.Group className="mb-3">

                                                <Form.Select

                                                    onChange={async (e) => {
                                                        const selectRole = e.target.value;
                                                        try {
                                                            const resp = await axios.put(`https://rbac-server-3.onrender.com/api/v1/user/${user._id}/role`, {
                                                                role: selectRole
                                                            })
                                                            if (resp.data.success) {
                                                                toast.success(resp.data.message)

                                                            }
                                                        } catch (error) {
                                                            toast.error("Failed to update role.")
                                                        }
                                                    }}


                                                >
                                                     <option>Super admin</option>
                                                    <option>Admin</option>
                                                    <option>Client</option>
                                                    <option>Viewer</option>
                                                </Form.Select>

                                            </Form.Group>
                                        </td>
                                        <td><TiTick /></td>
                                        <Link to={`/user/${user._id}`}>
                                            <td ><button className='ed-btn'>Edit</button></td>
                                        </Link>
                                        <td><DeleteUser id={user._id} getAllUsers={getAllUsers} /></td>

                                    </tr>
                                ))
                            }


                        </tbody>
                    </Table>

                </Col>
            </Row>
        </Container>
    )
}

export default Users