import React, { useContext, useEffect, useState } from 'react'
import { Button, Form, Modal, Pagination } from 'react-bootstrap';
import Edit from './Edit';
import { addEmployeeAPI, getEmployeeAPI, getSearchAPI, removeEmployeeAPI } from '../Services/allAPI';
import { addResponseContext, editResponsecontext } from '../context/ContextAPI';
import Dashheader from './Dashheader';


function DashHome() {

  const [currentPage, setCurrentPage] = useState(1);
  const [propertiesPerPage] = useState(6); 

  const { addResponse, setAddResponse } = useContext(addResponseContext)
  const { editResponse, setEditResponse } = useContext(editResponsecontext)
  const [show, setShow] = useState(false);

   
  const handleClose = () => {
    setEmployeeDetails({ name: "", email: "", phonenumber: "" })
    setShow(false);
  }
  const handleShow = () => setShow(true);

  const [searchKey, setSearchKey] = useState('');

  const searchEmployees = async (key) => {
    try {
        const result = await getSearchAPI(key);
        if (result.status === 200) {
          setUserEmployeeDetails(result.data);
        }
    } catch (err) {
        console.error("Error searching movies:", err);
    }
};

  const [employeeDetails, setEmployeeDetails] = useState({ name: "", email: "", phonenumber: "" })
  console.log(employeeDetails);

  const [getUserEmployeeDetails, setUserEmployeeDetails] = useState([])
  console.log(getUserEmployeeDetails);


  useEffect(() => {
    if (searchKey) {
      searchEmployees(searchKey);
  } else {
    getUserEmployee()
  }
    
  }, [addResponse, editResponse,searchKey])


  const handleUploadEmployee = async () => {
    const { name, email, phonenumber } = employeeDetails;

    // Email validation: Check if it's a valid email address
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailPattern.test(email);

    // Phone number validation: Check if it's exactly 10 digits long
    const phonePattern = /^\d{10}$/;
    const isValidPhoneNumber = phonePattern.test(phonenumber);

    if (!name || !email || !phonenumber) {
      alert("Please fill out the form completely.");
      return;
    }

    if (!isValidEmail) {
      alert("Please enter a valid email address.");
      return;
    }

    if (!isValidPhoneNumber) {
      alert("Phone number must be exactly 10 digits long.");
      return;
    }

    const reqBody = {
      name,
      email,
      phonenumber
    };

    const token = sessionStorage.getItem("token");
    if (token) {
      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      };
      try {
        const result = await addEmployeeAPI(reqBody, reqHeader);
        console.log(result);
        if (result.status === 200) {
          alert('Employee has been added successfully.');
          handleClose();
          setAddResponse(result)
        } else {
          alert(result.response.data);
        }
      } catch (err) {
        console.log(err);
        alert("An error occurred while adding the employee.");
      }
    } else {
      alert("User is not authenticated.");
    }
  };


  const getUserEmployee = async () => {
    const token = sessionStorage.getItem("token")
    const reqHeader = {
      "Authorization": `Bearer ${token}`
    }
    try {
      const result = await getEmployeeAPI(reqHeader)
      console.log(result);
      if (result.status == 200) {
        setUserEmployeeDetails(result.data)
      }

    }
    catch (err) {

    }
  }

  const handleDeleteEmployee = async (employeeId) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      };
      try {
        const result = await removeEmployeeAPI(employeeId, reqHeader);
        if (result.status === 200) {
          getUserEmployee(); 
        } else {
          console.log(result);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = getUserEmployeeDetails.slice(indexOfFirstProperty, indexOfLastProperty);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);


  return (
    <>

    <Dashheader setSearchKey={setSearchKey}/>
      <div className="mainDiv">


        <div className="btn-div container d-flex justify-content-center mt-2">
          <button className='btnDiv btn-add rounded' onClick={handleShow}>create employee<i class="fa-solid fa-plus ms-2" style={{ color: 'white' }}></i></button>
        </div>
{
  getUserEmployeeDetails.length>0?(<table className='table mt-5' border={1}>
    <thead>
      <tr>
        <th>Sl.no</th>
        <th>Name</th>
        <th>Email</th>
        <th>Phone.no</th>
        <th>...</th>
      </tr>

    </thead>
    <tbody>
      {
        getUserEmployeeDetails.map((employee, index) => (
          <tr key={employee.id}>
            <td>{index + 1}</td>
            <td>{employee.name}</td>
            <td>{employee.email}</td>
            <td>{employee.phonenumber}</td>
            <th><div className="icons d-flex">
              <div className="btn"> <Edit key={employee._id} employee={employee} /></div>
              <button onClick={() => handleDeleteEmployee(employee._id)} className="btn"><i class="fa-solid fa-trash "></i></button>

            </div></th>

          </tr>))
      }

    </tbody>

  </table>) :(<p>Not content available</p>)
}
        


        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Add Employee</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>


              <Form.Group className="mb-3 " controlId="exampleForm.ControlInput1">

                <Form.Control className='rounded text-field ' value={employeeDetails.name} onChange={(e) => setEmployeeDetails({ ...employeeDetails, name: e.target.value })} type="text" placeholder="Name" style={{ borderColor: '#2b2b2b' }} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">

                <Form.Control className='text-field rounded ' value={employeeDetails.email} onChange={(e) => setEmployeeDetails({ ...employeeDetails, email: e.target.value })} type="email" placeholder="Email" style={{ borderColor: '#2b2b2b' }} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">

                <Form.Control className='text-field rounded ' value={employeeDetails.phonenumber} onChange={(e) => setEmployeeDetails({ ...employeeDetails, phonenumber: e.target.value })} type="text" placeholder="Phone number" style={{ borderColor: '#2b2b2b' }} />
              </Form.Group>


            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button onClick={handleUploadEmployee} variant="primary">Add</Button>
          </Modal.Footer>
        </Modal>
        <div className="d-flex justify-content-center fixed-bottom">
        <Pagination>
          {[...Array(Math.ceil(getUserEmployeeDetails.length / propertiesPerPage)).keys()].map(number => (
            <Pagination.Item key={number + 1} onClick={() => paginate(number + 1)} active={number + 1 === currentPage}>
              {number + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </div>

      </div>

    </>
  )
}

export default DashHome