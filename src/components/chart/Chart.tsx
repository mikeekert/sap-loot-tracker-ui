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
import { useEffect, useState } from "react";
import { api } from "../../api/loot/loot.api";
import { ILootInfo } from "../../models/ILootInfo";

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

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
      label: "# of Drops",
      data: [12, 19, 3, 5, 2, 3],
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
      borderWidth: 1,
    },
  ],
};

export const options: ChartOptions = {
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
    },
  },
};

export default function ChartComponent() {
  const [data, setData] = useState<ILootInfo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    const fetchLootData: Promise<ILootInfo[]> = api.getAllLoot<ILootInfo[]>();
    fetchLootData
      .then((res) => {
        setData(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return <Bar data={mockData} options={options} />;
}
