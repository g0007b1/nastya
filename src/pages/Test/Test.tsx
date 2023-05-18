import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
    Box,
    Card,
    CardContent,
    Container,
    Step,
    StepLabel,
    Stepper,
} from '@mui/material';

import NotFoundCard from 'components/NotFoundCard';
import { useDispatchWithLoader } from 'hooks/useDispatchWithLoader';
import QuizTest from 'pages/Test/components/QuizTest';
import StartStep from 'pages/Test/components/StartStep';
import TestStep from 'pages/Test/components/TestStep';
import { selectTest } from 'pages/Test/Test.selectors';
import { getTest } from 'pages/Test/Test.slice';

import { useAppSelector } from '../../redux/hooks';

const Test = () => {
    const { testId } = useParams();

    const dispatch = useDispatchWithLoader();

    const test = useAppSelector(selectTest);

    const [activeStep, setActiveStep] = useState(0);

    useEffect(() => {
        if (testId) dispatch(getTest(testId));
    }, []);

    if (!test) return <NotFoundCard />;

    return (
        <Container>
            <Box
                sx={{
                    paddingTop: 5,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Card sx={{ width: 770 }}>
                    <CardContent>
                        <Stepper activeStep={activeStep} alternativeLabel>
                            <Step>
                                <StepLabel>Начало</StepLabel>
                            </Step>
                            <Step>
                                <StepLabel>Тест</StepLabel>
                            </Step>
                            <Step>
                                <StepLabel>Опрос</StepLabel>
                            </Step>
                        </Stepper>
                    </CardContent>
                </Card>
                {activeStep === 0 && (
                    <StartStep setActiveStep={setActiveStep} />
                )}
                {activeStep === 1 && (
                    <TestStep setActiveStep={setActiveStep} test={test} />
                )}
                {activeStep === 2 && <QuizTest />}
            </Box>
        </Container>
    );
};

export default Test;
