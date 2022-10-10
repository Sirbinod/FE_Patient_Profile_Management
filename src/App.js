import { Routes, Route } from "react-router-dom";
import "./App.css";
import AuthUser from "./pages/auth";
import Patient from "./pages/patient";
 

function App() {
  return (
    <>
     
      <Routes>
        <Route exact path="/" element={ <AuthUser />} />
        <Route exact path="/patient" element={<Patient/>} />
      </Routes>
    </>
  );
}

export default App;
