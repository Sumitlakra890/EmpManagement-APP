
import { useState,useEffect } from 'react';
import { CreateEmployee ,UpdateEmployeeById } from '../Api';
import { notify } from '../utils';
function AddEmployee({showModal,setShowModal,fetchEmployees,updateEmpObj}) {

    const [employee,setEmployee] = useState({

        name: '',
        email: '',
        phone: '',
        department: '',
        salary: '',
        profileImage: null
    })
      
    const [updateMode,setUpdateMode] = useState(false);
     useEffect(()=>{
        if(updateEmpObj)
        {
         setUpdateMode(true);
         setEmployee(updateEmpObj)
        }
     },[updateEmpObj])
     //reset the employee data

     const resetEmployeeStates = ()=>{

        setEmployee({
            

                name: '',
                email: '',
                phone: '',
                department: '',
                salary: '',
                profileImage: null
            
        })
     }
    const handleClose = ()=>{
        setShowModal(false);
    }
    //handleChange
    const handleChange = (e)=>{
     
        const {name , value} = e.target;
        setEmployee({...employee,[name]: value});
    }

    //handle file change 

    const handleFileChange = (e) =>{
       setEmployee({...employee,profileImage: e.target.files[0]})
    }
    //handle submit

    const handleSubmit = async (e)=>{
        //referesh na ho page
        e.preventDefault();
        console.log(employee)

        try{
             const {success , message}  = updateMode ? await UpdateEmployeeById(employee,employee._id) :
              await CreateEmployee(employee);
            console.log(success,message)
            if(success)
            {
                notify(message,'success');
            }
            else
            {
                notify(message,'error');

            }

            //close the add dialog
            setShowModal(false);
            resetEmployeeStates();
            //fetch the data employee resent employee
            fetchEmployees()
            //latest employee list ke 1st me dekhna chiye

        }
        catch(err){
            notify('Failed to create employee try again later','error');
        }


    }
  return (
    <div className={`modal ${showModal} ? 'd-block' : ''`}
       tabIndex={-1} role= 'dialog'
       style={{ display: showModal ? 'block' : 'none'}} >
        
        <div className='modal-dialog' role='document'>
          <div className='modal-content'>
            <div className='modal-header'>
            <h5>
                {
                    updateMode ? 'Update Employee' : 'Add Employee'
                }
            </h5>
            <button type='button' className='btn-close' 
             onClick = {() =>handleClose()}
             >

            </button>
            </div>

             <div className='modal-body'>
                   <form onSubmit={(e)=>handleSubmit(e)}>
                    <div className='mb-3'>
                        <label className='form-label'>Name</label>
                        <input 
                        type='text'
                        className='form-control'
                        name="name"
                        value={employee.name}
                        onChange={handleChange}
                        required
                           />
                    </div>

                    <div className='mb-3'>
                        <label className='form-label'>Email</label>
                        <input 
                        type='email'
                        className='form-control'
                        name="email"
                        value={employee.email}
                        onChange={handleChange}
                        required
                           />
                    </div>

                    <div className='mb-3'>
                        <label className='form-label'>Phone</label>
                        <input 
                        type='text'
                        className='form-control'
                        name="phone"
                        value={employee.phone}
                        onChange={handleChange}
                        required
                           />
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Department</label>
                        <input 
                        type='text'
                        className='form-control'
                        name="department"
                        value={employee.department}
                        onChange={handleChange}
                        required
                           />
                    </div>

                    <div className='mb-3'>
                        <label className='form-label'>Salary</label>
                        <input 
                        type='text'
                        className='form-control'
                        name="salary"
                        value={employee.salary}
                        onChange={handleChange}
                        required
                           />
                    </div>

                    <div className='mb-3'>
                        <label className='form-label'>Profile Image</label>
                        <input 
                        type='file'
                        className='form-control'
                        name="profileimage"
                        
                        onChange={handleFileChange}
                     
                           />
                    </div>
                     <button className='btn btn-primary' type='submit'>{updateMode ? 'update' : 'save'}</button> 
                   </form>

             </div>
          </div>
        </div> 
    </div>
  );
}

export default AddEmployee;
