import { useNavigate, useParams } from "react-router-dom"
import { GetEmployeeDetailsById } from "../Api";
import { useEffect, useState } from "react";
import { notify } from '../utils';
export default function EmployeeDetails()
{
    const { id } = useParams()
    const [empDetails,setEmpDetails] = useState({});
    const navigate = useNavigate()
    console.log(id);
    
    const fetchEmpById = async ()=> {
        try{
            const { data } = await GetEmployeeDetailsById(id);
           console.log(data);
           setEmpDetails(data);
        //    if(success)
        //    {
        //        notify(message,'success');
        //    }
        //    else
        //    {
        //        notify(message,'error');

        //    }

          
       }
       catch(err){
           notify('Failed to create employee try again later','error');
       }
    }

     //call fetchempByID

     useEffect(()=>{
        fetchEmpById();
     },[id])
    return (
        
        <div className="container mt-5">
            <div className="card">
                <div className="card-header">
                    <h2>Employee Details</h2>
                </div>

                <div className="card-body">
                   <div className="row md-3">
                   <div className="row md-3">
                        <img 
                         
                         src={empDetails.profileImage}
                         alt={empDetails.name}
                         className="img-fluid rounded size-5 w-5 h-10"
                        
                        
                        />
                    </div>
                    <div className="col-md-5">
                        <h4>{empDetails.name}</h4>
                        <p><strong>Email:</strong>{empDetails.email}</p>
                        <p><strong>Phone:</strong>{empDetails.phone}</p>
                        <p><strong>Department:</strong>{empDetails.department}</p>
                        <p><strong>Salary:</strong>{empDetails.salary}</p>
                    </div>
                   </div>
                    <button className="btn btn-primary"
                     onClick={()=>navigate('/employee')}
                   >Back</button>
                </div>
            </div>
        </div>
    )
}