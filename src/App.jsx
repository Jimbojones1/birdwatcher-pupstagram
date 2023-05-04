import { Route, Routes } from "react-router-dom";
import "./App.css";

import { useState } from 'react'

import LoginPage from "./pages/LoginPage/LoginPage";
import SignupPage from './pages/SignupPage/SignupPage'
import FeedPage from "./pages/FeedPage/FeedPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";


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
    // userService.getUser, grabs the token from localstorage, decodes it to an object, that we can we store in our state!
    setUser(userService.getUser())
  }

  return (
    <Routes>
      <Route path="/" element={<FeedPage loggedUser={user} />} />
      <Route path="/login" element={<LoginPage handleSignUpOrLogin={handleSignUpOrLogin}/>} />
      <Route path='/signup' element={<SignupPage handleSignUpOrLogin={handleSignUpOrLogin}/>} />
      <Route path="/:username" element={<ProfilePage loggedUser={user} />} />
    </Routes>
  );
}

export default App;
