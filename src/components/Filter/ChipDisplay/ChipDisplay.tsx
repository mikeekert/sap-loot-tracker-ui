import { Chip } from "@mui/material";
import { useEffect, useState } from "react";
import {
  AppFilters,
  RaidDifficultyEnum,
  RollTypeEnum,
  setRaidDifficulty,
  setRType,
} from "../../../store/appSlice";
import { useAppDispatch } from "../../../store/hooks";

export default function ChipDisplay({
  filterData,
}: {
  filterData: AppFilters;
}) {
  const [chipArray, setChipArray] = useState<ChipArrayItem[]>([]);
  const dispatch = useAppDispatch();

  function handleDelete(chip: ChipArrayItem) {
    console.log(chip);
    if (chip.filter === "raidDifficulty") {
      dispatch(
        setRaidDifficulty({
          ...filterData.raidDifficulty,
          [chip.value]: false,
        })
      );
    }
    if (chip.filter === "rollType") {
      dispatch(
        setRType({
          ...filterData.rollType,
          [chip.value]: false,
        })
      );
    }
  }

  enum ChipLabelEnum {
    raidDifficulty = "Difficulty:",
    rollType = "Roll:",
  }

  type ChipArrayItem = {
    label: ChipLabelEnum;
    value: string;
    filter: "raidDifficulty" | "rollType";
  };

  function createChipData(key: string, subkey: keyof typeof ChipLabelEnum) {
    const label = ChipLabelEnum[subkey];
    const value = key;
    const filter: keyof typeof ChipLabelEnum = subkey;
    return { label, value, filter };
  }

  function addChips(filters: AppFilters) {
    const chipArray: ChipArrayItem[] = [];
    Object.keys(filters).forEach((key) => {
      if (filters[key as keyof AppFilters]) {
        Object.keys(filters[key as keyof AppFilters]).forEach((subKey) => {
          const valueIsTrue = filters[key as keyof AppFilters][subKey as any];
          if (valueIsTrue) {
            chipArray.push(
              createChipData(subKey, key as keyof typeof ChipLabelEnum)
            );
          }
        });
      }
    });
    setChipArray(chipArray);
  }

  useEffect(() => {
    addChips(filterData);
    console.log(filterData);
  }, [filterData]);

  function chipLabel(chip: ChipArrayItem) {
    let suffix: any;
    if (chip.filter === "raidDifficulty") {
      suffix =
        RaidDifficultyEnum[chip.value as keyof typeof RaidDifficultyEnum];
    } else {
      suffix = RollTypeEnum[chip.value as keyof typeof RollTypeEnum];
    }
    return `${chip.label} ${suffix}`;
  }

  return (
    <>
      {chipArray.map((chip) => {
        return (
          <Chip
            key={chip.label + chip.value}
            size={"small"}
            onDelete={() => handleDelete(chip)}
            color={"primary"}
            label={chipLabel(chip)}
          />
        );
      })}
    </>
  );
}
