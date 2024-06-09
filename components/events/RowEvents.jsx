import { eventService } from 'services/event.service';
import Switch from '@mui/material/Switch';
import { useState } from 'react';
import {
    TableCell,
} from '@mui/material';
export { RowEvents }

function RowEvents({ event }) {

    const [showStatus, setShowStatus] = useState(!!event.status)

    async function changeStatus(id) {
        try {
            await eventService.changeStatus(id)
            console.log("Estado cambiado");
            setShowStatus(!showStatus);
        } catch (error) {
            console.error("Error: ", error);
        }
    }

    return (
        <TableCell>
            <Switch
                checked={showStatus}
                onChange={e => changeStatus(event.id)}
                color="primary"
            />
        </TableCell>
    )
}