import { clientService } from 'services/personal.service';
import Switch from '@mui/material/Switch';
import { useState } from 'react';
import {
    TableCell,
} from '@mui/material';
export { RowClients }

function RowClients({ client }) {

    const [showStatus, setShowStatus] = useState(!!client.status)

    async function changeStatus(id) {
        try {
            await clientService.changeStatus(id)
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
                onChange={e => changeStatus(client.id)}
                color="primary"
            />
        </TableCell>
    )
}