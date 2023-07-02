import React from 'react'
import { useNavigate } from 'react-router-dom'
import { io } from 'socket.io-client'
import Swal from 'sweetalert2';

function Login(props) {
    const navigates = useNavigate();
    let Loginfunction = () => {
        let username = document.getElementById("username").value;
        if (username !== "") {
            props.LoginCred(username)
            navigates("/chatroom")
        }
        else {
            props.LoginCred(null)
            Swal.fire({
                text: "Please enter the User ID"
            })
        }
    }
    return (
        <>
            <br />
            <br />
            <div className='container'>
                <div className='container'>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="username" placeholder="" />
                        <label htmlFor="username">User Name</label>
                    </div>
                    {/* <div className="form-floating">
                <input type="password" className="form-control" id="floatingPassword" placeholder="Password" />
                <label htmlFor="floatingPassword">Password</label>
            </div> */}
                    <button type="button" className="btn btn-dark" onClick={Loginfunction}>Login</button>
                    <button type="button" className="btn btn-dark mx-3">Sign up</button>
                </div>
            </div>
        </>
    )
}

export default Login