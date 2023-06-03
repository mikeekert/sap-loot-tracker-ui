import { useEffect, useState } from "react";
import { ILootInfo } from "../../models/ILootInfo";
import ChartComponent from "../../components/chart/Chart";
import styles from "./Chart.page.module.scss";
import { useLoaderData } from "react-router-dom";
import DateRange from "../../components/date_range/DateRange";

export default function ChartPage() {
  const [data, setData] = useState<ILootInfo[]>([]);
  const chartData: ILootInfo[] = useLoaderData() as ILootInfo[];

  useEffect(() => {
    setData(chartData);
  }, [chartData]);

  function getDateRangeFromData(data: ILootInfo[]) {
    const uniqueDates = [...new Set(data.map((item) => item.date))];
    const dateArray = uniqueDates.map((item) => new Date(item));
    dateArray.sort((a, b) => a.getTime() - b.getTime());
    const firstDate = dateArray[0];
    const lastDate =
      dateArray.length > 1 ? dateArray[dateArray.length - 1] : dateArray[0];
    return { firstDate, lastDate };
  }

  return (
    <div className={styles.chart_page}>
      <div className={styles.chart_container}>
        <div className={styles.chart_header}>
          <DateRange dateRange={getDateRangeFromData(chartData)} />
        </div>
        <div className={styles.chart}>
          <ChartComponent data={data} />
        </div>
      </div>
    </div>
  );
}
