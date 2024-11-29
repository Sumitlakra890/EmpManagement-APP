
import { GetAllEmployees,DeleteEmployeeById } from "../Api";
import AddEmployee from "./AddEmployee";
import EmployeeTable from "./EmployeeTable";
import { useState,useEffect } from "react";
import { ToastContainer } from 'react-toastify';
import { notify } from '../utils';
export default function EmployeeManagementApp()
{ 

    //we have to create on useEffect and state 
   
    //jo server se data ata hai  wahi data object ke form save krege
    const [showModal ,setShowModal] = useState(false)
    const [updateEmpObj , setUpdateEmpObj] = useState(null)
    const [employeeData, setEmployeeData] = useState({
    //   "employees": [],
    //     "pagination ": {
    //         "totalEmployees": 0,
    //         "currentPage": 1,
    //         "totalPages": 1,
    //         "pageSize": 5
    //     }

    employees: [],
    pagination: {
       
        totalEmployees: 0,
        currentPage: 1,
        totalPages: 1,
        pageSize: 5
    }
    }
    )
    const fetchEmployees = async (search= '',page = 1,limit = 5) =>{
        console.log('called fetchEmployees')
        try{
           
            const {data} = await GetAllEmployees(search,page,limit);
         
             setEmployeeData(data);
        }
        catch(err){
             console.log('Error',err)   
        }
    }
   
    useEffect(()=>{
        fetchEmployees();
    },[])

     const handleAddEmployee = () =>{
        setShowModal(true);
     }

     //handleupdateemployee

     const handleUpdateEmployee = (empObj)=>{
          
        console.log('update object',empObj);
        setUpdateEmpObj(empObj);
        setShowModal(true);

     }
    //handle delete em[loyee
     const handleDeleteEmployee = async (emp)=>{
        try{
           
            const {success,message} =  await DeleteEmployeeById(emp._id);
            if(success)
                {
                    notify(message,'success');
                }
                else
                {
                    notify(message,'error');
    
                }
        }
        catch(err){
             console.log('Error',err) 
             notify(err,'error'); 
        }
     }

     const handleSearch = (e) =>{
        const term = e.target.value;
        fetchEmployees(term)
     }
    return(
       <div className="d-flex flex-column justify-content-center align-items-center w-100 p-3">
        <h1>EmployeeManagement APP</h1>
        <div className="w-100 d-flex justify-content-center">
        <div className="w-100 border bg-light p3" style={{width: '80%'}}>
          <div className='d-flex justify-content-between mb-3'>
                 <button className="btn btn-primary"
                 onClick={() => handleAddEmployee()}
                 >Add

                 </button>
                 <input 
                 onChange={handleSearch}
                 type="text"
                 placeholder="Search Employess..."
                 className="form-control w-50" />

         </div>

                 <EmployeeTable
                 handleUpdateEmployee={handleUpdateEmployee}
                 fetchEmployees = {fetchEmployees}
                   employees = {employeeData.employees}
                 pagination = {employeeData.pagination}
                 handleDeleteEmployee = {handleDeleteEmployee}
                                        />
                 <AddEmployee 
                 
                  updateEmpObj = {updateEmpObj}
                  fetchEmployees = {fetchEmployees}
                  showModal={showModal}
                  setShowModal ={setShowModal}
                 />
          
        </div>
       

       </div>
       
       <ToastContainer
       //toast contianer hai use kerne ke liye likha
                position='top-right'
                autoClose={3000}
                hideProgressBar={false}
            />
       </div>
    )
}