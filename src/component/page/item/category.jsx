import Grow from '@mui/material/Grow';
import BasicTable from "../../table/categories";
import { Button, Container, FormControl, InputLabel, List, ListItem, MenuItem, Select } from "@mui/material";
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { AppBarComponent } from '../../app-bar';
import { useParams } from 'react-router-dom';

export const Category = () => {
    if (localStorage.getItem('token') === null) window.location.replace("/login");

    const [name, setName] = useState();
    const [employee_id, setEmployee_id] = useState('');

    const [employees, setEmployees] = useState([]);
    useEffect(() => {
        const getAllItems = () => {
            axios
                .get(
                    `http://127.0.0.1:8000/api/employees`,
                    {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        }
                    }
                )
                .then((res) => {
                    setEmployees(res.data.items);
                })
                .catch((err) => {
                    console.log(err);
                });
        };

        getAllItems();
    }, []);


    const handleSendForm = () => {
        axios
            .post(
                `http://127.0.0.1:8000/api/categories`,
                {
                    name, employee_id
                },
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    }
                }
            )
            .then((res) => {
                console.log(res.data);
                window.location.replace("/categories")
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
                    <TextField sx={{width:"100%;"}} id="outlined-basic" label="Name" variant="outlined" onChange={(event) => setName(event.target.value)} />
                </ListItem>
                <ListItem>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Employee</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={employee_id}
                            label="Employee"
                            onChange={(event) => setEmployee_id(event.target.value)}
                        >
                            {employees.map((employee) => (
                                <MenuItem key={employee.id} value={employee.id}>{`${employee.name} ${employee.surname}`}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </ListItem>
                <ListItem align="center">
                    <Button variant="contained" color="success" onClick={handleSendForm}>Add</Button>                    
                </ListItem>
            </List>
        </Container>
    </>
    );
}