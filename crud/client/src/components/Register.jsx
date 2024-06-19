import axios from 'axios';
import React, { useState } from 'react';


const Register = () => {
    const [data, setData] = useState({
        username: '',
        email: '',
        password: '',
        confirmpassword: ''
    });

    const chnageHandler = e => {
        setData({ ...data, [e.target.value]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        // const isValid = await validate();
        // if (isValid) {
        axios.post('http://localhost:4001/register', data)
            .then(res => {
                console.log(res, 'res');
                alert(res.data)
                // navigate('/');
            })
            .catch(err => console.log(err));
        // }
    };


    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
                <form onSubmit={handleSubmit} >
                    <h2> Register User</h2>
                    <div className='mb-2'>
                        <label htmlFor=''>Name</label>
                        <input
                            //  value={name} 
                            onChange={chnageHandler}
                            type='text' placeholder='Enter Name' className='form-control'></input>
                    </div>

                    <div className='mb-2'>
                        <label htmlFor=''>Email</label>
                        <input
                            //  value={email} 
                            onChange={chnageHandler}
                            type='text' placeholder='Enter Email' className='form-control'></input>
                    </div>

                    <div className='mb-2'>
                        <label htmlFor=''>password</label>
                        <input
                            // value={age} 
                            onChange={chnageHandler}
                            type='password' placeholder='Enter passowrd' className='form-control'></input>
                    </div>

                    <div className='mb-2'>
                        <label htmlFor=''>confirm password</label>
                        <input
                            // value={age} 
                            onChange={chnageHandler}
                            type='password' placeholder='confirm passowrd' className='form-control'></input>
                    </div>

                    <button className='btn btn-success'> Submit</button>
                </form>

            </div>
        </div>
    )
}

export default Register