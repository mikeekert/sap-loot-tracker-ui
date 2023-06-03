import { Bar } from "react-chartjs-2";
import {
  BarElement,
  CategoryScale,
  Chart,
  ChartData,
  ChartOptions,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { ILootInfo } from "../../models/ILootInfo";
import { useEffect, useState } from "react";

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
Chart.defaults.color = "#fff";

const mockData: ChartData<"bar"> = {
  labels: [
    "player a",
    "player b",
    "player c",
    "player d",
    "player e",
    "player f",
  ],
  datasets: [
    {
      label: "# of Drops for Player",
      data: [12, 19, 3, 5, 2, 3],
      borderColor: "rgb(35,35,35)",
      backgroundColor: "rgba(0,0,0,0.5)",
      borderWidth: 1,
    },
  ],
};

export const options: ChartOptions<"bar"> = {
  scales: {
    x: {
      title: {
        display: true,
        text: "Player Drop count",
      },
    },
  },
  indexAxis: "y" as const,
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: "SAP Loot Chart",
      color: "white",
    },
  },
};

export default function ChartComponent({ data }: { data: ILootInfo[] }) {
  const [lootData, setLootData] = useState<ILootInfo[]>([]);
  useEffect(() => {
    setLootData(data);
  }, [data, lootData]);

  return <Bar data={mockData} options={options} />;
}
