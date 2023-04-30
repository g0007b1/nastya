import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Button,
    Card,
    CardContent,
    Slider,
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

import { hardMarks, qualityMarks, understandMarks } from './QuizTest.constants';

const QuizTest = () => {
    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    const { register, handleSubmit } = useForm<QuizAnswers>();

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
                <Card sx={{ width: 770, marginTop: 2 }}>
                    <CardContent>
                        <Typography textAlign="center" variant="h6">
                            Вы набрали {totalPoints} из {possiblePoints} баллов
                        </Typography>
                    </CardContent>
                </Card>
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
                        <Box>
                            <TextField
                                {...register('possibilities')}
                                multiline
                                fullWidth
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
                        <Box>
                            <TextField
                                {...register('result')}
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
