import React from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {
    Box,
    Button,
    Card,
    CardContent,
    Container,
    IconButton,
    Switch,
    TextField,
    Typography,
} from '@mui/material';

import { useDispatchWithLoader } from 'hooks/useDispatchWithLoader';
import AddQuestionForm from 'pages/CreateTest/components/AddQuestionForm';
import { createTest } from 'pages/CreateTest/CreateTest.slice';
import { type TestType } from 'types/tests.types';

import { requiredProp } from '../../constants/forms.constants';

const CreateTest = () => {
    const navigate = useNavigate();

    const { control, register, handleSubmit, watch } = useForm<TestType>();

    const dispatch = useDispatchWithLoader();

    const withPoints = watch('withPoints');

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'questions',
    });

    const onSubmit = handleSubmit((data) => {
        dispatch(createTest(data)).then(() => {
            navigate('/home');
        });
    });

    const addQuestion = () => {
        // @ts-expect-error
        append('');
    };

    return (
        <Container>
            <Box
                sx={{
                    paddingTop: 5,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
                component="form"
                onSubmit={onSubmit}
            >
                <Card sx={{ width: 770 }}>
                    <CardContent
                        sx={{ display: 'flex', flexDirection: 'column' }}
                    >
                        <TextField
                            InputProps={{
                                sx: { fontSize: 30, marginBottom: 2 },
                            }}
                            sx={{ fontSize: '55px' }}
                            variant="standard"
                            multiline
                            required
                            defaultValue="Новый Тест"
                            {...register('name', requiredProp)}
                        />
                        <TextField
                            variant="standard"
                            label="Описание"
                            multiline
                            {...register('description', requiredProp)}
                        />
                        <Box
                            sx={{
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'end',
                                alignItems: 'center',
                                marginTop: 1,
                            }}
                        >
                            <Typography variant="subtitle2">
                                с баллами
                            </Typography>
                            <Switch {...register('withPoints')} />
                        </Box>
                    </CardContent>
                </Card>
                {fields.map((field, index) => (
                    <AddQuestionForm
                        withPoints={withPoints}
                        key={field.id}
                        index={index}
                        register={register}
                        remove={remove}
                    />
                ))}
                <IconButton
                    aria-label="fingerprint"
                    color="primary"
                    onClick={addQuestion}
                >
                    <AddCircleOutlineIcon />
                </IconButton>
                <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
                    Создать тест
                </Button>
            </Box>
        </Container>
    );
};

export default CreateTest;
