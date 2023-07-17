import axios from "axios";

export async function getAccessToken(convertedArr) {
  const tokenResponse = await axios.post(
    "/auth/get-token",
    {
      code: convertedArr[0],
      state: convertedArr[1],
      challenge: sessionStorage.getItem("codeChallenge"),
    },

    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return tokenResponse;
}

export async function getProfileInfo() {
  return await axios.get("/auth/get-profile-info", {
    params: {
      access_token: sessionStorage.getItem("access_token"),
    },
  });
}

export async function getAnime(searchValue) {
  const animeResponse = await axios.get("/anime/get-anime-list", {
    params: {
      access_token: sessionStorage.getItem("access_token"),
      searchValue,
    },
  });
  return animeResponse;
}
