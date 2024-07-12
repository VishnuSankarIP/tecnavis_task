import { commonAPI } from "./commonAPI";
import { SERVER_URL } from "./serverUrl";


// register api
export const registerAPI=async(reqBody)=>{
    return await commonAPI("POST",`${SERVER_URL}/register`,reqBody)
}

// add employee

export const addEmployeeAPI=async(reqBody,reqHeader)=>{
    return await commonAPI("POST",`${SERVER_URL}/add-employee`,reqBody,reqHeader)
 }

 //  get user Employee

export const getEmployeeAPI=async(reqHeader)=>{
    return await commonAPI("GET",`${SERVER_URL}/get-employee`,"",reqHeader)
}

//   edit employee

export const editEmployeeAPI = async (employeeId, reqBody, reqHeader) => {
    return await commonAPI("PUT", `${SERVER_URL}/edit-employee/${employeeId}`, reqBody, reqHeader);
  }
  
// remove employee

  export const removeEmployeeAPI = async (employeeId, reqHeader) => {
    return await commonAPI("DELETE", `${SERVER_URL}/remove-employee/${employeeId}`, {}, reqHeader);
  };

//   search 

export const getSearchAPI = async (name)=>{
    return await commonAPI("GET",`${SERVER_URL}/search?name=${name}`)
}



