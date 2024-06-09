import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

function BarChart({ events }) {
	const [series, setSeries] = useState([]);
	const [options, setOptions] = useState({
		chart: {
			type: "bar",
			height: 150,
		},
		plotOptions: {
			bar: {
				borderRadius: 5,
				horizontal: true,
			},
		},
		dataLabels: {
			enabled: true,
			formatter: function (val) {
				return val.toFixed(2) + "%";
			},
		},
		xaxis: {
			categories: [],
			labels: {
				show: false, // Hide the numbers at the bottom
			},
		},
	});

	useEffect(() => {
		if (events && events.Targets) {
			const assistantTargets = events.Targets.filter((target) => target.TargetType.name === "AssistantProfile");

			const totalCount = assistantTargets.reduce((total, item) => total + parseInt(item.count), 0);

			const chartData = assistantTargets.map((item) => ({
				name: item.name,
				value: (parseInt(item.count) / totalCount) * 100,
			}));

			// Sort chart data by value in descending order
			chartData.sort((a, b) => b.value - a.value);

			const sortedValues = chartData.map((item) => item.value);
			const sortedCategories = chartData.map((item) => item.name);

			setSeries([{ data: sortedValues }]);
			setOptions((prevOptions) => ({
				...prevOptions,
				xaxis: {
					...prevOptions.xaxis,
					categories: sortedCategories,
				},
			}));
		}
	}, [events]);

	return (
		<div>
			<div id="chart">
				<ReactApexChart options={options} series={series} type="bar" height={150} />
			</div>
		</div>
	);
}

export { BarChart };
