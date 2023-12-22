import React, { useContext, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from '../contexts/authContext';
import { Link } from "react-router-dom";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Card, Typography } from '@mui/material';
import Alert from '@mui/material/Alert';

const LoginPage = props => {
    const context = useContext(AuthContext);
    const [msg, setMsg] = useState("");
    const [msgType, setMsgType] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const login = async() => {
        await context.authenticate(userName, password);
        const {success, status} = await context.authenticate(userName, password);
        if (success) {
            console.log("Login success")
            setMsg('success');
            setMsgType("success");
            navigate("/home");
        } else {
            switch (status) {
                case 401:
                    setMsgType("warning");
                    break;
                default:
                    setMsgType("error");
                    break;
            }
            setMsg('Fail to login');
        }

    };

    let location = useLocation();

    // Set 'from' to path where browser is redirected after a successful login - either / or the protected path user requested
    const { from } = location.state ? { from: location.state.from.pathname } : { from: "/home" };



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
                    <h2 style={{ textAlign: "center" }}>Log in</h2>
                    {msg && <Alert severity={msgType}>{msg}</Alert>}
                    <Typography style={{ textAlign: 'left' }}>Email</Typography>
                    <TextField id="Email1" variant="outlined" onChange={e => {
                        setUserName(e.target.value);
                    }} sx={{ paddingBottom: 1.5 }} />
                    <Typography>Password</Typography>
                    <TextField id="Password" variant="outlined" type="password" onChange={e => {
                        setPassword(e.target.value);
                    }} sx={{ paddingBottom: 2 }} />
                    <Button variant="contained" type="submit" onClick={login}>Log in</Button>
                    <div>
                        Without an account? <Link to="/signup">Sign up</Link>
                    </div>
                </Box>
            </Card >
        </>
    );
};

export default LoginPage;