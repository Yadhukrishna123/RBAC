import React from 'react'
import { Col, Container, Nav, Navbar, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { userLogout } from '../Redux/adminAuth'


function Header() {
    const dispatch = useDispatch()
    const isAuthenticated = useSelector((state)=>state.admin.isAuthentication)

    const handleLogout = ()=>{
        dispatch(userLogout())
    }
    return (
        <Container fluid className='nav-container'>
            <Row>
                <Col>
                    <Navbar expand="lg" className="bg-body-tertiary">
                        <Container>
                            <Navbar.Brand className='nav-brand'>RBAC</Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="ms-auto">
                                    <Nav.Link className='nav-item' style={{color:"red"}}  as={Link} to="/">Home</Nav.Link>
                                   
                                    <Nav.Link className='nav-item' style={{color:"red"}} as={Link} to="/rolemangmnt">Role</Nav.Link>
                                    <Nav.Link className='nav-item' style={{color:"red"}} as={Link} to="/users">Users</Nav.Link>
                                    
                                    {isAuthenticated ? <button onClick={handleLogout}  className='logout-btn-red'>Logout</button>:<Link to = "/login" ><button className='logout-btn-green'>Login</button></Link> }
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                </Col>
            </Row>
        </Container>
    )
}

export default Header