import { Route, Routes } from "react-router-dom";
import "./App.css";

import { useState } from 'react'

import LoginPage from "./pages/LoginPage/LoginPage";
import SignupPage from './pages/SignupPage/SignupPage'

import userService from "./utils/userService";
// ============================================
// Any Component rendered by a Route component will go in the pages folder
// the pages components will use the components in the "components folder"
// ============================================

function App() {

  // when the app loads up grab the token from storage if there is one
  const [user, setUser] = useState(userService.getUser())

  // call this function after we make a http request to signup or login a user, to update the token! and our state
  // userService.signup(formData)
  // userService.login(state)
  function handleSignUpOrLogin(){
    setUser(userService.getUser())
  }

  return (
    <Routes>
      <Route path="/" element={<h1>Home Page</h1>} />
      <Route path="/login" element={<LoginPage />} />
      <Route path='/signup' element={<SignupPage handleSignUpOrLogin={handleSignUpOrLogin}/>} />
    </Routes>
  );
}

export default App;
