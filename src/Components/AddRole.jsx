import axios from 'axios'
import React, { useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddRole() {
  const navigate = useNavigate()
  const [validate, setValidate] = useState()
  const [roleName, setRoleName] = useState()
  const [permission, setPermission] = useState([])


  const handleRole = (e) => {
    setRoleName(e.target.value)
    console.log(roleName);

  }
  const handlePermission = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setPermission((prev) => [...new Set([...prev, value])]);
    } else {
      setPermission((prev) => prev.filter((perm) => perm !== value))
    }
    console.log(permission);


  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log("Role:", roleName);
    console.log("Permissions:", permission);
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      e.stopPropagation()
      setValidate(true)
    } else {
      setValidate(true)

      console.log("Submitting Role:", roleName);
      console.log("Submitting Permissions:", permission)

      try {
        const res = await axios.post("https://rbac-server-3.onrender.com/api/v1/addrole", {
          roleName, permission
        })
        if (res.data.success) {
          toast.success(res.data.message)

          await new Promise((back) => setTimeout(back, 2000))

          navigate("/rolemangmnt")
        } else {
          toast.error(res.data.message)
        }
      } catch (error) {

      }
    }
  }
  return (
    <Container>
      <ToastContainer />
      <Row>
        <Col>
          <h2 className='register-brand'>Add Role</h2>
        </Col>
      </Row>
      <Row>
        <Col>

          <Form noValidate validate={validate} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Role:</Form.Label>
              <Form.Control type="text" placeholder="Enter role" onChange={handleRole} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPermissions">
              <Form.Label>Permissions</Form.Label>
              {["Add","Edit","Read", "Right", "Delete","managing",].map((permission) => (
                <Form.Check
                  key={permission}
                  type="checkbox"
                  label={permission}
                  value={permission.toLowerCase()}
                  checked={permission.includes(permission.toLowerCase())}
                  onChange={handlePermission}
                />
              ))}

            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>

        </Col>
      </Row>
    </Container>
  )
}

export default AddRole