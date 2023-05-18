import React, { type FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Card, CardContent, Typography } from '@mui/material';

import { type TestItemType } from 'pages/HomePage/components/AllTests/components/TestItem/TestItem.types';

const TestItem: FC<TestItemType> = ({ test }) => {
    const navigate = useNavigate();

    const onClickGoToTest = (testId: string) => () => {
        navigate(`/test/${testId}`);
    };

    return (
        <Card sx={{ marginTop: 5, width: 570 }}>
            <CardContent sx={{ paddingBottom: '16px !important' }}>
                <Typography component="h1" variant="h5">
                    {test.name}
                </Typography>
                <Typography marginTop={1} lineHeight={1} variant="subtitle1">
                    {test.description}
                </Typography>
                <Box
                    display="flex"
                    marginTop={1}
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Typography
                        marginTop={2}
                        lineHeight={1}
                        variant="subtitle2"
                    >
                        кол-во вопросов: {test.questions.length}
                    </Typography>
                    <Button
                        variant="contained"
                        onClick={onClickGoToTest(test.id)}
                    >
                        Пройти
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};

export default TestItem;
