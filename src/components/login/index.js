import React, { useRef, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Card, Typography } from '@mui/material';
import { useAuth } from '../../contexts/authContext';
import Alert from '@mui/material/Alert';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {

  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  

  const handleSubmit = async(e) => {

    e.preventDefault();

    try {
      setError('');
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value)
      navigate('/home');
    } catch {
      setError('Failed to log in')
    }
    setLoading(false);
  }

  return (
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
        <form
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
          onSubmit={handleSubmit}
        >
          <h2 style={{ textAlign:"center" }}>Log in</h2>
          {/* {currentUser.email} */}
          {error && <Alert severity="error">{error}</Alert>}
          <Typography style={{ textAlign: 'left' }}>Email</Typography>
          <TextField id="Email1" variant="outlined" inputRef={emailRef} sx={{paddingBottom: 1.5}} />
          <Typography>Password</Typography>
          <TextField id="Password" variant="outlined" type="password" inputRef={passwordRef} sx={{paddingBottom: 2}} />
          <Button variant="contained" type="submit" disabled={loading} >Log in</Button>
        </form>
        <div>
          Without an account? <Link to="/signup">Sign up</Link>
        </div>
      </Box>
    </Card>
  );
}

export default Login;
