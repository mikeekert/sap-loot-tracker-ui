import { useEffect, useState } from "react";
import { ILootInfo } from "../../models/ILootInfo";
import ChartComponent from "../../components/chart/Chart";
import styles from "./Chart.page.module.scss";
import { useLoaderData } from "react-router-dom";

export default function ChartPage() {
  const [data, setData] = useState<ILootInfo[]>([]);

  const chartData: ILootInfo[] = useLoaderData() as ILootInfo[];

  useEffect(() => {
    setData(chartData);
  }, [chartData]);

  return (
    <div className={styles.chart_page}>
      <ChartComponent />
    </div>
  );
}
