import { Alert, Button, Collapse, Container, IconButton, List, ListItem, Typography } from "@mui/material";
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';

export const Login = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState('');

    const handleSendRequest = () => {
        axios
            .post(
                `http://127.0.0.1:8000/api/login`,
                {
                    email, password
                }
            )
            .then((res) => {
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('name', res.data.name);
                window.location.replace("/");
            })
            .catch((err) => {
                console.log(err);
                setError(err.response.data);
            });
    };

    return (
        <Container align="center" maxWidth="sm">
            <Typography gutterBottom variant="h5" component="div" sx={{marginTop: "10rem;"}}>
                Login
            </Typography>
            <List>
                <ListItem>
                    <TextField sx={{width:"100%;"}} id="outlined-basic" label="Email" variant="outlined" onChange={(event) => setEmail(event.target.value)} />
                </ListItem>
                <ListItem>
                    <TextField sx={{width:"100%;"}} id="outlined-basic" label="Password" variant="outlined" onChange={(event) => setPassword(event.target.value)} type="password" />
                </ListItem>

                {/* error if wrong email or password */}
                <Collapse in={error !== ''}>
                    <Alert
                        action={
                            <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setError('');
                            }}
                            >
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }
                        sx={{ mb: 2 }}
                        severity="error"
                    >
                        {error}
                    </Alert>
                </Collapse>

                <ListItem align="center">
                    <Button variant="contained" color="success" onClick={handleSendRequest}>Enter</Button>                    
                </ListItem>
            </List>
        </Container>
    );
}