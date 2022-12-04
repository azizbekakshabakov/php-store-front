import Grow from '@mui/material/Grow';
import BasicTable from "../../table/suppliers";
import { Button, Container, FormControl, InputLabel, List, ListItem, MenuItem, Select } from "@mui/material";
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { AppBarComponent } from '../../app-bar';
import { useParams } from 'react-router-dom';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

export const Supplier = () => {
    if (localStorage.getItem('token') === null) window.location.replace("/login");

    const [name, setName] = useState();
    const [address, setAddress] = useState();
    const [supply_date, setSupply_date] = useState();

    const handleSendForm = () => {
        axios
            .post(
                `http://127.0.0.1:8000/api/suppliers`,
                {
                    name, address, supply_date: `${supply_date.$y}-${supply_date.$M+1}-${supply_date.$D}`
                },
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    }
                }
            )
            .then((res) => {
                console.log(res.data);
                window.location.replace("/suppliers")
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
                    <TextField sx={{width:"100%;"}} id="outlined-basic" label="Address" variant="outlined" onChange={(event) => setAddress(event.target.value)} />
                </ListItem>
                <ListItem>
                    <FormControl fullWidth>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DesktopDatePicker
                                label="Date desktop"
                                inputFormat="YYYY-MM-DD"
                                value={supply_date}
                                onChange={(event) => setSupply_date(event)}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
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