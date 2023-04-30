import React from 'react';
import { Card, CardContent, Container, Typography } from '@mui/material';

const NotFoundCard = () => {
    return (
        <Container sx={{ display: 'flex', justifyContent: 'center' }}>
            <Card
                sx={{
                    width: '770px',
                    marginTop: 2,
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <CardContent>
                    <Typography variant="h6">404 Не найдено :(</Typography>
                </CardContent>
            </Card>
        </Container>
    );
};

export default NotFoundCard;
