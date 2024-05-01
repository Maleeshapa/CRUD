import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'


function Update() {

    const { id } = useParams();
    const navigate = useNavigate();
     
    useEffect(() => {
        axios.get('http://localhost:8081/read/' + id)
            .then(res => {
                console.log(res)
                setValues({...values, name: res.data[0].Name , email: res.data[0].Email})
            })
            .catch(err => console.log(err))
    }, []);


    const [values, setValues] = useState({
        name: '',
        email: ''
    })

    const handleUpdate = (event) =>{

        event.preventDefault();
        axios.put('http://localhost:8081/update/'+id, values)
        .then(res=>{
            console.log(res)
            navigate('/');
        }).catch(err=>console.log(err));
    }


    return (
        <div>
            <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
                <div className='w-50 bg-white rounded p-3'>
                    <form onSubmit={handleUpdate}>
                        <h2>Update</h2>

                        <div className='mb-2'>
                            <label htmlFor="">Name</label>
                            <input type="text" className='form-control'
                                onChange={e => setValues({ ...values, name: e.target.value })} value={values.name}/>
                        </div>

                        <div className='mb-2'>
                            <label htmlFor="">Email</label>
                            <input type="email" className='form-control'
                                onChange={e => setValues({ ...values, email: e.target.value })} value={values.email}/>
                        </div>

                        <button className='btn btn-success'>Update</button>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default Update