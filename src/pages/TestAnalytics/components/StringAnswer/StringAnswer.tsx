import React, { type FC } from 'react';
import { Card, CardContent, Typography } from '@mui/material';

import { type AnalyticsAnswerType } from 'pages/TestAnalytics/TestAnalytics.types';

const StringAnswer: FC<AnalyticsAnswerType> = ({
    question,
    answers,
    questionIndex,
}) => {
    return (
        <Card
            sx={{
                width: '770px',
                marginTop: 2,
                display: 'flex',
            }}
        >
            <CardContent sx={{ width: '100%' }}>
                <Typography textAlign="center" variant="h6">
                    {question.question}
                </Typography>
                {answers.map((answer, index) => (
                    <Typography key={Math.random()} variant="subtitle1">
                        {index + 1}) {answer.answers[questionIndex]}
                    </Typography>
                ))}
            </CardContent>
        </Card>
    );
};

export default StringAnswer;
