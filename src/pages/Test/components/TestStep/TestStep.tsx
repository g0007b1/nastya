import React, { type FC } from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button, Card, CardContent, Typography } from '@mui/material';

import TestCheckBoxGroup from 'pages/Test/components/TestStep/components/TestCheckBoxGroup';
import TestRadioGroup from 'pages/Test/components/TestStep/components/TestRadioGroup';
import TestString from 'pages/Test/components/TestStep/components/TestString';
import { type TestStepType } from 'pages/Test/components/TestStep/TestStep.types';
import { selectTime } from 'pages/Test/Test.selectors';
import { setAnswers, setTime } from 'pages/Test/Test.slice';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { type AnswersType } from 'types/answers.types';

const TestStep: FC<TestStepType> = ({ test, setActiveStep }) => {
    const usualDispatch = useAppDispatch();

    const { register, handleSubmit } = useForm<AnswersType>();

    const time = useAppSelector(selectTime);

    const onSubmit = handleSubmit((data) => {
        usualDispatch(setAnswers(data.answers));
        usualDispatch(setTime(Date.now() - time));
        setActiveStep(2);
    });

    return (
        <>
            <Box component="form" onSubmit={onSubmit}>
                <Card sx={{ width: 770, marginTop: 2 }}>
                    <CardContent>
                        <Typography textAlign="center" variant="h3">
                            {test.name}
                        </Typography>
                        <Typography variant="subtitle1">
                            {test.description}
                        </Typography>
                    </CardContent>
                </Card>
                {test.questions.map((question, index) => {
                    if (question.type === 'select')
                        return (
                            <TestRadioGroup
                                key={question.question + String(Math.random())}
                                questionIndex={index}
                                question={question}
                                register={register}
                            />
                        );
                    if (question.type === 'multipleSelect')
                        return (
                            <TestCheckBoxGroup
                                key={question.question + String(Math.random())}
                                questionIndex={index}
                                question={question}
                                register={register}
                            />
                        );
                    if (question.type === 'string')
                        return (
                            <TestString
                                key={question.question + String(Math.random())}
                                questionIndex={index}
                                question={question}
                                register={register}
                            />
                        );
                    return null;
                })}
                <Button
                    fullWidth
                    type="submit"
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Закончить тест
                </Button>
            </Box>
        </>
    );
};

export default TestStep;
