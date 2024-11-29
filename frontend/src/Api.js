// all the api to fetch the data from server 
//provide the url

// const Base_URL = 'http://localhost:8080';
const Base_URL = 'https://empmanagement-app-2.onrender.com';

export const GetAllEmployees = async (search ='',page = 1,limit = 5) =>{
    const url =`${Base_URL}/api/employees?search=${search}&page=${page}&limit=${limit}`;
 try{
   const options = {
       
     method: 'GET',
     headers: {
        'Content-Type': 'application/json'
    }
   }

   const result = await fetch(url,options);
   const data = await result.json();
   
   return data;
 }
 catch(err){
  return err;
 }
}

//create employee by calling API

export const CreateEmployee = async (empObj) =>{
  const url =`${Base_URL}/api/employees`;
try{

  //need form data 

  const formData = new FormData();
  
   //loop 
   for(const key in empObj)
   {
      formData.append(key,empObj[key]);
   }



 const options = {
     
   method: 'POST',
  //  headers: {
  //     'Content-Type': 'application/json'
  // },
  'Content-Type': 'application/json',
  body: formData
 }

 const result = await fetch(url,options);
 const data = await result.json();
 
 return data;
}
catch(err){
return err;
}
}

//update employee api 


export const UpdateEmployeeById = async (empObj, id) =>{
  const url =`${Base_URL}/api/employees/${id}`;
try{

  //need form data 

  const formData = new FormData();
  
   //loop 
   for(const key in empObj)
   {
      formData.append(key,empObj[key]);
   }



 const options = {
     
   method: 'PUT',
  //  headers: {
  //     'Content-Type': 'application/json'
  // },
  'Content-Type': 'application/json',
  body: formData
 }

 const result = await fetch(url,options);
 const data = await result.json();
 
 return data;
}
catch(err){
return err;
}
}

//delete employee api

export const DeleteEmployeeById = async ( id) =>{
  const url =`${Base_URL}/api/employees/${id}`;
try{

 const options = {
     
   method: 'DELETE',
  //  headers: {
  //     'Content-Type': 'application/json'
  // },
  'Content-Type': 'application/json'
 }

 const result = await fetch(url,options);
 const data = await result.json();
 
 return data;
}
catch(err){
return err;
}
}

//fetch employee by id

export const GetEmployeeDetailsById = async (id) =>{
  const url =`${Base_URL}/api/employees/${id}`;
try{

 const options = {
     
   method: 'GET',
   headers: {
      'Content-Type': 'application/json'
  }
  // 'Content-Type': 'application/json'
 }

 const result = await fetch(url,options);
 const data = await result.json();
 
 return data;
}
catch(err){
return err;
}
}
