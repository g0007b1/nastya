import React, { type FC } from 'react';
import { Pie } from 'react-chartjs-2';
import { Box, Card, CardContent, Typography } from '@mui/material';

import { type AnalyticsAnswerType } from 'pages/TestAnalytics/TestAnalytics.types';

const RadioAnswerBar: FC<AnalyticsAnswerType> = ({
    question,
    answers,
    questionIndex,
}) => {
    const labels: string[] = [];
    const data: number[] = [];

    question.options.forEach((option) => {
        labels.push(option.label);
        data.push(0);
    });

    answers.forEach((answer) => {
        data[
            labels.findIndex((str) => str === answer.answers[questionIndex])
        ] += 1;
    });

    return (
        <Card
            sx={{
                width: '770px',
                marginTop: 2,
                display: 'flex',
                justifyContent: 'center',
            }}
        >
            <CardContent
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                    gap: 2,
                }}
            >
                <Box width="300px">
                    <Pie
                        data={{
                            labels,
                            datasets: [
                                {
                                    label: 'число проголосовавших',
                                    data,
                                    borderWidth: 1,
                                    backgroundColor: [
                                        'rgba(255, 99, 132, 0.2)',
                                        'rgba(54, 162, 235, 0.2)',
                                        'rgba(255, 206, 86, 0.2)',
                                        'rgba(75, 192, 192, 0.2)',
                                        'rgba(153, 102, 255, 0.2)',
                                        'rgba(255, 159, 64, 0.2)',
                                    ],
                                    borderColor: [
                                        'rgba(255, 99, 132, 1)',
                                        'rgba(54, 162, 235, 1)',
                                        'rgba(255, 206, 86, 1)',
                                        'rgba(75, 192, 192, 1)',
                                        'rgba(153, 102, 255, 1)',
                                        'rgba(255, 159, 64, 1)',
                                    ],
                                },
                            ],
                        }}
                        options={{
                            responsive: true,
                            plugins: {
                                legend: {
                                    position: 'top' as const,
                                },
                                title: {
                                    display: true,
                                },
                            },
                        }}
                    />
                </Box>
                <Box>
                    <Typography textAlign="center" variant="subtitle2">
                        {question.question}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
};

export default RadioAnswerBar;
