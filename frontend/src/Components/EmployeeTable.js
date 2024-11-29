import React from 'react';
import { Link } from 'react-router-dom'
function EmployeeTable({ employees , pagination ,fetchEmployees
    ,handleUpdateEmployee,handleDeleteEmployee}) {

    const headers = ['Name','Email','Phone','Department','Actions'];
    const {currentPage,totalPages} = pagination;
    const TableRow = ({employee}) =>{
         
        return <tr>
            <td>
                {/* want to go another componenet */}
                < Link to={`/employee/${employee._id}`} className='text-decoration-none' >
                   {employee.name}
                </Link>
            </td>
            <td>{employee.email}</td>
            <td>{employee.phone}</td>
            <td>{employee.department}</td>
            <td>
                <i 
                 className='bi bi-pencil-fill text-warning me-4'
                 role="button"
                 data-bs-toggle="tooltip"
                 data-bs-placement="top"
                 title="Edit"
                 onClick ={()=>handleUpdateEmployee(employee)} >
                
                    </i>

                    <i 
                 className='bi bi-trash-fill text-danger'
                 role="button"
                 data-bs-toggle="tooltip"
                 data-bs-placement="top"
                 title="Edit"
                 onClick ={()=>handleDeleteEmployee(employee)} >
                
                    </i>
            </td>

        </tr>
    }
   //pagenumebr
   const pageNumbers = Array.from({length: totalPages},(_, index) => index + 1);
   //handlepage
   const handleNextPage = ()=>{
    if(currentPage < totalPages)
    {
        handlePagination(currentPage + 1);
    }
   }
   
   //handlepreviousepage
   const handlePreviousPage = () => {
      if(currentPage > 1)
      {
        handlePagination(currentPage - 1);
      }
   }
   const handlePagination = (currPage) =>{
     
      fetchEmployees('',currPage,5);
   }
  return (
    <>
     <table className='table table-striped'>
        
        <thead>
             <tr>
                {
                    headers.map((header,i)=>(
                        <th key={i}>{header}</th>
                    ))
                }
             </tr>
        </thead>
         <tbody>
            
            
          {
            employees && employees.map((emp) => (
                <TableRow item key={emp._id} employee={emp} />
            ))
            }
           {/* <TableRow /> */}
         </tbody>
         
     </table>
     <div className="d-flex justify-content-between align-items-center my-3 w-100 " >

            <span className='badge bg-primary'>page {currentPage} of {totalPages}</span>

            <div>
                <button className="btn btn-outline-primary me-2"
                 onClick = {()=>handlePreviousPage()}
                  disabled={currentPage === 1}>
                 Previous
                </button>
                {
                    pageNumbers.map((page)=>(
                        <button
                         onClick = {()=>handlePagination(page)}
                         className= {`btn btn-outline-primary me-1 ${currentPage === page} ? 'active' : ''`}>
                            {page}
                        </button>
                    ))
                }
                <button className="btn btn-outline-primary ms-2"
                 onClick = {()=>handleNextPage()}
                  disabled={totalPages ===currentPage}>
                 Next
                </button>
            </div>
         </div>
    </>
  );
}

export default EmployeeTable;
