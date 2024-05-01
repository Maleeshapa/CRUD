import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Check if the entered email exists in the database
            const response = await axios.get(`http://localhost:8081/view/${email}`);
            const userData = response.data;

            if (userData.length > 0) {
                // Email exists, navigate to the View page
                navigate(`/view/${email}`);
            } else {
                // Email does not exist, display an alert
                alert('Email is incorrect');
            }
        } catch (error) {
            console.error('Error validating email:', error);
            // Handle error (e.g., display error message)
        }
    };

    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded-p3'>
                <h2>Login</h2>
                <div className='d-flex justify-content-end'><Link to='/' className='btn btn-success'>Back</Link>{' '}</div>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor='email' className='form-label'>Email address</label>
                        <input
                            type='email'
                            className='form-control'
                            id='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <button type='submit' className='btn btn-primary'>Login</button>
                </form>
            </div>
        </div>
    );
}

export default Login;
