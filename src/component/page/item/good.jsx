import Grow from '@mui/material/Grow';
import BasicTable from "../../table/goods";
import { Button, Container, FormControl, InputLabel, List, ListItem, MenuItem, Select } from "@mui/material";
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { AppBarComponent } from '../../app-bar';
import { useParams } from 'react-router-dom';

export const Good = () => {
    if (localStorage.getItem('token') === null) window.location.replace("/login");

    const [name, setName] = useState();
    const [quantity, setQuantity] = useState();
    const [category_id, setCategory_id] = useState('');
    const [supplier_id, setSupplier_id] = useState('');
    const [warehouse_id, setWarehouse_id] = useState('');

    const [categories, setCategories] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [warehouses, setWarehouses] = useState([]);
    useEffect(() => {
        const getAllItems = () => {
            axios
                .get(
                    `http://127.0.0.1:8000/api/categories`,
                    {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        }
                    }
                )
                .then((res) => {
                    setCategories(res.data.items);
                })
                .catch((err) => {
                    console.log(err);
                });

            axios
                .get(
                    `http://127.0.0.1:8000/api/suppliers`,
                    {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        }
                    }
                )
                .then((res) => {
                    setSuppliers(res.data.items);
                })
                .catch((err) => {
                    console.log(err);
                });

            axios
                .get(
                    `http://127.0.0.1:8000/api/warehouses`,
                    {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        }
                    }
                )
                .then((res) => {
                    setWarehouses(res.data.items);
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
                `http://127.0.0.1:8000/api/goods`,
                {
                    name, quantity, category_id, supplier_id, warehouse_id,
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
                    <TextField sx={{width:"100%;"}} id="outlined-basic" label="Name" variant="outlined" onChange={(event) => setName(event.target.value)} />
                </ListItem>
                <ListItem>
                    <TextField sx={{width:"100%;"}} id="outlined-basic" label="Quantity" variant="outlined" onChange={(event) => setQuantity(event.target.value)} inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} />
                </ListItem>
                <ListItem>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Category</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={category_id}
                            label="Category"
                            onChange={(event) => setCategory_id(event.target.value)}
                        >
                            {categories.map((category) => (
                                <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </ListItem>
                <ListItem>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Supplier</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={supplier_id}
                            label="Supplier"
                            onChange={(event) => setSupplier_id(event.target.value)}
                        >
                            {suppliers.map((supplier) => (
                                <MenuItem key={supplier.id} value={supplier.id}>{supplier.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </ListItem>
                <ListItem>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Warehouse</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={warehouse_id}
                            label="Warehouse"
                            onChange={(event) => setWarehouse_id(event.target.value)}
                        >
                            {warehouses.map((warehouse) => (
                                <MenuItem key={warehouse.id} value={warehouse.id}>{warehouse.index}</MenuItem>
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