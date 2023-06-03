import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
} from "@mui/material";
import { ChangeEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { AppDispatch } from "../../../store/store";
import { RollTypeEnum, setRType } from "../../../store/appSlice";

export default function RollType() {
  const dispatch: AppDispatch = useAppDispatch();
  const rollTypeObj = useAppSelector((state) => state.app.filters.rollType);
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(
      setRType({
        ...rollTypeObj,
        [event.target.value]: event.target.checked,
      })
    );
  };

  return (
    <>
      <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
        <FormLabel sx={{ color: "white" }} component="legend">
          Roll Type Selected
        </FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={rollTypeObj[RollTypeEnum.BIS]}
                onChange={handleChange}
                value={RollTypeEnum.BIS}
              />
            }
            label="BIS"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={rollTypeObj[RollTypeEnum.UPGRADE]}
                onChange={handleChange}
                value={RollTypeEnum.UPGRADE}
              />
            }
            label="Upgrade"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={rollTypeObj[RollTypeEnum.FLEX]}
                onChange={handleChange}
                value={RollTypeEnum.FLEX}
              />
            }
            label="Flex"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={rollTypeObj[RollTypeEnum.TRANSMOG]}
                onChange={handleChange}
                value={RollTypeEnum.TRANSMOG}
              />
            }
            label="Transmog"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={rollTypeObj[RollTypeEnum.TIER]}
                onChange={handleChange}
                value={RollTypeEnum.TIER}
              />
            }
            label="Tier"
          />
        </FormGroup>
      </FormControl>
    </>
  );
}
