import React, { useContext, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { editEmployeeAPI } from '../Services/allAPI';
import { editResponsecontext } from '../context/ContextAPI';


function Edit({ employee }) {
  const{editResponse,setEditResponse}=useContext(editResponsecontext)
  const [employeeData, setEmployeeData] = useState({
    _id: employee?._id,
    name: employee?.name,
    email: employee?.email,
    phonenumber: employee?.phonenumber
  });

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e, field) => {
    setEmployeeData({ ...employeeData, [field]: e.target.value });
  };

  const handleUpdateEmployee = async () => {
    const { _id, name, email, phonenumber } = employeeData;
    if (!name || !email || !phonenumber) {
      alert("Please fill out the form.");
      return;
    }

    const token = sessionStorage.getItem("token");
    if (token) {
      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      };
      try {
        const result = await editEmployeeAPI(_id, { name, email, phonenumber }, reqHeader);
        console.log(result);

        if (result.status === 200) {
          alert('Employee details updated successfully.');
          handleClose();
          setEditResponse(result)
        } else {
          alert(result.response.data);
        }
      } catch (err) {
        console.log(err);
        alert("An error occurred while updating employee details.");
      }
    }
  };


  return (
    <>
      <button onClick={handleShow} className='btn'>
        <i className='fa-solid fa-edit'></i> Edit
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input value={employeeData.name} onChange={(e) => handleChange(e, 'name')} type='text' className='form-control mb-2' placeholder='Name' />
          <input value={employeeData.email} onChange={(e) => handleChange(e, 'email')} type='email' className='form-control mb-2' placeholder='Email' />
          <input value={employeeData.phonenumber} onChange={(e) => handleChange(e, 'phonenumber')} type='text' className='form-control mb-2' placeholder='Phone Number' />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdateEmployee}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Edit;
