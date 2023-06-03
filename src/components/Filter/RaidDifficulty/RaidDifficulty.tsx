import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
} from "@mui/material";
import { ChangeEvent } from "react";
import { AppDispatch } from "../../../store/store";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { RaidDifficultyEnum, setRaidDifficulty } from "../../../store/appSlice";

export default function RaidDifficulty() {
  const dispatch: AppDispatch = useAppDispatch();
  const raidTypeObj = useAppSelector(
    (state) => state.app.filters.raidDifficulty
  );
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(
      setRaidDifficulty({
        ...raidTypeObj,
        [event.target.value]: event.target.checked,
      })
    );
  };

  return (
    <>
      <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
        <FormLabel sx={{ color: "white" }} component="legend">
          Raid Difficulty
        </FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={raidTypeObj[RaidDifficultyEnum.NORMAL]}
                onChange={handleChange}
                value={RaidDifficultyEnum.NORMAL}
              />
            }
            label="Normal"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={raidTypeObj[RaidDifficultyEnum.HEROIC]}
                onChange={handleChange}
                value={RaidDifficultyEnum.HEROIC}
              />
            }
            label="Heroic"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={raidTypeObj[RaidDifficultyEnum.MYTHIC]}
                onChange={handleChange}
                value={RaidDifficultyEnum.MYTHIC}
              />
            }
            label="Mythic"
          />
        </FormGroup>
      </FormControl>
    </>
  );
}
