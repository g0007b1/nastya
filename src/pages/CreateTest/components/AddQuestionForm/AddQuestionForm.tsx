import React, { type FC, useState } from 'react';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import NotesIcon from '@mui/icons-material/Notes';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import {
    Box,
    Card,
    CardActions,
    CardContent,
    FormControl,
    IconButton,
    ListItemIcon,
    MenuItem,
    Select,
    type SelectChangeEvent,
    TextField,
} from '@mui/material';

import RadioAndCheckBoxOptions from 'pages/CreateTest/components/AddQuestionForm/RadioAndCheckBoxOptions';
import StringOptions from 'pages/CreateTest/components/AddQuestionForm/StringOptions';
import { type QuestionTypeType } from 'types/tests.types';

import { requiredProp } from '../../../../constants/forms.constants';

import { type AddQuestionFormType } from './AddQuestionForm.types';

const AddQuestionForm: FC<AddQuestionFormType> = ({
    index,
    register,
    remove,
    withPoints,
}) => {
    const [questionType, setQuestionType] =
        useState<QuestionTypeType>('select');

    const onDeleteQuestion = () => {
        remove(index);
    };

    const handleChange = (event: SelectChangeEvent) => {
        setQuestionType(event.target.value as QuestionTypeType);
    };

    console.log(index);

    return (
        <Card sx={{ width: 770, marginTop: 2 }}>
            <CardContent>
                <Box sx={{ display: 'flex', gap: 20 }}>
                    <TextField
                        variant="standard"
                        label={`Вопрос ${index + 1}`}
                        required
                        multiline
                        fullWidth
                        {...register(
                            `questions.${index}.question`,
                            requiredProp
                        )}
                    />
                    <FormControl fullWidth>
                        <Select
                            id="demo-simple-select"
                            value={questionType}
                            {...register(`questions.${index}.type`)}
                            onChange={handleChange}
                        >
                            <MenuItem value="select">
                                <Box
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="space-between"
                                >
                                    <ListItemIcon>
                                        <RadioButtonCheckedIcon />
                                    </ListItemIcon>
                                    Один вариант
                                </Box>
                            </MenuItem>
                            <MenuItem value="multipleSelect">
                                <Box
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="space-between"
                                >
                                    <ListItemIcon>
                                        <CheckBoxIcon />
                                    </ListItemIcon>
                                    Несколько вариантов
                                </Box>
                            </MenuItem>
                            <MenuItem value="string">
                                <Box
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="space-between"
                                >
                                    <ListItemIcon>
                                        <NotesIcon />
                                    </ListItemIcon>
                                    Открытый ответ
                                </Box>
                            </MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                {questionType === 'select' && (
                    <RadioAndCheckBoxOptions
                        parentIndex={index}
                        register={register}
                        withPoints={withPoints}
                    />
                )}
                {questionType === 'string' && (
                    <StringOptions withPoints={withPoints} />
                )}
                {questionType === 'multipleSelect' && (
                    <RadioAndCheckBoxOptions
                        parentIndex={index}
                        register={register}
                        isCheckBox
                        withPoints={withPoints}
                    />
                )}
            </CardContent>
            <CardActions
                disableSpacing
                sx={{
                    alignSelf: 'stretch',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'flex-start',
                    p: 0,
                }}
            >
                <IconButton onClick={onDeleteQuestion} aria-label="delete">
                    <DeleteOutlineIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
};

export default AddQuestionForm;
