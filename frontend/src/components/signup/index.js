import React, { useRef, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Card, Typography } from '@mui/material';
import { useAuth } from '../../contexts/authContext';
import Alert from '@mui/material/Alert';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {

  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  

  const handleSubmit = async(e) => {

    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Password do not match')
    }

    try {
      setError('');
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value)
      navigate('/');
    } catch {
      setError('Failed to create an account')
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
          <h2 style={{ textAlign:"center" }}>Sign up</h2>
          {/* {currentUser.email} */}
          {error && <Alert severity="error">{error}</Alert>}
          <Typography style={{ textAlign: 'left' }}>Email</Typography>
          <TextField id="Email1" variant="outlined" inputRef={emailRef} sx={{paddingBottom: 1.5}} />
          <Typography>Password</Typography>
          <TextField id="Password" variant="outlined" type="password" inputRef={passwordRef} sx={{paddingBottom: 1.5}} />
          <Typography>PasswordConfirm</Typography>
          <TextField id="PasswordConfirm" variant="outlined" type="password" inputRef={passwordConfirmRef} sx={{paddingBottom: 2}} />
          <Button variant="contained" type="submit" disabled={loading}>Sign up</Button>
        </form>
        <div>
          Already have an account? <Link to="/">Log in</Link>
        </div>
      </Box>
    </Card>
  );
}

export default Signup;
