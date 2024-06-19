import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
    return (
        <div className='d-flex flex-column bg-info vh-100 justify-content-center align-items-center'>
            <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>CRUD - MERN</h1>
            <ul>
                <Link to='/register'>
                    <li>
                        Register
                    </li>
                </Link>
                <Link to='/login'>
                    <li>
                        login
                    </li>
                </Link>
            </ul>
        </div>
    )
}

export default NavBar