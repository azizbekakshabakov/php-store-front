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
    const [quantity, setQuantity] = useState('');
    const [category_id, setCategory_id] = useState('');
    const [supplier_id, setSupplier_id] = useState('');
    const [warehouse_id, setWarehouse_id] = useState('');

    //get dependent cols
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
                    setQuantity(res.data.data.quantity);
                    setCategory_id(res.data.data.category.id);
                    setSupplier_id(res.data.data.supplier.id);
                    setWarehouse_id(res.data.data.warehouse.id);
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
                    id, name, quantity, category_id, supplier_id, warehouse_id, _method: 'put'
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
                    <TextField sx={{width:"100%;"}} value={name} id="outlined-basic" label="Name" variant="outlined" onChange={(event) => setName(event.target.value)} />
                </ListItem>
                <ListItem>
                    <TextField sx={{width:"100%;"}} value={quantity} id="outlined-basic" label="Quantity" variant="outlined" onChange={(event) => setQuantity(event.target.value)} inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} />
                </ListItem>
                <ListItem>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Category</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            defaultValue={category_id}
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
                            defaultValue={supplier_id}
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
                            defaultValue={warehouse_id}
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
                    <Button variant="contained" color="success" onClick={handleSendForm}>Submit</Button>                    
                </ListItem>
            </List>
        </Container>
    </>
    );
}