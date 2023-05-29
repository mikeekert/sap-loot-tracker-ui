import { Pie } from "react-chartjs-2";
import {
  ArcElement,
  Chart as ChartJS,
  ChartData,
  Legend,
  Tooltip,
} from "chart.js";
import { useEffect, useState } from "react";
import { api, ILootInfo } from "../../api/loot/loot.api";

ChartJS.register(ArcElement, Tooltip, Legend);

const mockData: ChartData<"pie"> = {
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
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
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return <Pie data={mockData} />;
}
