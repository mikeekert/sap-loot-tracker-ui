import { ILootInfo } from "../../models/ILootInfo";
import styles from "./WowItemIcon.module.scss";
import Card from "@mui/material/Card";
import { Fragment } from "react";
import { Box, CardContent } from "@mui/material";

export default function WowItemIcon({ item }: { item: ILootInfo }) {
  const card = (
    <Fragment>
      <CardContent className={styles.loot_container}>
        <div className={styles.h}>
          <span className={`q4 ${styles.label}`}>{item.itemName}</span>
          <div className={`${styles.difficulty} mb-4`}>Mythic</div>
        </div>
        <div
          className={`flex flex-row align-middle gap-3 ${styles.loot_panel}`}
        >
          <img
            src={item.itemMedia}
            alt={item.itemName}
            className={`${styles.icon}`}
          />
        </div>
      </CardContent>
    </Fragment>
  );
  return (
    <>
      <Box sx={{ minWidth: 275 }} className="m-5">
        <Card variant="outlined" className={styles.loot_card}>
          {card}
        </Card>
      </Box>
    </>
  );
}
