import Grow from '@mui/material/Grow';
import BasicTable from "../../table/goods";
import { Button, Container, FormControl, InputLabel, List, ListItem, MenuItem, Select } from "@mui/material";
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { AppBarComponent } from '../../app-bar';
import { useParams } from 'react-router-dom';

export const GoodEdit = () => {
    if (localStorage.getItem('token') === null) window.location.replace("/login");

    const id = useParams().id;

    const [name, setName] = useState('');
    const [employee_id, setEmployee_id] = useState('');

    //get dependent cols
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

    //get one item
    useEffect(() => {
        const getAllItems = () => {
            axios
                .get(
                    `http://127.0.0.1:8000/api/goods/${id}`,
                    {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        }
                    }
                )
                .then((res) => {
                    setName(res.data.data.name);
                    setEmployee_id(res.data.data.employee.id);
                })
                .catch((err) => {
                    console.log(err);
                })
        };

        getAllItems();
    }, []);

    //send
    const handleSendForm = () => {
        axios
            .post(
                `http://127.0.0.1:8000/api/goods`,
                {
                    id, name, employee_id, _method: 'put'
                },
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    }
                }
            )
            .then((res) => {
                console.log(res.data);
                window.location.replace("/goods")
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
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Employee</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            defaultValue={employee_id}
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
                    <Button variant="contained" color="success" onClick={handleSendForm}>Submit</Button>                    
                </ListItem>
            </List>
        </Container>
    </>
    );
}