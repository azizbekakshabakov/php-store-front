import Grow from '@mui/material/Grow';
import BasicTable from "../../table/employees";
import { Button, Container, List, ListItem } from "@mui/material";
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { AppBarComponent } from '../../app-bar';
import { useParams } from 'react-router-dom';

export const EmployeeEdit = () => {
    if (localStorage.getItem('token') === null) window.location.replace("/login");

    const id = useParams().id;

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [salary, setSalary] = useState(0);
    const [experience, setExperience] = useState(0);
    const [image, setImage] = useState();

    useEffect(() => {
        const getAllItems = () => {
            axios
                .get(
                    `http://127.0.0.1:8000/api/employees/${id}`,
                    {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        }
                    }
                )
                .then((res) => {
                    setName(res.data.data.name);
                    setSurname(res.data.data.surname);
                    setSalary(res.data.data.salary);
                    setExperience(res.data.data.experience);
                })
                .catch((err) => {
                    console.log(err);
                })
        };

        getAllItems();
    }, []);

    const handleSendForm = () => {
        axios
            .post(
                `http://127.0.0.1:8000/api/employees`,
                {
                    id, name, surname, salary, experience, image, _method: 'put'
                },
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        "Content-Type": "multipart/form-data"
                    }
                }
            )
            .then((res) => {
                console.log(res.data);
                window.location.replace("/employees")
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
    <>
        <AppBarComponent/>
        <Container align="center" maxWidth="sm">
            <List>
                <ListItem>
                    <TextField sx={{width:"100%;"}} value={name} id="outlined-basic" label="First name" variant="outlined" onChange={(event) => setName(event.target.value)} />
                </ListItem>
                <ListItem>
                    <TextField sx={{width:"100%;"}} value={surname} id="outlined-basic" label="Last name" variant="outlined" onChange={(event) => setSurname(event.target.value)} />
                </ListItem>
                <ListItem>
                    <TextField sx={{width:"100%;"}} value={salary} id="outlined-basic" label="Salary" variant="outlined" onChange={(event) => setSalary(event.target.value)} inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} />
                </ListItem>
                <ListItem>
                    <TextField sx={{width:"100%;"}} value={experience} id="outlined-basic" label="Experience" variant="outlined" onChange={(event) => setExperience(event.target.value)} inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} />
                </ListItem>
                <ListItem align="center">
                    <Button variant="contained" color="secondary" component="label">Choose image<input
                        type="file"
                        hidden
                        onChange={(event) => setImage(event.target.files[0])}
                    /></Button>
                </ListItem>
                <ListItem align="center">
                    <Button variant="contained" color="success" onClick={handleSendForm}>Submit</Button>                    
                </ListItem>
            </List>
        </Container>
    </>
    );
}