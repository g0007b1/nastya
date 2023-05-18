import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {
    Box,
    Button,
    Card,
    CardContent,
    Container,
    IconButton,
    Typography,
} from '@mui/material';

import NotFoundCard from 'components/NotFoundCard';
import { useDispatchWithLoader } from 'hooks/useDispatchWithLoader';
import { selectProfileTests } from 'pages/ProfilePage/ProfilePage.selectors';
import { deleteTest, getUserTests } from 'pages/ProfilePage/ProfilePage.slice';

import { selectUser } from '../../redux/auth.selectors';
import { useAppSelector } from '../../redux/hooks';

const ProfilePage = () => {
    const dispatch = useDispatchWithLoader();

    const user = useAppSelector(selectUser);
    const tests = useAppSelector(selectProfileTests);

    const onDeleteTest = (id: string) => () => {
        dispatch(deleteTest(id));
    };

    useEffect(() => {
        dispatch(getUserTests());
    }, [user]);

    return (
        <Container>
            {user ? (
                <Box
                    sx={{
                        paddingTop: 5,
                        display: 'flex',
                    }}
                >
                    <Box display="flex" flexDirection="column" width="100%">
                        <Card sx={{ width: '450px' }}>
                            <CardContent>
                                <Box display="flex" gap={2} alignItems="center">
                                    <AccountCircleIcon fontSize="large" />
                                    <Typography variant="h6">
                                        {user ? user.email : ''}
                                    </Typography>
                                </Box>
                                <Box paddingTop={2}>
                                    <Typography variant="subtitle1">
                                        Всего тестов: {tests.length}
                                    </Typography>
                                    <Typography variant="subtitle1">
                                        Пол:{' '}
                                        {user ? (user.sex ? 'ж' : 'м') : ''}
                                    </Typography>
                                    <Typography variant="subtitle1">
                                        Возраст: {user ? user.age : ''}
                                    </Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    </Box>
                    <Box
                        display="flex"
                        width="100%"
                        gap={2}
                        flexDirection="column"
                    >
                        <Card>
                            <CardContent
                                sx={{ paddingBottom: '16px !important' }}
                            >
                                <Typography textAlign="center" variant="h5">
                                    Созданные тесты
                                </Typography>
                            </CardContent>
                        </Card>
                        {tests.map((test) => (
                            <Card key={String(Math.random())}>
                                <CardContent
                                    sx={{
                                        paddingBottom: '16px !important',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Box>
                                        <Typography
                                            sx={{
                                                display: '-webkit-box',
                                                overflow: 'hidden',
                                                WebkitBoxOrient: 'vertical',
                                                WebkitLineClamp: 1,
                                                width: '300px',
                                            }}
                                            variant="h6"
                                        >
                                            {test.name}
                                        </Typography>
                                        <Typography
                                            sx={{
                                                display: '-webkit-box',
                                                overflow: 'hidden',
                                                WebkitBoxOrient: 'vertical',
                                                WebkitLineClamp: 2,
                                                width: '300px',
                                            }}
                                            variant="subtitle2"
                                        >
                                            {test.description}
                                        </Typography>
                                    </Box>
                                    <Button
                                        variant="contained"
                                        component={Link}
                                        sx={{
                                            height: '30px',
                                            width: '120px',
                                        }}
                                        to={`/test-analytics/${test.id}`}
                                    >
                                        Аналитика
                                    </Button>
                                    <IconButton
                                        onClick={onDeleteTest(test.id)}
                                        aria-label="delete"
                                    >
                                        <DeleteOutlineIcon />
                                    </IconButton>
                                </CardContent>
                            </Card>
                        ))}
                    </Box>
                </Box>
            ) : (
                <NotFoundCard />
            )}
        </Container>
    );
};

export default ProfilePage;
