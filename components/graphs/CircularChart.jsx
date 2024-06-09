import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

function CircularChart({ events }) {
	const [data, setData] = useState([]);
	const colors = ["#295ed3", "#38b6ff", "#5ce1e6", "#6297dd"]; // Add more colors if needed

	useEffect(() => {
		if (events && events.Targets) {
			const industryTargets = events.Targets.filter((target) => target.TargetType.name === "Industries");

			const totalTargetsCount = industryTargets.reduce((total, item) => total + parseInt(item.count), 0);

			const sortedData = industryTargets.sort((a, b) => parseInt(b.count) - parseInt(a.count));

			const chartData = sortedData.map((item) => ({
				name: item.name,
				count: parseInt(item.count),
				total: totalTargetsCount,
			}));

			setData(chartData);
		}
	}, [events]);

	return (
		<>
			<div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "20px" }}>
				{data.map((item, index) => {
					const chartOptions = {
						series: [((item.count / item.total) * 100).toFixed(2)],
						chart: {
							height: 200,
							type: "radialBar",
							background: "transparent",
						},
						plotOptions: {
							radialBar: {
								hollow: {
									size: "70%",
									background: "transparent",
								},
								track: {
									show: true,
									background: "#1c1c1c", // Darker color for the empty part
								},
								dataLabels: {
									name: {
										color: "#000000",
									},
									value: {
										color: "#000000",
									},
								},
							},
						},
						labels: [item.name],
						colors: [colors[index % colors.length]],
					};

					return (
						<div key={index}>
							<ReactApexChart options={chartOptions} series={chartOptions.series} type="radialBar" height={200} />
						</div>
					);
				})}
			</div>
		</>
	);
}

export { CircularChart };
