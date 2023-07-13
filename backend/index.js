const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http");
const axios = require("axios");

app.use(express.json());
app.use(cors());

const clientId = "efd12eddf9ac6e53f771819ecc4da173";
const clientSecret =
  "b81b2c83a0e3f772322f874d463ae0de59fe97216d1e687f66290286f2860ff2";

// request for getting code and state from mal servers

app.get("/anime-proxy", async (req, res) => {
  try {
    const response = http.get(
      `http://myanimelist.net/v1/oauth2/authorize?response_type=code&client_id=${clientId}&code_challenge=${req.query.challenge}&state=RequestID42`,
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*", // Replace '*' with the appropriate origin URL if known
        },
      }
    );
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
  }
});

app.post("/get-token", async (req, res) => {
    try {
    const params = {
      client_id: `${clientId}`,
      client_secret: `${clientSecret}`,
      code: `${req.body.code}`,
      code_verifier: `${req.body.challenge}`,
      grant_type: "authorization_code",
    };

    const formData = new URLSearchParams();

    for (const key in params) {
      formData.append(key, params[key]);
    }

    const response = await axios.post(
      "https://myanimelist.net/v1/oauth2/token",
      formData.toString(),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );
    res.status(200).json(response.data)
  } catch (error) {
    console.log(error);
  }
});

// request for getting token using the code got in above request

app.listen(8800, () => {
  console.log("Backend started");
});
