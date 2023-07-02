import './App.css';
import Header from './Components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Login from './Components/Login';
import ChatRoom from './Components/ChatRoom';
import { Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';

function App() {

  let [currentUser, changeCurrwentUser] = useState("")
  let [welcomePopup, changeWelcomePopup] = useState(true)
  async function LoginCred(usname) {
    if (usname !== "") {
      changeCurrwentUser(usname)
    }
    else {
      changeCurrwentUser(null)
    }
    return true;
  }

  return (
    <>
      <Header />
      <Routes>
        <Route exact path="/" element={<Login LoginCred={LoginCred} Creds={currentUser} />} />
        <Route exact path="/chatroom" element={
          <ChatRoom Creds={currentUser}
            welcomepopup={welcomePopup}
            changeWelcomePopup = {changeWelcomePopup}
          />} />
      </Routes>
    </>
  );
}

export default App;
