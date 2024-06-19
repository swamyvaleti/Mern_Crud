import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const UpdateUser = () => {
    const { id } = useParams();
    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [age, setAge] = useState('');
    const [users, setUsers] = useState([]);




    useEffect(() => {
        axios.get('http://localhost:4001/getUser/' + id).then(res => {
            setName(res.data.name);
            setEmail(res.data.email);
            setAge(res.data.age)
        }).catch(err => console.log(err))
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put('http://localhost:4001/updateUser/' + id, { name, email, age }).then(res => {
            console.log(res, 'res');
            navigate('/')
        }).catch(err => console.log(err))

    }


    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
                <form onSubmit={handleSubmit}>
                    <h2> Add User</h2>
                    <div className='mb-2'>
                        <label htmlFor=''>Name</label>
                        <input value={name} onChange={(e) => setName(e.target.value)} type='text' placeholder='Enter Name' className='form-control'></input>
                    </div>

                    <div className='mb-2'>
                        <label htmlFor=''>Email</label>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} type='text' placeholder='Enter Email' className='form-control'></input>
                    </div>

                    <div className='mb-2'>
                        <label htmlFor=''>Age</label>
                        <input value={age} onChange={(e) => setAge(e.target.value)} type='text' placeholder='Enter Age' className='form-control'></input>
                    </div>
                    <button className='btn btn-success'> Submit</button>
                </form>

            </div>
        </div>
    )
}

export default UpdateUser