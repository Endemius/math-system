import React, { useState } from 'react';
import { useCookies } from "react-cookie";
import axios from 'axios';
import { API_URL } from '../../configuration';
import { Redirect } from 'react-router-dom';
import {withRouter} from 'react-router-dom';
import translate from "../../tools/translate";
import {
    Avatar,
    Box,
    Button, Checkbox,
    Container,
    CssBaseline,
    FormControl, FormControlLabel, Grid,
    Input,
    InputLabel, Link,
    Stack,
    TextField, Typography
} from "@mui/material";

import "./style.scss"
import {BadgeRounded, LockOutlined} from "@mui/icons-material";
import {IconButton} from "@mui/joy";
import locale from "../../tools/locale";
import logo2 from "../../assets/images/logo2.png"
import {authenticate} from "../../tools/auth";
import cookie from "../../tools/cookie";

const LoginPage = ({history}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        authenticate(email, password);
    };

    if(cookie.get("jwt")){
        return <Redirect to="/"/>
    }

    function Copyright(props) {
        return (
            <Typography variant="body2" color="text.secondary" align="center" {...props}>
                {'Copyright © '}
                <Link color="inherit" href="#">
                    Zhumatayev Yeldar
                </Link>{' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
        );
    }

    function Logo() {
        return (logo2);
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box component={"header"}
                sx={{
                    py: 3,
                    display: 'flex',
                    alignItems: 'right',
                    justifyContent: 'space-between'
                }}
            >
                <Box
                    sx={{
                        gap: 2,
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <img src={logo2} style={{width: '36px', borderRadius: "10px"}}/>
                    <Typography level="title-lg">Math Exercises</Typography>
                </Box>
                <IconButton size={"sm"}
                            variant={"outlined"}
                            onClick={()=> {
                                locale.switch();
                            }}>
                    {locale.get().toLocaleUpperCase()}
                </IconButton>
            </Box>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                    <LockOutlined />
                </Avatar>
                <Typography component="h1" variant="h5">
                    {translate('login.title')}
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label={translate('login.email')}
                        name="email"
                        autoComplete="email"
                        autoFocus
                        type={"email"}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label={translate('login.password')}
                        type={"password"}
                        id="password"
                        autoComplete="current-password"
                        onChange={(e)=> setPassword(e.target.value)}
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        {translate('login.button')}
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                {translate('login.forgot')}
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="#" variant="body2">
                                {translate('login.signUp')}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
    );
};

export default withRouter(LoginPage);