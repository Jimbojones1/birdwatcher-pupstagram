import { Route, Routes } from "react-router-dom";
import "./App.css";

import LoginPage from "./pages/LoginPage/LoginPage";
import SignupPage from './pages/SignupPage/SignupPage'


// ============================================
// Any Component rendered by a Route component will go in the pages folder
// the pages components will use the components in the "components folder"
// ============================================

function App() {
  return (
    <Routes>
      <Route path="/" element={<h1>Home Page</h1>} />
      <Route path="/login" element={<LoginPage />} />
      <Route path='/signup' element={<SignupPage />} />
    </Routes>
  );
}

export default App;
