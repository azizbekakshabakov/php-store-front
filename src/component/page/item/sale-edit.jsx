import Grow from '@mui/material/Grow';
import BasicTable from "../../table/sales";
import { Button, Container, FormControl, InputLabel, List, ListItem, MenuItem, Select } from "@mui/material";
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { AppBarComponent } from '../../app-bar';
import { useParams } from 'react-router-dom';

export const SaleEdit = () => {
    if (localStorage.getItem('token') === null) window.location.replace("/login");

    const id = useParams().id;

    const [quantity, setQuantity] = useState('');
    const [good_id, setGood_id] = useState('');

    //get dependent cols
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

    //get one item
    useEffect(() => {
        const getAllItems = () => {
            axios
                .get(
                    `http://127.0.0.1:8000/api/sales/${id}`,
                    {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        }
                    }
                )
                .then((res) => {
                    setQuantity(res.data.data.quantity);
                    setGood_id(res.data.data.goods.id);
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
                `http://127.0.0.1:8000/api/sales`,
                {
                    id, quantity, good_id, _method: 'put'
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
                    <TextField sx={{width:"100%;"}} value={quantity} id="outlined-basic" label="Quantity" variant="outlined" onChange={(event) => setQuantity(event.target.value)} inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} />
                </ListItem>
                <ListItem>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Goods</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            defaultValue={good_id}
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