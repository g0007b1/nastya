import React, { type FC, useState } from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CloseIcon from '@mui/icons-material/Close';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { Box, IconButton, TextField } from '@mui/material';

import { type RadioAndCheckBoxOptionsType } from './RadioAndCheckBoxOptions.types';

const RadioAndCheckBoxOptions: FC<RadioAndCheckBoxOptionsType> = ({
    isCheckBox,
    register,
    parentIndex,
    withPoints,
}) => {
    const [options, setOptions] = useState([{ lastId: 0 }]);

    const addFields = () => {
        const newOption = { lastId: options.length };
        setOptions([...options, newOption]);
    };

    const deleteField = (index: number) => {
        const optionsCopy = [...options];
        optionsCopy.splice(index, 1);
        setOptions(optionsCopy);
    };

    return (
        <Box>
            {options.map((option, index) => (
                <Box
                    marginBottom={1}
                    display="flex"
                    alignItems="center"
                    gap={2}
                    key={String(option.lastId)}
                >
                    {isCheckBox ? (
                        <CheckBoxOutlineBlankIcon color="disabled" />
                    ) : (
                        <RadioButtonUncheckedIcon color="disabled" />
                    )}

                    <Box width={250}>
                        <TextField
                            {...register(
                                `questions.${parentIndex}.options.${index}.label`
                            )}
                            fullWidth
                            multiline
                            variant="standard"
                        />
                    </Box>
                    <CloseIcon
                        onClick={() => {
                            deleteField(index);
                        }}
                        color="disabled"
                    />
                    {withPoints && (
                        <Box width={50}>
                            <TextField
                                {...register(
                                    `questions.${parentIndex}.options.${index}.points`
                                )}
                                type="number"
                                defaultValue={0}
                                fullWidth
                                multiline
                                variant="standard"
                            />
                        </Box>
                    )}
                </Box>
            ))}
            <IconButton
                onClick={addFields}
                sx={{ padding: 0 }}
                aria-label="delete"
            >
                <AddCircleOutlineIcon />
            </IconButton>
        </Box>
    );
};

export default RadioAndCheckBoxOptions;
