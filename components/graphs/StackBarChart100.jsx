import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

function StackBarChart100({ events }) {
	const [series, setSeries] = useState([]);
	const [categories, setCategories] = useState([]);

	useEffect(() => {
		if (events && events.Targets) {
			const assistantTargets = events.Targets.filter((target) => target.TargetType.name === "AssistantProfile");

			const totalTargetsCount = assistantTargets.reduce((total, item) => total + parseInt(item.count), 0);

			const chartData = assistantTargets.map((item) => ({
				name: item.name,
				data: [(parseInt(item.count) / totalTargetsCount) * 100],
			}));

			setSeries(chartData);
			setCategories(["Assistant Profile"]);
		}
	}, [events]);

	const options = {
		chart: {
			type: "bar",
			height: 200, // Adjusted height
			stacked: true,
			stackType: "100%",
			background: "transparent",
		},
		plotOptions: {
			bar: {
				horizontal: true,
				borderRadius: 10, // Rounded edges
				barHeight: "30%", // Reduce the bar height
			},
		},
		xaxis: {
			categories: categories,
			labels: {
				show: false, // Hide the numbers at the bottom
			},
		},
		fill: {
			opacity: 1,
		},
		legend: {
			position: "bottom",
			horizontalAlign: "center",
			offsetX: 0,
			offsetY: 0,
		},
		colors: ["#295ed3", "#38b6ff", "#5ce1e6", "#6297dd"], // Add more colors if needed
	};

	return (
		<div id="chart">
			<ReactApexChart options={options} series={series} type="bar" height={200} />
		</div>
	);
}

export { StackBarChart100 };
