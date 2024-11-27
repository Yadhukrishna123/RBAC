import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Table } from 'react-bootstrap'
import DeleteRole from './DeleteRole'
import { Link } from 'react-router-dom'

function RoleManagement() {
    const [role, setRole] = useState([])

    const getAllRoles = async () => {
        try {
            const res = await axios.get("https://rbac-server-3.onrender.com/api/v1/roles")
            setRole(res.data.role)


        } catch (error) {

        }
    }
    useEffect(() => {

        getAllRoles()
    }, [])


    return (
        <Container>
            <Row>
                <Col>
                    <h2 className='register-brand'>Roles</h2>
                </Col>
            </Row>
            <Link to={"/addrole"}>
                <button className='add-ne-us-btn' >New Role</button>
            </Link>
            <Row>
                <Col>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Role Name</th>
                                <th>Permission</th>
                                {/* <th>Edit</th> */}
                                <th>Delete</th>



                            </tr>
                        </thead>
                        <tbody>


                            {
                                role.map((roles, index) => (
                                    <tr>
                                        <td >{index + 1}</td>
                                        <td>{roles.roleName}</td>
                                        <td>{roles.permission ? roles.permission.join(' ,  ') : 'No permissions'}</td>
                                        {/* <Link to={`/editRole/${roles._id}`}>
                                            <td><button className='ed-btn'>Edit</button> </td>
                                        </Link> */}
                                        <td><DeleteRole id={roles._id} getAllroles={getAllRoles} /></td>

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

export default RoleManagement