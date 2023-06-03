import styles from "./DateRange.module.scss";
import DateRangeIcon from "@mui/icons-material/DateRange";
import { useEffect, useState } from "react";

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
    <div className={`flex justify-end ${styles.container}`}>
      <div className={styles.range_box}>
        <div className={`mr-3`}>
          {" "}
          <DateRangeIcon />{" "}
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
