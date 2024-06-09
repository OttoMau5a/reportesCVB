import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

function CircularMultipleChart({ events }) {
	const [series, setSeries] = useState([]);
	const [labels, setLabels] = useState([]);
	const [totalCountOut, setTotalCountOut] = useState(0);

	useEffect(() => {
		if (events && events.Targets) {
			const industryTargets = events.Targets.filter((target) => target.TargetType.name === "Industries");

			const sortedData = industryTargets.sort((a, b) => parseInt(b.count) - parseInt(a.count));

			const totalCount = sortedData.reduce((sum, item) => sum + parseInt(item.count), 0);
			setTotalCountOut(totalCount);

			const chartData = sortedData.map((item) => ((parseInt(item.count) / totalCount) * 100).toFixed(2));
			const chartLabels = sortedData.map((item) => item.name);

			setSeries(chartData);
			setLabels(chartLabels);
		}
	}, [events]);

	const colors = ["#295ed3", "#38b6ff", "#5ce1e6", "#6297dd", "#000000"]; // Add more colors if needed

	const options = {
		chart: {
			height: 500,
			type: "radialBar",
			background: "transparent",
			foreColor: "#000", // Ensure text is visible on transparent background
		},
		plotOptions: {
			radialBar: {
				hollow: {
					background: "transparent",
				},
				track: {
					show: true,
					background: "#1c1c1c", // Darker color for the empty part
				},
				dataLabels: {
					name: {
						fontSize: "22px",
					},
					value: {
						fontSize: "16px",
					},
					total: {
						show: true,
						label: "Total",
						formatter: function (w) {
							return totalCountOut;
						},
					},
				},
			},
		},
		labels: labels,
		legend: {
			show: true,
			position: "bottom",
			floating: false,
			fontSize: "14px",
			offsetX: 0,
			offsetY: 0,
		},
		series: series,
		colors: colors,
	};

	return (
		<div className="chartContenedor" style={{ background: "transparent" }}>
			<Chart options={options} series={series} type="radialBar" height={500} />
		</div>
	);
}

export { CircularMultipleChart };
