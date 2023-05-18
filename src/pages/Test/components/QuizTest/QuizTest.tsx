import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Button,
    Card,
    CardContent,
    Slider,
    Switch,
    TextField,
    Typography,
} from '@mui/material';

import {
    selectPossiblePoints,
    selectTotalPoints,
} from 'pages/Test/Test.selectors';
import { sendAnswers } from 'pages/Test/Test.slice';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { type QuizAnswers } from 'types/answers.types';

import {
    hardMarks,
    possibilitiesMarks,
    qualityMarks,
    resultMarks,
    understandMarks,
} from './QuizTest.constants';
import { requiredProp } from '../../../../constants/forms.constants';
import { selectUser } from '../../../../redux/auth.selectors';

const QuizTest = () => {
    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<QuizAnswers>();

    const user = useAppSelector(selectUser);
    const totalPoints = useAppSelector(selectTotalPoints);
    const possiblePoints = useAppSelector(selectPossiblePoints);

    const onSubmit = handleSubmit((data) => {
        dispatch(sendAnswers(data)).then(() => {
            navigate('/home');
        });
    });

    return (
        <>
            <Box component="form" onSubmit={onSubmit}>
                {!isNaN(possiblePoints) && (
                    <Card sx={{ width: 770, marginTop: 2 }}>
                        <CardContent>
                            <Typography textAlign="center" variant="h6">
                                Вы набрали {totalPoints} из {possiblePoints}{' '}
                                баллов
                            </Typography>
                        </CardContent>
                    </Card>
                )}
                {!user && (
                    <Card sx={{ width: 770, marginTop: 2 }}>
                        <CardContent>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                autoComplete="email" // TODO добавить валидацию
                                autoFocus
                                error={!!errors.email}
                                label="Email"
                                {...register('email', {
                                    required: true,
                                    validate: (value) =>
                                        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
                                            value ?? ''
                                        ),
                                })}
                            />
                            <Box
                                width="100%"
                                display="flex"
                                justifyContent="space-between"
                            >
                                <Box display="flex" alignItems="center">
                                    <Typography variant="subtitle2">
                                        Пол: м
                                    </Typography>
                                    <Switch required {...register('sex')} />
                                    <Typography variant="subtitle2">
                                        ж
                                    </Typography>
                                </Box>
                                <Box display="flex" alignItems="center">
                                    <Typography variant="subtitle2">
                                        Возраст:
                                    </Typography>
                                    <TextField
                                        required
                                        {...register('age', requiredProp)}
                                        type="number"
                                        variant="standard"
                                    />
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                )}
                <Card sx={{ width: 770, marginTop: 2 }}>
                    <CardContent>
                        <Typography
                            textAlign="center"
                            sx={{ marginBottom: 1 }}
                            variant="subtitle1"
                        >
                            Как бы вы оценили уровень сложности этого теста?
                        </Typography>
                        <Box
                            sx={{ width: 570, display: 'flex', margin: 'auto' }}
                        >
                            <Slider
                                {...register('hard')}
                                aria-label="Custom marks"
                                defaultValue={5}
                                step={1}
                                valueLabelDisplay="auto"
                                marks={hardMarks}
                                min={0}
                                max={10}
                            />
                        </Box>
                    </CardContent>
                </Card>
                <Card sx={{ width: 770, marginTop: 2 }}>
                    <CardContent>
                        <Typography
                            textAlign="center"
                            sx={{ marginBottom: 1 }}
                            variant="subtitle1"
                        >
                            Как вы оцениваете качество вопросов теста?
                        </Typography>
                        <Box
                            sx={{ width: 570, display: 'flex', margin: 'auto' }}
                        >
                            <Slider
                                aria-label="Custom marks"
                                {...register('quality')}
                                defaultValue={5}
                                step={1}
                                valueLabelDisplay="auto"
                                marks={qualityMarks}
                                min={0}
                                max={10}
                            />
                        </Box>
                    </CardContent>
                </Card>
                <Card sx={{ width: 770, marginTop: 2 }}>
                    <CardContent>
                        <Typography
                            textAlign="center"
                            sx={{ marginBottom: 1 }}
                            variant="subtitle1"
                        >
                            Были ли вопросы теста понятными?
                        </Typography>
                        <Box
                            sx={{ width: 570, display: 'flex', margin: 'auto' }}
                        >
                            <Slider
                                aria-label="Custom marks"
                                defaultValue={5}
                                {...register('underStand')}
                                step={1}
                                valueLabelDisplay="auto"
                                marks={understandMarks}
                                min={0}
                                max={10}
                            />
                        </Box>
                    </CardContent>
                </Card>
                <Card sx={{ width: 770, marginTop: 2 }}>
                    <CardContent>
                        <Typography
                            textAlign="center"
                            sx={{ marginBottom: 1 }}
                            variant="subtitle1"
                        >
                            Было ли у вас достаточно возможностей выбора
                            ответов?
                        </Typography>
                        <Box
                            sx={{ width: 570, display: 'flex', margin: 'auto' }}
                        >
                            <Slider
                                {...register('possibilities')}
                                aria-label="Custom marks"
                                defaultValue={5}
                                step={1}
                                valueLabelDisplay="auto"
                                marks={possibilitiesMarks}
                                min={0}
                                max={10}
                            />
                        </Box>
                    </CardContent>
                </Card>
                <Card sx={{ width: 770, marginTop: 2 }}>
                    <CardContent>
                        <Typography
                            textAlign="center"
                            sx={{ marginBottom: 1 }}
                            variant="subtitle1"
                        >
                            Согласны ли вы с результатами теста?
                        </Typography>
                        <Box
                            sx={{ width: 570, display: 'flex', margin: 'auto' }}
                        >
                            <Slider
                                {...register('result')}
                                aria-label="Custom marks"
                                defaultValue={5}
                                step={1}
                                valueLabelDisplay="auto"
                                marks={resultMarks}
                                min={0}
                                max={10}
                            />
                        </Box>
                    </CardContent>
                </Card>
                <Card sx={{ width: 770, marginTop: 2 }}>
                    <CardContent>
                        <Typography
                            textAlign="center"
                            sx={{ marginBottom: 1 }}
                            variant="subtitle1"
                        >
                            Напишите ваши пожелания
                        </Typography>
                        <Box>
                            <TextField
                                {...register('wishes')}
                                multiline
                                fullWidth
                            />
                        </Box>
                    </CardContent>
                </Card>
                <Button
                    fullWidth
                    type="submit"
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Отправить
                </Button>
            </Box>
        </>
    );
};

export default QuizTest;
