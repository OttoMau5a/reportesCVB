import React from "react";
import { CircularChart } from "components/graphs/CircularChart";
import { CircularMultipleChart } from "components/graphs/CircularMultipleChart";
import { StackBarChart100 } from "components/graphs/StackBarChart100";
import { BarChart } from "components/graphs/BarChart";

function Target(params) {
	const events = params?.events;

	const pageStyle = {
		width: "8.5in",
		height: "11in",
		padding: "0", // Remove padding to ensure the image fills the entire page
		boxSizing: "border-box",
		pageBreakAfter: "always",
		position: "relative",
		overflow: "hidden", // Ensure no content overflows the page
	};

	const coverPageStyle = {
		...pageStyle,
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
	};

	const subTitleStyle = {
		color: "#ffffff",
		fontSize: "38px",
	};

	const eventNameStyle = {
		color: "#302c56",
		fontSize: "50px",
	};

	const chartWrapperStyle = {
		marginTop: "20px",
	};

	const logoStyle = {
		position: "absolute",
		top: "20px",
		left: "20px",
		width: "300px", // Adjust width as needed
		height: "auto", // Maintain aspect ratio
	};

	return (
		<>
			{/* Cover Page */}
			<div style={coverPageStyle}>
				<img
					style={{
						position: "absolute",
						zIndex: "-1",
						width: "100%",
						height: "100%",
						objectFit: "cover", // Ensure the image covers the entire div
					}}
					src="/img/Contenido-21.png"
					alt="portada"
				/>
				<img style={logoStyle} src={events?.Client?.logo} alt="Partner Logo" />
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",
						alignItems: "center",
						marginTop: "11px",
						width: "100%",
					}}
				>
					<br />
					<br />
					<br />
					<br />
					<br />
					<h1 style={subTitleStyle} className="monumentUltraBold">
						Target alcanzado
					</h1>
					<h2 style={eventNameStyle} className="monumentRegular">
						{events?.name}
					</h2>
				</div>
			</div>

			{/* Graphs Page */}
			<div style={{ ...pageStyle, paddingTop: "40px" }}>
				<img
					style={{
						position: "absolute",
						zIndex: "-1",
						width: "100%",
						height: "100%",
						objectFit: "cover", // Ensure the image covers the entire div
					}}
					src="/img/targets.png"
					alt="targets"
				/>
				<br />
				<br />
				<br />
				<div
					style={{
						display: "grid",
						gridTemplateColumns: "repeat(2, 1fr)",
						gridGap: "20px",
						alignItems: "start",
					}}
				>
					<div style={chartWrapperStyle}>
						<CircularChart events={events} />
					</div>
					<div style={chartWrapperStyle}>
						<CircularMultipleChart events={events} />
					</div>

					<br />

					<div style={{ gridColumn: "span 2" }}>
						<StackBarChart100 events={events} />
					</div>

					<div style={{ gridColumn: "span 2" }}>
						<BarChart events={events} />
					</div>
				</div>
			</div>
		</>
	);
}

export { Target };
