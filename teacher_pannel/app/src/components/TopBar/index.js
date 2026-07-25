import React from 'react';

import {AppBar, Toolbar} from "@mui/material";
import {Button, Typography} from "@mui/joy";
import {Link} from "@mui/icons-material";
// import logo2 from "../../assets/images/logo2.png";
import logo2 from "../../assets/images/logo.svg";
import translate from "../../tools/translate";
import {logout} from "../../tools/auth";

const TopBar = () => {

    return (
        <AppBar
            position="static"
            color="default"
            elevation={0}
            sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
        >
            <Toolbar sx={{ flexWrap: 'wrap' }}>
                <img src={logo2} style={{width: '40px', borderRadius: "10px", marginRight: "10px" }}/>
                <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
                    Math Exercises
                </Typography>
                <nav>
                    <Link
                        variant="button"
                        color="text.primary"
                        href="#"
                        sx={{ my: 1, mx: 1.5 }}
                    >
                        Features
                    </Link>
                    <Link
                        variant="button"
                        color="text.primary"
                        href="#"
                        sx={{ my: 1, mx: 1.5 }}
                    >
                        Enterprise
                    </Link>
                    <Link
                        variant="button"
                        color="text.primary"
                        href="#"
                        sx={{ my: 1, mx: 1.5 }}
                    >
                        Support
                    </Link>
                </nav>
                <Button href="#" variant="outlined" sx={{ my: 1, mx: 1.5 }}
                        onClick={() => {logout()}}>
                    {translate('login.logout')}
                </Button>
            </Toolbar>
        </AppBar>
    )
};

export default TopBar;