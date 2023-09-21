const express = require("express");
const app = express();
const cors = require("cors");
const authRoute = require("./routes/auth");
const animeRouter = require("./routes/anime");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/auth", authRoute);
app.use("/anime", animeRouter);

app.listen(8800, () => {
  console.log("Backend started");
});
