import styles from "./Upload.module.scss";
import { useEffect, useState } from "react";
import { getLootInfoKeys, ILootInfo } from "../../models/ILootInfo";
import { Button } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import { api } from "../../api/loot/loot.api";

enum Status {
  IDLE = "idle",
  VALID = "valid",
  INVALID = "invalid",
}

export default function Upload() {
  const [status, setStatus] = useState<Status>(Status.IDLE);
  const [dates, setDates] = useState<string[]>([]);
  const [characters, setCharacters] = useState<string[]>([]);
  const [jsonData, setJsonData] = useState<ILootInfo[]>([]);
  const { getAccessTokenWithPopup, user } = useAuth0();

  useEffect(() => {
    const getUserMetadata = async () => {
      const domain = "dev-qh2nqjcadoxyg0eq.us.auth0.com";
      try {
        const token = await getAccessTokenWithPopup({
          authorizationParams: {
            audience: `https://${domain}/api/v2/`,
            scope: "read:client_credentials",
          },
        });
        // set localstorage token
        if (typeof token === "string") {
          window.localStorage.setItem("token", token);
        }
      } catch (e) {
        console.log(e);
      }
    };
    getUserMetadata().then((r) => r);
  }, [getAccessTokenWithPopup, user?.sub]);

  function isValidJSON(data: any) {
    try {
      JSON.parse(data);
      return true;
    } catch (error) {
      return false;
    }
  }
  function validateJson() {
    const str = document.querySelector("textarea")?.value;
    if (!str) {
      setStatus(Status.IDLE);
      return;
    }
    if (!isValidJSON(str)) {
      setStatus(Status.INVALID);
      return;
    }
    const json = JSON.parse(str);
    if (checkKeyValidity(json)) {
      setStatus(Status.VALID);
      setJsonData(json);
      return;
    } else {
      setStatus(Status.INVALID);
      return;
    }
  }

  function checkKeyValidity(data: unknown[]) {
    const expectedKeys = getLootInfoKeys();

    const valid = data.every((item) => {
      const jsonData = item as ILootInfo;
      // check expectedKeys to make sure that every key in jsonData is in expectedKeys
      const sortedTargetKeys = Object.keys(jsonData).sort((a, b) =>
        a.localeCompare(b)
      );
      const sortedSrcKeys = expectedKeys.sort((a, b) => a.localeCompare(b));
      return JSON.stringify(sortedTargetKeys) === JSON.stringify(sortedSrcKeys);
    });

    function checkDates(data: ILootInfo[]) {
      const listOfDates = data.map((item) => {
        const parts = item.date.split("/");
        const year = parseInt(parts[2]) + 2000; // Assuming two-digit year representation as "23" refers to 2023
        const month = parseInt(parts[0]) - 1; // Months are zero-based (0-11)
        const day = parseInt(parts[1]);
        return new Date(year, month, day);
      });
      // remove duplicate dates
      const uniqueDates = [...new Set(listOfDates)];
      // grab the oldest and newest date
      const oldestDate = uniqueDates.reduce((a, b) => (a < b ? a : b));
      const newestDate = uniqueDates.reduce((a, b) => (a > b ? a : b));
      // if the oldest and newest date are the same, then we have a single date
      if (oldestDate.getTime() === newestDate.getTime()) {
        setDates([oldestDate.toLocaleDateString()]);
      } else {
        setDates([
          oldestDate.toLocaleDateString(),
          newestDate.toLocaleDateString(),
        ]);
      }
    }

    function checkCharacters(data1: ILootInfo[]) {
      const listOfPlayers = data1.map((item) => {
        return item.player;
      });
      // remove duplicate players
      const uniquePlayers = [...new Set(listOfPlayers)];
      setCharacters(uniquePlayers);
    }

    if (valid) {
      checkDates(data as ILootInfo[]);
      checkCharacters(data as ILootInfo[]);
      return true;
    } else {
      return false;
    }
  }

  function formatDates(dates: string[]) {
    if (dates.length === 1) {
      return dates[0];
    } else {
      return `${dates[0]} - ${dates[1]}`;
    }
  }

  function formatPlayers(players: string[]) {
    return (
      <ul>
        {players.map((player) => {
          return <li key={player}>{player}</li>;
        })}
      </ul>
    );
  }

  function postData() {
    api.postLoot(jsonData).then((r) => r);
  }

  function statusIsValidCheck() {
    return status === Status.VALID;
  }

  return (
    <div className={styles.upload}>
      <textarea
        className={styles.field}
        onChange={validateJson}
        placeholder={`Paste RC Loot Council JSON`}
      />
      <div className={"flex-1"}>
        <h1>STATUS: {status}</h1>
        {statusIsValidCheck() ? (
          <div className={styles.details}>
            <h1>Raid Date(s): {formatDates(dates)}</h1>
            <h1>List Of Players: {formatPlayers(characters)}</h1>
          </div>
        ) : null}
      </div>
      <div>
        <Button
          onClick={postData}
          disabled={!statusIsValidCheck()}
          className={"my-5"}
          variant="contained"
        >
          Upload
        </Button>
      </div>
    </div>
  );
}
