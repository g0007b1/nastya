import { type FC } from 'react';
import { Card, CardContent, Typography } from '@mui/material';

import { type IndividualAnswersType } from './IndividualAnswers.types';

const IndividualAnswers: FC<IndividualAnswersType> = ({ answer, test }) => {
    return (
        <>
            <Card
                sx={{
                    width: '770px',
                    marginTop: 2,
                }}
            >
                <CardContent>
                    <Typography variant="subtitle1">
                        Прошел: {answer.userEmail}
                    </Typography>
                    <Typography variant="subtitle1">
                        Пол: {answer.sex ? 'ж' : 'м'}
                    </Typography>
                    <Typography variant="subtitle1">
                        Возраст: {answer.age}
                    </Typography>
                    {test.withPoints && (
                        <Typography variant="subtitle1">
                            Баллов: {answer.points}
                        </Typography>
                    )}
                    <Typography variant="subtitle1">
                        Время прохождения: {(answer.time / 1000).toFixed(2)}{' '}
                        cек.
                    </Typography>
                    <Typography variant="subtitle1">
                        Среднее время на вопрос:{' '}
                        {test &&
                            (
                                answer.time /
                                test.questions.length /
                                1000
                            ).toFixed(2)}{' '}
                        cек.
                    </Typography>
                </CardContent>
            </Card>
            {test.questions.map((question, index) => {
                return (
                    <Card
                        key={Math.random()}
                        sx={{
                            width: '770px',
                            marginTop: 2,
                        }}
                    >
                        <CardContent>
                            <Typography textAlign="center" variant="h6">
                                {question.question}
                            </Typography>
                            {typeof answer.answers[index] === 'object' &&
                                // @ts-expect-error
                                answer.answers[index].map((ans) => {
                                    return (
                                        <Typography
                                            key={Math.random()}
                                            variant="subtitle1"
                                        >
                                            {ans}
                                        </Typography>
                                    );
                                })}
                            {typeof answer.answers[index] === 'string' && (
                                <Typography
                                    key={Math.random()}
                                    variant="subtitle1"
                                >
                                    {answer.answers[index]}
                                </Typography>
                            )}
                        </CardContent>
                    </Card>
                );
            })}
        </>
    );
};

export default IndividualAnswers;
