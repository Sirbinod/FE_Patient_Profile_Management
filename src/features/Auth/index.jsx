import React, { useState } from "react";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";


const AuthUser = () => {
    const [authMode, setAuthMode] = useState(true)
    return (
        <>
            <div className="welcome">
                <h1> Welcome to the Patient Profile Management</h1>
            </div>
            {authMode ? <SignIn setAuthMode={(val) => setAuthMode(val)} /> : <SignUp setAuthMode={(val) => setAuthMode(val)} /> }
    </>
    ) 
}
export default AuthUser;