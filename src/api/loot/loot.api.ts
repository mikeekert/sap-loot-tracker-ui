import { ILootInfo } from "../../models/ILootInfo";

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
