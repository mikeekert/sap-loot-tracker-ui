export interface ILootInfo {
  player: string;
  date: string;
  time: string;
  id: string;
  itemID: number;
  itemString: string;
  response: string;
  votes: number;
  class: string;
  instance: string;
  boss: string;
  gear1: string;
  gear2: string;
  responseID: string;
  isAwardReason: string;
  rollType: string;
  subType: string;
  equipLoc: string;
  note: string;
  owner: string;
  itemName: string;
}

export function getLootInfoKeys() {
  return [
    "player",
    "date",
    "time",
    "id",
    "itemID",
    "itemString",
    "response",
    "votes",
    "class",
    "instance",
    "boss",
    "gear1",
    "gear2",
    "responseID",
    "isAwardReason",
    "rollType",
    "subType",
    "equipLoc",
    "note",
    "owner",
    "itemName",
  ];
}
