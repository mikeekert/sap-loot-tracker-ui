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

const BASE_URL = "http://localhost:8080/api/sap";

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return await response.json();
}

export const api = {
  async getAllLoot<T>(): Promise<T> {
    const url = `${BASE_URL}/`;

    const response = await fetch(url);
    return handleResponse<T>(response);
  },

  async postLoot<T>(data: ILootInfo[]): Promise<T> {
    const url = `${BASE_URL}/sendNewLoot`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return handleResponse<T>(response);
  },
};
