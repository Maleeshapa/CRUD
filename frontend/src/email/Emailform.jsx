import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Emailform() {
    const [formData, setFormData] = useState({
        name: '',
        nic: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8081/send-email', formData);
            alert('Email sent successfully!');
        } catch (error) {
            console.error('Error sending email:', error);
            alert('Failed to send email. Please try again later.');
        }
    };

    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded-p3'>


                <h2>From to Email</h2>
                <div className='d-flex justify-content-end'><Link to='/' className='btn btn-success'>Home</Link>{' '}
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter name"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="nic">NIC</label>
                        <input
                            type="text"
                            className="form-control"
                            id="nic"
                            name="nic"
                            value={formData.nic}
                            onChange={handleChange}
                            placeholder="Enter NIC"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Send Email</button>
                </form>
            </div>
        </div>
    );
}

export default Emailform;
