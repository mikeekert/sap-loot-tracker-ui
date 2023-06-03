import styles from "./DateRange.module.scss";
import { useEffect, useState } from "react";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
export default function DateRange({
  dateRange,
}: {
  dateRange: { firstDate: Date; lastDate: Date };
}) {
  const [dates, setDates] = useState<{ firstDate: Date; lastDate: Date }>(
    dateRange
  );

  useEffect(() => {
    setDates(dateRange);
  }, [dateRange, dates]);

  return (
    <div className={`flex items-center justify-end ${styles.container}`}>
      <div className={`mr-3`}>Date Range</div>
      <div className={styles.range_box}>
        <div className={`mr-3`}>
          <EditCalendarIcon />
        </div>
        <div>
          {" "}
          <h1>
            {dates.firstDate.toLocaleDateString()} -{" "}
            {dates.lastDate.toLocaleDateString()}
          </h1>
        </div>
      </div>
    </div>
  );
}
