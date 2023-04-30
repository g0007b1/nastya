import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const ZeroAnswersCard = () => {
    return (
        <Card
            sx={{
                width: '770px',
                marginTop: 2,
                display: 'flex',
                justifyContent: 'center',
            }}
        >
            <CardContent>
                <Typography variant="h6">Нет ответов :(</Typography>
            </CardContent>
        </Card>
    );
};

export default ZeroAnswersCard;
