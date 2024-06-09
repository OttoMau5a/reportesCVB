import React, { useState } from 'react';
import { TableCell } from '@mui/material';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { userService } from 'services/user.service';
export function RowUser(val) {
    const { user, setShowStatus, showStatus } = val
    const handleChangeStatus = async () => {
        confirmAlert({
            title: 'Confirmation',
            message: 'Are you sure to change the state?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: async () => {
                        await userService.changeStatus(user.id);
                        setShowStatus(!showStatus);
                    },
                },
                {
                    label: 'No',
                    onClick: () => { },
                },
            ],
        });
    };
    return (
        <TableCell>
            <button
                onClick={handleChangeStatus}
                className={`${!!user.status ? 'bg-green-500' : 'bg-red-500'
                    } text-white px-2 py-1 rounded-md `}
            >
                {!!user.status ? 'Active' : 'Inactive'}
            </button>
        </TableCell>
    );
}
