import React, { type FC } from 'react';
import { Box, Card, CardContent, TextField, Typography } from '@mui/material';

import { type TestGroupType } from 'pages/Test/Test.types';

const TestString: FC<TestGroupType> = ({
    question: { question },
    register,
    questionIndex,
}) => {
    return (
        <Card sx={{ width: 770, marginTop: 2 }}>
            <CardContent>
                <Typography sx={{ marginBottom: 1 }} variant="subtitle1">
                    {question}
                </Typography>
                <Box>
                    <TextField
                        multiline
                        {...register(`answers.${questionIndex}`)}
                        fullWidth
                    />
                </Box>
            </CardContent>
        </Card>
    );
};

export default TestString;
