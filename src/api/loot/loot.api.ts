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
    const url = `${BASE_URL}/getAllLoot`;

    const response = await fetch(url);
    return handleResponse<T>(response);
  },

  async postLoot<T>(data: ILootInfo[]): Promise<T> {
    const url = `${BASE_URL}/sendNewLoot`;
    const jwtToken = localStorage.getItem("token");
    const bnetAccessToken = localStorage.getItem("bnet_token");

    // get Item Media from Wow API
    for (let i = 0; i < data.length; i++) {
      const itemMediaUrl = `https://us.api.blizzard.com/data/wow/media/item/${data[i].itemID}?namespace=static-us&locale=en_US`;
      const itemMediaResponse = await fetch(itemMediaUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${bnetAccessToken}`,
        },
      });
      const itemMedia = await itemMediaResponse.json();
      data[i].itemMedia = itemMedia.assets[0].value;
    }

    if (!jwtToken) {
      throw new Error("No token saved!");
    }

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(data),
    });

    return handleResponse<T>(response);
  },
};
