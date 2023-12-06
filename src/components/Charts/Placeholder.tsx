import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    Tooltip,
    PointElement,
    LineElement,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip
);

export function Placeholder() {
    return (
        <Line
            data={{
                labels: [
                    "Sprint 20",
                    "Sprint 21",
                    "Sprint 22",
                ],
                datasets: [
                    {
                        data: [130.5, 135.75, 136.75],
                        backgroundColor: "yellow",
                    },
                    {
                        data: [129.5, 132.75, 135.75],
                        backgroundColor: "green",
                    },
                ],
            }}
        />
    );
}
