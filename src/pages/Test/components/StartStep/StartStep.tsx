import React, { type FC } from 'react';
import { Button, Card, CardContent } from '@mui/material';

import { type StartStepType } from 'pages/Test/components/StartStep/StartStep.types';
import { setTime } from 'pages/Test/Test.slice';

import { useAppDispatch } from '../../../../redux/hooks';

const StartStep: FC<StartStepType> = ({ setActiveStep }) => {
    const dispatch = useAppDispatch();

    const onClick = () => {
        dispatch(setTime(Date.now()));
        setActiveStep(1);
    };

    return (
        <>
            <Card sx={{ width: 770, marginTop: 2 }}>
                <CardContent>
                    <Button fullWidth onClick={onClick} variant="contained">
                        Начать тест
                    </Button>
                </CardContent>
            </Card>
        </>
    );
};

export default StartStep;
