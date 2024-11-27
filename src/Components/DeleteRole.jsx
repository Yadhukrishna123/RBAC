import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Modal } from 'react-bootstrap'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function DeleteRole({id, getAllRoles}) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const navigate = useNavigate()

    const handleConfirm =async ()=>{
        try {
            const res = await axios.delete(`https://rbac-server-3.onrender.com/api/v1/role/${id}`)

            if(res.data.success){

                toast.success(res.data.message)

                await new Promise((resolve)=>setTimeout(resolve, 2000))
                getAllRoles()
                navigate("/rolemangmnt")
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
  return (
    <>
    <button className='del-btn' onClick={handleShow}>Delete</button>
    <ToastContainer/>
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete User</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure that you want to delete this user!</Modal.Body>
        <Modal.Footer>
          <Button  className='cancel-btn' onClick={handleClose}>
            Cancel
          </Button>
          <Button className='dlt-btn' onClick={handleConfirm}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

    </>
  )
}

export default DeleteRole