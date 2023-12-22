import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { AuthContext } from '../contexts/authContext';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Card, Typography } from '@mui/material';

const SignUpPage = props => {
  const context = useContext(AuthContext)
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [registered, setRegistered] = useState(false);

  const register = () => {
    let passwordRegEx = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    const validPassword = passwordRegEx.test(password);

    if (validPassword && password === passwordAgain) {
      context.register(userName, password);
      setRegistered(true);
    }
  }

  if (registered === true) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Card>
        <Box
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            textAlign: 'left'
          }}
        >
          <h2>SignUp page</h2>
          <p>You must register a username and password to log in </p>
          <Typography style={{ textAlign: 'left' }}>Email</Typography>
          <TextField id="Email1" variant="outlined" onChange={e => {
            setUserName(e.target.value);
          }} sx={{ paddingBottom: 1.5 }} />
          <Typography>Password</Typography>
          <TextField id="Password" variant="outlined" type="password" onChange={e => {
            setPassword(e.target.value);
          }} sx={{ paddingBottom: 2 }} />
          <Typography>Password Again</Typography>
          <TextField id="PasswordAgain" variant="outlined" type="password" onChange={e => {
            setPasswordAgain(e.target.value);
          }} sx={{ paddingBottom: 2 }} />
          <Button variant="contained" type="submit" onClick={register}>Register</Button>
          <div>
            Already have an account? <Link to="/">Log in</Link>
          </div>
        </Box>
      </Card >
    </>
  );
};

export default SignUpPage;