import { createContext, useContext, useState } from 'react'
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import Users from './components/Users';
import CreateUser from './components/CreateUser';
import UpdateUser from './components/UpdateUser';
import NavBar from './components/NavBar';
import Login from './components/Login';
import Register from './components/Register';
import MyProfile from './components/MyProfile';

export const store = createContext();


function App() {
  const [token, setToken] = useState(null)
  return (
    <div>
      <store.Provider value={[token, setToken]} >
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/myprofile' element={<MyProfile />} />


            {/* <Route path='/' element={<Users />} />
          <Route path='/create' element={<CreateUser />} />
          <Route path='/update/:id' element={<UpdateUser />} /> */}
          </Routes>
        </BrowserRouter>
      </store.Provider>
    </div>
  )
}

export default App
