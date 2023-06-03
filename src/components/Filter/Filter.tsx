import RaidDifficulty from "./RaidDifficulty/RaidDifficulty";
import RollType from "./RollType/RollType";
import ChipDisplay from "./ChipDisplay/ChipDisplay";
import { useAppSelector } from "../../store/hooks";
import styles from "./Filter.module.scss";

export default function Filter() {
  const filters = useAppSelector((state) => state.app.filters);

  return (
    <div className="filter flex flex-col select-none">
      <div>
        <div className={`${styles.chips} flex-wrap mx-4 my-2 flex gap-2`}>
          <ChipDisplay filterData={filters} />
        </div>
      </div>
      <div className={`flex`}>
        <RaidDifficulty />
        <RollType />
      </div>
    </div>
  );
}
