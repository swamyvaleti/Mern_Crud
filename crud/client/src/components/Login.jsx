import axios from 'axios';
import React, { useContext, useState } from 'react';
import { store } from '../App';
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const navigate = useNavigate()
    const [token, setToken] = useContext(store)
    const [data, setData] = useState({
        email: '',
        password: '',
    });

    const [email, setEmial] = useState('');
    const [passowrd, setPassword] = useState('')

    const chnageHandler = e => {
        setData({ ...data, [e.target.value]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        // const isValid = await validate();
        // if (isValid) {
        const data = {
            "email": email,
            "password": passowrd
        }
        axios.post('http://localhost:4001/login', data)
            .then(res => {

                setToken(res.data.token)
                console.log(res, 'res');
                // alert(res.data)
                navigate('/myprofile');
            })
            .catch(err => console.log(err, 'error in login jsx'));
        // }
    };




    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
                <form onSubmit={handleSubmit} >
                    <h2> login </h2>
                    <div className='mb-2'>
                        <label htmlFor=''>Email</label>
                        <input
                            value={email}
                            onChange={(e) => setEmial(e.target.value)}
                            type='text' placeholder='Enter Email' className='form-control'></input>
                    </div>

                    <div className='mb-2'>
                        <label htmlFor=''>Enter Password</label>
                        <input
                            value={passowrd}
                            onChange={(e) => setPassword(e.target.value)}
                            type='text' placeholder='Enter Password' className='form-control'></input>
                    </div>

                    <button className='btn btn-success'> Submit</button>
                </form>

            </div>
        </div>
    )
}

export default Login