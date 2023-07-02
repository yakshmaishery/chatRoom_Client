import React, { useState } from 'react'
import { io } from 'socket.io-client'
import '../Styles/ChatRoom.css'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom'

let socket = undefined;
let SendMessage;

function ChatRoom(props) {

    const navigates = useNavigate();
    let [getChatMessages, SetChatMessage] = useState([]); // Chat messages

    // Check if the User Exists 
    if (props.Creds) {

        // Create a connection with the socket
        if (!socket) {
            socket = io.connect("http://localhost:3001", { query: `loggeduser=${props.Creds}` })
        }

        // Send Messages
        SendMessage = () => {
            let userInput = document.getElementById("chatmess").value;
            if (userInput !== "") {
                socket.emit("msg", { message: userInput, UserInfo: props.Creds })
                SetChatMessage(newElem => [...getChatMessages, { message: userInput, UserInfo: props.Creds, msgtime: new Date().toLocaleTimeString() }])
            }
            else {
                Swal.fire({
                    title: "",
                    text: "Please enter something!",
                    icon: "warning"
                })
            }
        }

        // Listen the Messages from the Server
        socket.on("broadcastmsg", (data) => {
            // console.log(data)
            SetChatMessage(newElem => [...getChatMessages, { message: data.message, UserInfo: data.UserInfo, msgtime: new Date().toLocaleTimeString() }])
        })

        // Listen the Messages from the Server
        socket.on("welcome", (data) => {
            // console.log(data)
            Swal.fire({
                position: 'top',
                title: data.msg,
                showConfirmButton: false,
                timer: 3000
            })
        })

        // Listen the Messages from the Server
        socket.on("loggout", (data) => {
            // console.log(data)
            Swal.fire({
                position: 'top',
                title: data.msg,
                showConfirmButton: false,
                timer: 3000
            })
        })

        // Welcome popup
        if (props.welcomepopup) {
            Swal.fire({
                position: 'top',
                title: 'Welcome to ChatRoom',
                showConfirmButton: false,
                timer: 3000
            })

            props.changeWelcomePopup(false);
        }
    }

    // Logout button
    const logoutBtnClick = () => {
        Swal.fire({
            title: 'Logout',
            text: "Do you want to logout?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then((result) => {
            if (result.isConfirmed) {
                socket.disconnect(); // disconnect the current User
                socket = undefined; // Empty socket
                navigates("/")
            }
        })
    }

    return (
        props.Creds && <div>
            <div className=''>
                <div className='chatbody'>
                    <div className='container-fluid'>
                        <div id='chatBodyid'>
                            {getChatMessages.map((Data, index) => {
                                return (
                                    <div key={index}>
                                        <div className={Data.UserInfo === props.Creds ? "userchat" : ""}>
                                            <div
                                                className={Data.UserInfo === props.Creds ?
                                                    `mt-2 p-2 bg-success chat-items rounded text-end text-light` :
                                                    `mt-2 p-2 bg-warning chat-items rounded`}>
                                                <div className='d-flex flex-row'>
                                                    <div className="fw-bold">
                                                        {Data.UserInfo}
                                                    </div>
                                                    <sub className='chattime fst-italic'>
                                                        {Data.msgtime}
                                                    </sub>
                                                </div>
                                                <div className='mt-2'>
                                                    {Data.message}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className='chatcontrol'>
                        <input type='text' id='chatmess' className='form-control' autoComplete='off' />
                        <button type="button" className="btn btn-outline-success" onClick={SendMessage}>Send </button>
                        <div className="btn-group">
                            <button type="button" className="btn btn-outline-success dropdown-toggle"
                                data-bs-toggle="dropdown" aria-expanded="false">
                                ☰
                            </button>
                            <ul className="dropdown-menu">
                                {/* <li><a className="dropdown-item" href="/">Action</a></li>
                                <li><a className="dropdown-item" href="/">Another action</a></li>
                                <li><a className="dropdown-item" href="/">Something else here</a></li>
                                <li><hr className="dropdown-divider" /></li> */}
                                <li><p className='mx-2'>{props.Creds}</p></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><button type='button' className="dropdown-item" onClick={logoutBtnClick}>Log out</button></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatRoom