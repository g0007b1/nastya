import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { useParams } from 'react-router-dom';
import {
    Box,
    Card,
    CardContent,
    Container,
    Switch,
    Typography,
} from '@mui/material';

import ZeroAnswersCard from 'components/ZeroAnswersCard';
import { useDispatchWithLoader } from 'hooks/useDispatchWithLoader';
import CheckBoxAnswer from 'pages/TestAnalytics/components/CheckBoxAnswer';
import IndividualStatistic from 'pages/TestAnalytics/components/IndividualStatistic';
import RadioAnswerBar from 'pages/TestAnalytics/components/RadioAnswerBar';
import StringAnswer from 'pages/TestAnalytics/components/StringAnswer';
import {
    quizBarLabels,
    quizBarOptions,
} from 'pages/TestAnalytics/TestAnalytics.constants';
import {
    selectAnswers,
    selectTestForAnalytics,
} from 'pages/TestAnalytics/TestAnalytics.selectors';
import {
    getAnswers,
    getTestForAnalytics,
} from 'pages/TestAnalytics/TestAnalytics.slice';
import { calculateTotalTestValues } from 'pages/TestAnalytics/TestAnalytics.utils';
import { type TestType } from 'types/tests.types';

import { useAppSelector } from '../../redux/hooks';

const TestAnalytics = () => {
    const { testId } = useParams();

    const dispatch = useDispatchWithLoader();

    const [isAverage, setIsAverage] = useState(false);

    const answers = useAppSelector(selectAnswers);
    const test = useAppSelector(selectTestForAnalytics);

    const { averageAge, averageTime, averageQuizAnswers, averagePoints } =
        calculateTotalTestValues(answers);

    const data = {
        labels: quizBarLabels,
        datasets: [
            {
                label: 'Среднее кол-во баллов',
                data: averageQuizAnswers,
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };

    useEffect(() => {
        if (testId) {
            dispatch(getAnswers(+testId));
            dispatch(getTestForAnalytics(+testId));
        }
    }, []);

    return (
        <Container
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginTop: 2,
                marginBottom: 3,
            }}
        >
            {' '}
            {answers.length > 0 && (
                <>
                    <Card sx={{ width: '770px' }}>
                        <CardContent>
                            <Typography textAlign="center" variant="h5">
                                {test && test.name}
                            </Typography>
                            <Typography variant="subtitle1">
                                Средний возраст: {averageAge} лет
                            </Typography>
                            <Typography variant="subtitle1">
                                Среднее время прохождения:{' '}
                                {(averageTime / 1000).toFixed(2)} cек.
                            </Typography>
                            {test && test.withPoints && (
                                <Typography variant="subtitle1">
                                    Среднее количество баллов: {averagePoints}
                                </Typography>
                            )}
                            <Typography variant="subtitle1">
                                Количество вопросов:{' '}
                                {test && test.questions.length}
                            </Typography>
                            <Typography variant="subtitle1">
                                Среднее время на вопрос:{' '}
                                {test &&
                                    (
                                        averageTime /
                                        test.questions.length /
                                        1000
                                    ).toFixed(2)}{' '}
                                cек.
                            </Typography>
                            <Box display="flex" alignItems="center">
                                <Typography variant="subtitle2">
                                    среднее
                                </Typography>
                                <Switch
                                    checked={isAverage}
                                    onChange={() => {
                                        setIsAverage(!isAverage);
                                    }}
                                />
                                <Typography variant="subtitle2">
                                    индивидуальное
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                    {!isAverage && (
                        <Card sx={{ width: '770px', marginTop: 2 }}>
                            <CardContent>
                                <Bar options={quizBarOptions} data={data} />
                            </CardContent>
                        </Card>
                    )}
                </>
            )}
            {answers.length === 0 && <ZeroAnswersCard />}
            {test &&
                !isAverage &&
                answers.length > 0 &&
                test.questions.map((question, index) => {
                    if (question.type === 'select')
                        return (
                            <RadioAnswerBar
                                question={question}
                                answers={answers}
                                questionIndex={index}
                                key={index + Math.random()}
                            />
                        );
                    if (question.type === 'multipleSelect')
                        return (
                            <CheckBoxAnswer
                                question={question}
                                answers={answers}
                                questionIndex={index}
                                key={index + Math.random()}
                            />
                        );
                    if (question.type === 'string')
                        return (
                            <StringAnswer
                                question={question}
                                answers={answers}
                                questionIndex={index}
                                key={index + Math.random()}
                            />
                        );
                    return <></>;
                })}
            {isAverage && (
                <IndividualStatistic
                    test={test as TestType}
                    answers={answers}
                />
            )}
        </Container>
    );
};

export default TestAnalytics;
