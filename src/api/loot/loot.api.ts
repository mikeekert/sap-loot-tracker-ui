import { ILootInfo } from "../../models/ILootInfo";

const BASE_URL = "http://localhost:8080/api/sap";

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return await response.json();
}

export const api = {
  async getMockData<T>(): Promise<T> {
    const url = `/json/mock.data.json`;

    const response = await fetch(url);
    return handleResponse<T>(response);
  },

  async getAllLoot<T>(): Promise<T> {
    const url = `${BASE_URL}/`;

    const response = await fetch(url);
    return handleResponse<T>(response);
  },

  async postLoot<T>(data: ILootInfo[]): Promise<T> {
    const url = `${BASE_URL}/sendNewLoot`;
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("No token saved!");
    }

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    return handleResponse<T>(response);
  },
};
