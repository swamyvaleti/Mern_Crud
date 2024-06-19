import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const Users = () => {
    const [users, setUsers] = useState([]);


    useEffect(() => {
        axios.get('http://localhost:4001').then(res => setUsers(res.data)).catch(err => console.log(err))
    }, []);


    const handleDelete = (id) => {
        axios.delete('http://localhost:4001/deleteUser/' + id).then(res => {
            console.log(res)
            window.location.reload()
        }).catch(err => console.log(err))
    }

    return (
        <div className='d-flex flex-column bg-info vh-100 justify-content-center align-items-center'>
            <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>CRUD - MERN</h1>
            <div className='w-50 bg-white rounded p-3'>
                <Link to='/create' className='btn btn-success mb-3'>Add +</Link>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Age</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.age}</td>
                                <td>
                                    <Link to={`/update/${user._id}`} className='btn btn-success mr-2'>
                                        Update
                                    </Link>
                                    <button onClick={() => handleDelete(user._id)} className='btn btn-danger'>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Users