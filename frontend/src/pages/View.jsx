import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

function View() {
    const { email } = useParams();
    const [students, setStudents] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8081/view/${email}`)
            .then(res => {
                console.log(res);
                setStudents(res.data);
            })
            .catch(err => console.log(err));
    }, [email]);

    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
                <div>
                    <h2>Details</h2>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(students) && students.length > 0 ? (
                                students.map((student, index) => (
                                    <tr key={index}>
                                        <td>{student.Id}</td>
                                        <td>{student.Name}</td>
                                        <td>{student.Email}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3">No data found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <Link to='/login' className='btn btn-primary me-2'>Back</Link>
            </div>
        </div>
    );
    
}

export default View;
