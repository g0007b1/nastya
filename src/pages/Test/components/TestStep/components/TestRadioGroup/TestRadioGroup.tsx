import React, { type FC } from 'react';
import {
    Box,
    Card,
    CardContent,
    FormControl,
    FormControlLabel,
    RadioGroup,
    Typography,
} from '@mui/material';
import Radio from '@mui/material/Radio';

import { type TestGroupType } from 'pages/Test/Test.types';

const TestRadioGroup: FC<TestGroupType> = ({
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
                    <FormControl>
                        <RadioGroup
                            aria-labelledby="radio-buttons-group-label"
                            defaultValue={options[0].label}
                        >
                            {options.map((option) => (
                                <FormControlLabel
                                    key={option.label + String(Math.random())}
                                    value={option.label}
                                    control={<Radio />}
                                    label={option.label}
                                    {...register(`answers.${questionIndex}`)}
                                />
                            ))}
                        </RadioGroup>
                    </FormControl>
                </Box>
            </CardContent>
        </Card>
    );
};

export default TestRadioGroup;
