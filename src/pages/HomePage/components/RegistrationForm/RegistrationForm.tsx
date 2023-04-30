import { useForm } from 'react-hook-form';
import {
    Box,
    Button,
    Card,
    CardContent,
    Switch,
    TextField,
    Typography,
} from '@mui/material';

import { useDispatchWithLoader } from 'hooks/useDispatchWithLoader';

import { requiredProp } from '../../../../constants/forms.constants';
import { registerAccount } from '../../../../redux/auth.slice';

import { type RegistrationDataType } from './RegistrationForm.types';

const RegistrationForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegistrationDataType>();

    const dispatch = useDispatchWithLoader();

    const onSubmit = handleSubmit((data) => {
        dispatch(registerAccount(data));
    });

    return (
        <Card sx={{ marginTop: 5, width: 570 }}>
            <CardContent>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        mt: 2,
                        mb: 2,
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Регистрация
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={onSubmit}
                        noValidate
                        sx={{ mt: 1 }}
                    >
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            autoComplete="email" // TODO добавить валидацию
                            autoFocus
                            error={!!errors.email}
                            label="Email"
                            {...register('email', {
                                required: true,
                                validate: (value) =>
                                    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
                                        value
                                    ),
                            })}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Пароль"
                            error={!!errors.password}
                            type="password"
                            {...register('password', {
                                required: true,
                                validate: (value) => value.length >= 4,
                            })}
                            autoComplete="current-password"
                        />
                        <Box
                            width="100%"
                            display="flex"
                            justifyContent="space-between"
                        >
                            <Box display="flex" alignItems="center">
                                <Typography variant="subtitle2">
                                    Пол: м
                                </Typography>
                                <Switch required {...register('sex')} />
                                <Typography variant="subtitle2">ж</Typography>
                            </Box>
                            <Box display="flex" alignItems="center">
                                <Typography variant="subtitle2">
                                    Возраст:
                                </Typography>
                                <TextField
                                    required
                                    {...register('age', requiredProp)}
                                    type="number"
                                    variant="standard"
                                />
                            </Box>
                        </Box>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Зарегистрироваться
                        </Button>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};

export default RegistrationForm;
