import React, { useEffect } from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';

import { useDispatchWithLoader } from 'hooks/useDispatchWithLoader';
import { selectAllTests } from 'pages/HomePage/components/AllTests/AllTests.selectors';
import { getAllTests } from 'pages/HomePage/components/AllTests/AllTests.slice';
import TestItem from 'pages/HomePage/components/AllTests/components/TestItem';

import { useAppSelector } from '../../../../redux/hooks';

const AllTests = () => {
    const allTests = useAppSelector(selectAllTests);
    console.log(allTests);
    const dispatchWithLoader = useDispatchWithLoader();

    useEffect(() => {
        dispatchWithLoader(getAllTests());
    }, []);
    return (
        <Box display="flex" flexDirection="column" alignItems="center">
            <Card sx={{ marginTop: 5, width: 570 }}>
                <CardContent sx={{ paddingBottom: '16px !important' }}>
                    <Typography textAlign="center" component="h1" variant="h5">
                        Открытые тесты
                    </Typography>
                </CardContent>
            </Card>
            {allTests.map((test) => (
                <TestItem key={test.id} test={test} />
            ))}
        </Box>
    );
};

export default AllTests;
