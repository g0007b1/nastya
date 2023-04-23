import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Box, Button, Toolbar } from '@mui/material';

import { useDispatchWithLoader } from 'hooks/useDispatchWithLoader';
import { selectIsLogin, selectUser } from 'redux/auth.selectors';
import { useAppDispatch, useAppSelector } from 'redux/hooks';

import { login, signOut } from '../../redux/auth.slice';

export const NavBar = () => {
    const isAuth = useAppSelector(selectIsLogin);
    const user = useAppSelector(selectUser);

    const navigate = useNavigate();

    const dispatch = useAppDispatch();
    const dispatchWithLoader = useDispatchWithLoader();

    const email = localStorage.getItem('email');
    const password = localStorage.getItem('password');

    if (email && password && !isAuth) {
        dispatchWithLoader(login({ email, password, rememberMe: true }));
    }

    const onSignOut = () => {
        dispatch(signOut());
        navigate('/home');
    };

    return (
        <AppBar color="primary" position="static">
            <Toolbar
                sx={{ display: 'flex', justifyContent: 'space-between' }}
                variant="dense"
            >
                <Box>
                    <Button
                        component={Link}
                        to="/home"
                        style={{
                            color: 'white',
                            textDecoration: 'none',
                        }}
                        sx={{ flexGrow: 1 }}
                    >
                        Домой
                    </Button>
                    {isAuth && (
                        <Button
                            component={Link}
                            to="/create-test"
                            style={{
                                color: 'white',
                                textDecoration: 'none',
                            }}
                            sx={{ flexGrow: 1 }}
                        >
                            Создать тест
                        </Button>
                    )}
                </Box>

                {isAuth && user && (
                    <Box>
                        <Button
                            component={Link}
                            to="/home"
                            style={{
                                color: 'white',
                                textDecoration: 'none',
                            }}
                        >
                            {user.email}
                        </Button>
                        <Button
                            onClick={onSignOut}
                            style={{
                                color: 'white',
                                textDecoration: 'none',
                            }}
                        >
                            Выйти
                        </Button>
                    </Box>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
