import { useState, useEffect } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Paper,
    CircularProgress,
    Button,
    IconButton,
    TableSortLabel,
} from '@mui/material';
import ButtonGroup from '@mui/material/ButtonGroup';
import EditIcon from '@mui/icons-material/Edit';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { Layout } from 'components/clients';
import NextLink from 'next/link';
import { userService } from 'services';
import { RowUser } from 'components/users/RowUser';
function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}
function getComparator(order, orderBy) {
    return (a, b) => {
        if (order === 'desc') {
            return descendingComparator(a, b, orderBy);
        }
        return -descendingComparator(a, b, orderBy);
    };
}
function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}
export default function Index() {
    const [users, setUsers] = useState(null);
    const [orderBy, setOrderBy] = useState('name');
    const [order, setOrder] = useState('asc');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchTermInactive, setSearchTermInactive] = useState('');
    const [filteredUsers, setFilteredUsers] = useState(null);
    const [tableState, setTableState] = useState(true);
    const [activeUsers, setActiveUsers] = useState([]);
    const [inactiveUsers, setInactiveUsers] = useState([]);
    const [showStatus, setShowStatus] = useState(true);
    const handleChangeTable = () => {
        setTableState(!tableState);
        setSearchTerm('');
        setSearchTermInactive('');
    };
    useEffect(() => {
        userService.getAll().then((x) => {
            const active = x.filter((user) => user.status);
            const inactive = x.filter((user) => !user.status);
            setActiveUsers(active);
            setInactiveUsers(inactive);
            const filteredUsers = tableState ? active : inactive;
            setUsers(x);
            setFilteredUsers(filteredUsers);
        });
    }, [tableState, showStatus]);
    useEffect(() => {
        const activeFilteredUsers = activeUsers.filter((user) =>
            user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.username.toLowerCase().includes(searchTerm.toLowerCase())
        );
        const inactiveFilteredUsers = inactiveUsers.filter((user) =>
            user.firstName.toLowerCase().includes(searchTermInactive.toLowerCase()) ||
            user.lastName.toLowerCase().includes(searchTermInactive.toLowerCase()) ||
            user.username.toLowerCase().includes(searchTermInactive.toLowerCase())
        );
        const filteredUsers = tableState ? activeFilteredUsers : inactiveFilteredUsers;
        setFilteredUsers(filteredUsers);
    }, [searchTerm, searchTermInactive, tableState]);
    const handleRequestSort = (property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };
    useEffect(() => {
        const filteredUsers = tableState ? activeUsers : inactiveUsers;
        setFilteredUsers(filteredUsers);
    }, [tableState]);
    const handleChangePage = (_, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    return (
        <>
            <div id='userContainer'>
                <Layout>
                    <h1 className='flex justify-center text-white p-2'>
                        <span id="welcome" style={{ background: 'rgba(0, 0, 0, 0.5)' }} className='px-4'>
                            Users Admin
                        </span>
                    </h1>
                    <div className="flex items-center justify-center mb-4 ">
                        <NextLink href="/users/add" passHref>
                            <Button id='btngradient' variant="contained" className="mb-2 gradient">
                                <GroupAddIcon /> <span className="ml-2">Add User</span>
                            </Button>
                        </NextLink>
                    </div>
                    <div className="flex justify-center items-center md:mt-0 mt-4">
                        <ButtonGroup
                            disableElevation
                            variant="contained"
                            aria-label="Disabled elevation buttons"
                        >
                            <div className='fondoButtons'>
                                <input id="toggle-on" className="toggle toggle-left" name="toggle" value={tableState} type="radio"
                                    onClick={() => handleChangeTable(true)}
                                    disabled={tableState === true}
                                    checked={tableState === true}
                                />
                                <label for="toggle-on" className="btn labo">Actives</label>
                                <input id="toggle-off" className="toggle toggle-right" name="toggle" value={tableState} type="radio"
                                    onClick={() => handleChangeTable(false)}
                                    disabled={tableState === false}
                                />
                                <label for="toggle-off" className="btn labo">Inactives</label>
                            </div>
                        </ButtonGroup>
                    </div>
                    <div>
                        {tableState == false && (
                            <div>
                                <div className="flex items-center justify-center mb-4 mt-4">
                                    <input
                                        type="text"
                                        placeholder="Search users..."
                                        value={searchTermInactive}
                                        onChange={(e) => setSearchTermInactive(e.target.value)}
                                        className="px-2 py-1 border rounded-md mb-2"
                                    />
                                </div>
                                <div className="overflow-x-auto">
                                    <Paper sx={{
                                        width: '60%', overflow: 'hidden', margin: 'auto', marginBottom: '20px',
                                        '@media (max-width:600px)': {
                                            width: '100%',
                                        },
                                    }}>
                                        <TableContainer style={{ maxHeight: 500, borderRadius: 10 }}>
                                            <Table stickyHeader>
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell id='th'>
                                                            <TableSortLabel
                                                                active={orderBy === 'firstName'}
                                                                direction={orderBy === 'firstName' ? order : 'asc'}
                                                                onClick={() => handleRequestSort('firstName')}
                                                            >
                                                                <span>First Name</span>
                                                            </TableSortLabel>
                                                        </TableCell>
                                                        <TableCell id='th'>
                                                            <TableSortLabel
                                                                active={orderBy === 'lastName'}
                                                                direction={orderBy === 'lastName' ? order : 'asc'}
                                                                onClick={() => handleRequestSort('lastName')}
                                                            >
                                                                <span>Last Name</span>
                                                            </TableSortLabel>
                                                        </TableCell>
                                                        <TableCell id='th'>
                                                            <TableSortLabel
                                                                active={orderBy === 'username'}
                                                                direction={orderBy === 'username' ? order : 'asc'}
                                                                onClick={() => handleRequestSort('username')}
                                                            >
                                                                <span>Username</span>
                                                            </TableSortLabel>
                                                        </TableCell>
                                                        <TableCell id='th'>
                                                            <TableSortLabel
                                                                active={orderBy === 'status'}
                                                                direction={orderBy === 'status' ? order : 'asc'}
                                                                onClick={() => handleRequestSort('status')}
                                                            >
                                                                <span>Status</span>
                                                            </TableSortLabel>
                                                        </TableCell>
                                                        <TableCell></TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {filteredUsers
                                                        ? stableSort(filteredUsers, getComparator(order, orderBy))
                                                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                            .map((user) => (
                                                                <TableRow key={user.id}>
                                                                    <TableCell id='row'>{user.firstName}</TableCell>
                                                                    <TableCell id='row'>{user.lastName}</TableCell>
                                                                    <TableCell id='row'>{user.username}</TableCell>
                                                                    <RowUser
                                                                        user={user}
                                                                        setShowStatus={setShowStatus}
                                                                        showStatus={showStatus}
                                                                    />
                                                                    <TableCell>
                                                                        <NextLink href={`/users/edit/${user.id}`} passHref>
                                                                            <IconButton
                                                                                component={NextLink}
                                                                                href={`/users/edit/${user.id}`}
                                                                                className="bg-blue-500 text-white text-xs rounded-md mr-1 hover:bg-blue-600"
                                                                            >
                                                                                <EditIcon />
                                                                            </IconButton>
                                                                        </NextLink>
                                                                    </TableCell>
                                                                </TableRow>
                                                            ))
                                                        : (
                                                            <TableRow>
                                                                <TableCell colSpan={10} align="center">
                                                                    <CircularProgress />
                                                                </TableCell>
                                                            </TableRow>
                                                        )
                                                    }
                                                    {!users && (
                                                        <TableRow>
                                                            <TableCell colSpan={10} align="center">
                                                                No Users To Display
                                                            </TableCell>
                                                        </TableRow>
                                                    )}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                        <TablePagination
                                            rowsPerPageOptions={[10, 25, 50]}
                                            component="div"
                                            count={users ? users.length : 0}
                                            rowsPerPage={rowsPerPage}
                                            page={page}
                                            onPageChange={handleChangePage}
                                            onRowsPerPageChange={handleChangeRowsPerPage}
                                        />
                                    </Paper>
                                </div>
                            </div>
                        )}
                    </div>
                    {/* Active */}
                    <div>
                        {tableState == true && (
                            <div>
                                <div className="flex items-center justify-center mb-4 mt-4">
                                    <input
                                        type="text"
                                        placeholder="Search users..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="px-2 py-1 border rounded-md mb-2"
                                    />
                                </div>
                                <div className="overflow-x-auto">
                                    <Paper sx={{
                                        width: '60%', overflow: 'hidden', margin: 'auto', marginBottom: '20px',
                                        '@media (max-width:600px)': {
                                            width: '100%',
                                        },
                                    }}>
                                        <TableContainer style={{ maxHeight: 600, borderRadius: 10 }}>
                                            <Table stickyHeader>
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell id='th'>
                                                            <TableSortLabel
                                                                active={orderBy === 'firstName'}
                                                                direction={orderBy === 'firstName' ? order : 'asc'}
                                                                onClick={() => handleRequestSort('firstName')}
                                                            >
                                                                <span className="font-bold">First Name</span>
                                                            </TableSortLabel>
                                                        </TableCell>
                                                        <TableCell id='th'>
                                                            <TableSortLabel
                                                                active={orderBy === 'lastName'}
                                                                direction={orderBy === 'lastName' ? order : 'asc'}
                                                                onClick={() => handleRequestSort('lastName')}
                                                            >
                                                                <span className="font-bold">Last Name</span>
                                                            </TableSortLabel>
                                                        </TableCell>
                                                        <TableCell>
                                                            <TableSortLabel id='th'
                                                                active={orderBy === 'username'}
                                                                direction={orderBy === 'username' ? order : 'asc'}
                                                                onClick={() => handleRequestSort('username')}
                                                            >
                                                                <span className="font-bold">Username</span>
                                                            </TableSortLabel>
                                                        </TableCell>
                                                        <TableCell id='th'>
                                                            <TableSortLabel
                                                                active={orderBy === 'status'}
                                                                direction={orderBy === 'status' ? order : 'asc'}
                                                                onClick={() => handleRequestSort('status')}
                                                            >
                                                                <span className="font-bold">Status</span>
                                                            </TableSortLabel>
                                                        </TableCell>
                                                        <TableCell></TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {filteredUsers
                                                        ? stableSort(filteredUsers, getComparator(order, orderBy))
                                                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                            .map((user) => (
                                                                <TableRow key={user.id}>
                                                                    <TableCell id='row'>{user.firstName}</TableCell>
                                                                    <TableCell id='row'>{user.lastName}</TableCell>
                                                                    <TableCell id='row'>{user.username}</TableCell>
                                                                    <RowUser
                                                                        user={user}
                                                                        setShowStatus={setShowStatus}
                                                                        showStatus={showStatus}
                                                                    />
                                                                    <TableCell>
                                                                        <NextLink href={`/users/edit/${user.id}`} passHref>
                                                                            <IconButton
                                                                                component={NextLink}
                                                                                href={`/users/edit/${user.id}`}
                                                                                className="bg-blue-500 text-white text-xs rounded-md mr-1 hover:bg-blue-600"
                                                                            >
                                                                                <EditIcon />
                                                                            </IconButton>
                                                                        </NextLink>
                                                                    </TableCell>
                                                                </TableRow>
                                                            ))
                                                        : (
                                                            <TableRow>
                                                                <TableCell colSpan={10} align="center">
                                                                    <CircularProgress />
                                                                </TableCell>
                                                            </TableRow>
                                                        )
                                                    }
                                                    {!users && (
                                                        <TableRow>
                                                            <TableCell colSpan={10} align="center">
                                                                No Users To Display
                                                            </TableCell>
                                                        </TableRow>
                                                    )}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                        <TablePagination
                                            rowsPerPageOptions={[10, 25, 50]}
                                            component="div"
                                            count={users ? users.length : 0}
                                            rowsPerPage={rowsPerPage}
                                            page={page}
                                            onPageChange={handleChangePage}
                                            onRowsPerPageChange={handleChangeRowsPerPage}
                                        />
                                    </Paper>
                                </div>
                            </div>
                        )}
                    </div>
                </Layout>
            </div>
        </>
    );
}
