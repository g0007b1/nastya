import React, { type FC, useState } from 'react';
import { Card, CardContent, Pagination } from '@mui/material';

import IndividualAnswers from './components/IndividualAnswers';

import { type IndividualStatisticType } from './IndividualStatistic.types';

const IndividualStatistic: FC<IndividualStatisticType> = ({
    test,
    answers,
}) => {
    const [currentUser, setCurrentUser] = useState(1);

    return (
        <>
            <Card
                sx={{
                    width: '770px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginTop: 2,
                }}
            >
                <CardContent>
                    <Pagination
                        count={answers.length}
                        size="large"
                        page={currentUser}
                        color="primary"
                        onChange={(event, page) => {
                            setCurrentUser(page);
                        }}
                    />
                </CardContent>
            </Card>
            <IndividualAnswers answer={answers[currentUser - 1]} test={test} />
        </>
    );
};

export default IndividualStatistic;
