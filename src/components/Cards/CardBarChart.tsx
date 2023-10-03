import React, { useEffect, createRef } from "react";
import Chart, { ChartConfiguration } from "chart.js/auto";

export default function CardBarChart() {
    useEffect(() => {
        let config: ChartConfiguration = {
            type: "bar",
            data: {
                labels: [
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                ],
                datasets: [
                    {
                        label: String(new Date().getFullYear()),
                        backgroundColor: "#ed64a6",
                        borderColor: "#ed64a6",
                        data: [30, 78, 56, 34, 100, 45, 13],
                        fill: false,
                        barThickness: 8,
                    },
                    {
                        label: String(new Date().getFullYear() - 1),
                        fill: false,
                        backgroundColor: "#4c51bf",
                        borderColor: "#4c51bf",
                        data: [27, 68, 86, 74, 10, 4, 87],
                        barThickness: 8,
                    },
                ],
            },
            options: {
                maintainAspectRatio: false,
                responsive: true,
                plugins: {
                    title: {
                        display: false,
                        text: "Orders Chart",
                    },
                    tooltip: {
                        mode: "index",
                        intersect: false,
                    },
                    legend: {
                        align: "end",
                        position: "bottom",
                    },
                },
                scales: {
                    x: {
                        display: false,
                        title: {
                            display: true,
                            text: "Month",
                        },
                        grid: {
                            color: "rgba(33, 37, 41, 0.3)",
                        },
                    },
                    y: {
                        display: true,
                        title: {
                            display: false,
                            text: "Value",
                        },
                        grid: {
                            color: "rgba(33, 37, 41, 0.2)",
                        },
                    },
                },
            },
        };
    }, []);

    return (
        <>
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
                    <div className="flex flex-wrap items-center">
                        <div className="relative w-full max-w-full flex-grow flex-1">
                            <h6 className="uppercase text-blueGray-400 mb-1 text-xs font-semibold">
                                Performance
                            </h6>
                            <h2 className="text-blueGray-700 text-xl font-semibold">
                                Total orders
                            </h2>
                        </div>
                    </div>
                </div>
                <div className="p-4 flex-auto">
                    {/* Chart */}
                    <div className="relative h-350-px">
                        <canvas id="bar-chart"></canvas>
                    </div>
                </div>
            </div>
        </>
    );
}
