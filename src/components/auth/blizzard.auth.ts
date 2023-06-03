import { BnetToken } from "../../App";

export default async function fetchAccessToken(): Promise<BnetToken> {
  // TODO - move to .env
  const url = "https://oauth.battle.net/token";
  const client_id = "beb2fa57ad5c4c439aa10c74f35b3ed2";
  const client_secret = "2oftWBe7x5UTbDhBpRQ0Fdkc4o5A7LN7";
  const data = {
    grant_type: "client_credentials",
  };

  const dataX = new URLSearchParams(data);
  //create basic auth header base64 encoded string
  const bAuthBase64 = btoa(`${client_id}:${client_secret}`);

  const tokenFetch = await fetch(url, {
    method: "POST",
    body: dataX,
    headers: {
      ContentType: "application/x-www-form-urlencoded",
      Authorization: `Basic ${bAuthBase64}`,
    },
  });
  return await tokenFetch.json();
}
