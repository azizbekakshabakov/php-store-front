import { Typography } from "@mui/material";
import { AppBarComponent } from "./app-bar";

export const MainPage = () => {
    if (localStorage.getItem('token') === null) window.location.replace("/login");

    return (
    <>
        <AppBarComponent/>
        <Typography gutterBottom variant="h2" component="div" sx={{marginTop: "20rem;"}} color="primary" align="center">
            Supermarket
        </Typography>
    </>
    );
}