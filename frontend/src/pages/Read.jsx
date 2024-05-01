import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

function Read() {

    const{id} = useParams();
    const[student, setStudent] = useState([])
    useEffect(()=>{
        axios.get('http://localhost:8081/read/' +id)
        .then(res=> {
            console.log(res) 
            setStudent(res.data[0]);
        })
        .catch(err=> console.log(err))
    },[]);


  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
        <div className='w-50 bg-white rounded p-3'>
            <div>
                <h2>Details</h2>
                <h2>{student.Id}</h2>
                <h2>{student.Name}</h2>
                <h2>{student.Email}</h2>
            </div>


            <Link to='/' className='btn btn-primary me-2'>Back</Link>
            <Link to= {`/edit/${student.Id}`} className='btn btn-info'>Edit</Link >
        </div>



    </div>
  )
}

export default Read