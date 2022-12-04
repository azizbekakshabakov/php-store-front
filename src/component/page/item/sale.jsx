import Grow from '@mui/material/Grow';
import BasicTable from "../../table/sales";
import { Button, Container, FormControl, InputLabel, List, ListItem, MenuItem, Select } from "@mui/material";
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { AppBarComponent } from '../../app-bar';
import { useParams } from 'react-router-dom';

export const Sale = () => {
    if (localStorage.getItem('token') === null) window.location.replace("/login");

    const [quantity, setQuantity] = useState();
    const [good_id, setGood_id] = useState('');

    const [goods, setGoods] = useState([]);
    useEffect(() => {
        const getAllItems = () => {
            axios
                .get(
                    `http://127.0.0.1:8000/api/goods`,
                    {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        }
                    }
                )
                .then((res) => {
                    setGoods(res.data.items);
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
                `http://127.0.0.1:8000/api/sales`,
                {
                    quantity, good_id
                },
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    }
                }
            )
            .then((res) => {
                console.log(res.data);
                window.location.replace("/sales")
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
                    <TextField sx={{width:"100%;"}} id="outlined-basic" label="Quantity" variant="outlined" onChange={(event) => setQuantity(event.target.value)} inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} />
                </ListItem>
                <ListItem>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Goods</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={good_id}
                            label="Goods"
                            onChange={(event) => setGood_id(event.target.value)}
                        >
                            {goods.map((good) => (
                                <MenuItem key={good.id} value={good.id}>{good.name}</MenuItem>
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