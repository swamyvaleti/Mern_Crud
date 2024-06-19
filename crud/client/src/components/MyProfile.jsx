import React, { useContext, useEffect, useState } from 'react'
import { store } from '../App'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const MyProfile = () => {
    const navigte = useNavigate()
    const [token, setToken] = useContext(store);
    const [data, setData] = useState([])
    if (!token) {
        navigte('/login')
    }

    useEffect(() => {
        axios.get('http://localhost:4001/myprofile', {
            headers: {
                "x-token": token
            }
        }).then(res => setData(res.data)).catch(err => console.log(err))
    }, [token])



    return (
        <div>
            {
                data &&
                <center> welcome to User : {data.username} !!
                    <button onClick={() =>setToken(null)}>Logout</button>
                </center>

            }
        </div>
    )
}

export default MyProfile