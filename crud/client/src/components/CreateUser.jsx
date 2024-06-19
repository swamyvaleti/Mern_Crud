import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

const CreateUser = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        email: Yup.string().email('Invalid email format').required('Email is required'),
        age: Yup.number().typeError('Age must be a number').required('Age is required')
    });

    const validate = async () => {
        try {
            await validationSchema.validate({ name, email, age }, { abortEarly: false });
            setErrors({});
            return true;
        } catch (err) {
            const validationErrors = {};
            err.inner.forEach((error) => {
                validationErrors[error.path] = error.message;
            });
            setErrors(validationErrors);
            return false;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = await validate();
        if (isValid) {
            axios.post('http://localhost:4001/createUser', { name, email, age })
                .then(res => {
                    console.log(res, 'res');
                    navigate('/');
                })
                .catch(err => console.log(err));
        }
    };

    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
                <form onSubmit={handleSubmit}>
                    <h2>Add User</h2>

                    <div className='mb-2'>
                        <label htmlFor='name'>Name</label>
                        <input
                            id='name'
                            name='name'
                            type='text'
                            placeholder='Enter Name'
                            className='form-control'
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                        />
                        {errors.name && <div className='text-danger'>{errors.name}</div>}
                    </div>

                    <div className='mb-2'>
                        <label htmlFor='email'>Email</label>
                        <input
                            id='email'
                            name='email'
                            type='text'
                            placeholder='Enter Email'
                            className='form-control'
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                        {errors.email && <div className='text-danger'>{errors.email}</div>}
                    </div>

                    <div className='mb-2'>
                        <label htmlFor='age'>Age</label>
                        <input
                            id='age'
                            name='age'
                            type='text'
                            placeholder='Enter Age'
                            className='form-control'
                            onChange={(e) => setAge(e.target.value)}
                            value={age}
                        />
                        {errors.age && <div className='text-danger'>{errors.age}</div>}
                    </div>

                    <button type='submit' className='btn btn-success'>Submit</button>
                </form>
            </div>
        </div>
    );
}

export default CreateUser;
