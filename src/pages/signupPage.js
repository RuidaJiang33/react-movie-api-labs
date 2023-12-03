import React from "react";
import Signup from '../components/signup'
import { AuthProvider } from "../contexts/authContext";

const SignupPage = () => {
  return (
    <>
      <AuthProvider>
        <Signup/>
      </AuthProvider>   
    </>
  )
}

export default SignupPage;