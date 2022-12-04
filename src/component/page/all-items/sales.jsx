import { useState } from "react";
import { useDB } from "../../../func/db-hook";
import Grow from '@mui/material/Grow';
import BasicTable from "../../table/sales";
import { Button, Container } from "@mui/material";
import { Outlet, useLocation, useParams } from 'react-router-dom';
import { AppBarComponent } from "../../app-bar";

export const Sales = () => {
    if (localStorage.getItem('token') === null) window.location.replace("/login");

    const { result, error } = useDB('sales', localStorage.getItem('token'));

    const url = useLocation().pathname;
    const paramId = useParams().id;

    if (url.substring(url.length-3) === 'new') return <Outlet />;

    if (paramId !== undefined) return <Outlet />;

    if (result !== undefined) return (
    <>
        <AppBarComponent/>
        <Container align="right">
            {
                localStorage.getItem('name') === 'admin'
                ?
                <Button variant="contained" color="success" href="/sales/new" sx={{marginTop: "1rem;"}}>Add</Button>:''
            }
            <BasicTable rows={result} />
        </Container>
    </>
    );
}