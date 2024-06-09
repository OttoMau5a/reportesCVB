import { useState, useEffect } from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	CircularProgress,
	IconButton,
	TableSortLabel,
	Button,
	TablePagination,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import { Layout } from "components/events";
import Link from "next/link";
import { eventService } from "services/event.service";
import { RowEvents } from "components/events";
import PrintIcon from "@mui/icons-material/Print";

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
		if (order === "desc") {
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

function Index(event) {
	const [events, setEvents] = useState(null);
	const [orderBy, setOrderBy] = useState("name");
	const [order, setOrder] = useState("asc");
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [searchTerm, setSearchTerm] = useState("");
	const [filteredEvents, setFilteredEvents] = useState(null);
	const [showStatus, setShowStatus] = useState(!!event.status);

	useEffect(() => {}, [showStatus]);

	useEffect(() => {
		eventService.getAll().then((x) => {
			const filteredEvents = x.filter(
				(event) =>
					event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
					(event.status && searchTerm.toLowerCase() === "active") ||
					(!event.status && searchTerm.toLowerCase() === "inactive") ||
					event.Client.name.toLowerCase().includes(searchTerm.toLowerCase())
			);
			setEvents(x);
			setFilteredEvents(filteredEvents);
		});
	}, [searchTerm]);

	const handleRequestSort = (property) => {
		console.log("handlesort", property);
		const isAsc = orderBy === property && order === "asc";
		setOrder(isAsc ? "desc" : "asc");
		setOrderBy(property);
	};

	const handleChangePage = (_, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	return (
		<>
			<div className="tailwind">
				<>
					<h1 className="flex justify-center text-white p-2">
						<span id="welcome" style={{ background: "rgba(0, 0, 0, 0.5)" }} className="px-4">
							Events
						</span>
					</h1>
					<div className="flex items-center justify-center mb-4 ">
						<Link href="/events/add" passHref>
							<Button id="btngradient" variant="contained" className="mb-2 gradient">
								<GroupAddIcon /> <span className="ml-2">Add event</span>
							</Button>
						</Link>
					</div>
					<div className="flex items-center justify-center  mt-4">
						<input
							type="text"
							placeholder="Search events..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className="px-2 py-1 border rounded-md mb-6 mt-2"
						/>
					</div>
					<div className="overflow-x-auto">
						<Paper
							sx={{
								width: "50%",
								overflow: "hidden",
								margin: "auto",
								marginBottom: "20px",
								"@media (max-width:600px)": {
									width: "100%",
								},
							}}
						>
							<TableContainer style={{ maxHeight: 500, borderRadius: 10 }}>
								<Table stickyHeader>
									<TableHead>
										<TableRow>
											<TableCell id="th">
												<TableSortLabel active={orderBy === "name"} direction={orderBy === "name" ? order : "asc"} onClick={() => handleRequestSort("name")}>
													Name
												</TableSortLabel>
											</TableCell>
											<TableCell id="th">
												<TableSortLabel active={orderBy === "status"} direction={orderBy === "status" ? order : "asc"} onClick={() => handleRequestSort("status")}>
													Status
												</TableSortLabel>
											</TableCell>
											<TableCell id="th">
												<TableSortLabel
													active={orderBy === "Client.name"}
													direction={orderBy === "Client.name" ? order : "asc"}
													onClick={() => handleRequestSort("Client.name")}
												>
													Partner
												</TableSortLabel>
											</TableCell>
											<TableCell></TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{filteredEvents ? (
											stableSort(filteredEvents, getComparator(order, orderBy))
												.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
												.map((event) => (
													<TableRow key={event.id}>
														<TableCell id="row">{event.name}</TableCell>
														<TableCell id="row">
															<RowEvents event={event} />
														</TableCell>
														<TableCell id="row">{event.Client.name}</TableCell>
														<TableCell>
															<Link href={`/events/edit/${event.id}`} passHref>
																<IconButton className="bg-blue-500 text-white text-xs rounded-md mr-1 hover:bg-blue-600">
																	<EditIcon />
																</IconButton>
															</Link>
															<Link href={`/reports/print/${event.id}`} passHref>
																<IconButton className="bg-blue-500 text-white text-xs rounded-md mr-1 hover:bg-blue-600">
																	<PrintIcon />
																</IconButton>
															</Link>
														</TableCell>
													</TableRow>
												))
										) : (
											<TableRow>
												<TableCell colSpan={4} align="center">
													<CircularProgress />
												</TableCell>
											</TableRow>
										)}
										{!events && (
											<TableRow>
												<TableCell colSpan={4} align="center">
													No events To Display
												</TableCell>
											</TableRow>
										)}
									</TableBody>
								</Table>
							</TableContainer>
							<TablePagination
								rowsPerPageOptions={[10, 25, 50]}
								component="div"
								count={events ? events.length : 0}
								rowsPerPage={rowsPerPage}
								page={page}
								onPageChange={handleChangePage}
								onRowsPerPageChange={handleChangeRowsPerPage}
							/>
						</Paper>
					</div>
				</>
			</div>
		</>
	);
}

export default Index;
