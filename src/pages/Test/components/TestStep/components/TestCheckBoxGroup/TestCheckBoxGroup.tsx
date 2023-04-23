import React, { type FC } from 'react';
import {
    Box,
    Card,
    CardContent,
    Checkbox,
    FormControlLabel,
    FormGroup,
    Typography,
} from '@mui/material';

import { type TestGroupType } from 'pages/Test/Test.types';

const TestCheckBoxGroup: FC<TestGroupType> = ({
    question: { question, options },
    register,
    questionIndex,
}) => {
    return (
        <Card sx={{ width: 770, marginTop: 2 }}>
            <CardContent>
                <Typography sx={{ marginBottom: 1 }} variant="subtitle1">
                    {question}
                </Typography>
                <Box display="flex" flexDirection="column">
                    <FormGroup>
                        {options.map((option, index) => (
                            <FormControlLabel
                                key={option.label}
                                value={option.label}
                                control={
                                    <Checkbox defaultChecked={index === 0} />
                                }
                                {...register(
                                    `answers.${questionIndex}.${index}`
                                )}
                                label={option.label}
                            />
                        ))}
                    </FormGroup>
                </Box>
            </CardContent>
        </Card>
    );
};

export default TestCheckBoxGroup;
