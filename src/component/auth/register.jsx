import { Button, Container, List, ListItem, Typography } from "@mui/material";
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import axios from 'axios';

export const Register = () => {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const handleSendRequest = () => {
        axios
            .post(
                `http://127.0.0.1:8000/api/register`,
                {
                    name, email, password
                }
            )
            .then((res) => {
                // localStorage.setItem('token', res.data.token);
                window.location.replace("/login");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
    <>
        <Container align="center" maxWidth="sm">
            <Typography gutterBottom variant="h5" component="div" sx={{marginTop: "1rem;"}}>
                Register
            </Typography>
            <List>
                <ListItem>
                    <TextField sx={{width:"100%;"}} id="outlined-basic" label="Name" variant="outlined" onChange={(event) => setName(event.target.value)} />
                </ListItem>
                <ListItem>
                    <TextField sx={{width:"100%;"}} id="outlined-basic" label="Email" variant="outlined" onChange={(event) => setEmail(event.target.value)} />
                </ListItem>
                <ListItem>
                    <TextField sx={{width:"100%;"}} id="outlined-basic" label="Password" variant="outlined" onChange={(event) => setPassword(event.target.value)} type="password" />
                </ListItem>
                <ListItem align="center">
                    <Button variant="contained" color="success" onClick={handleSendRequest}>Enter</Button>                    
                </ListItem>
            </List>
        </Container>
    </>
    );
}