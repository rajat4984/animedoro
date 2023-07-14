const express = require("express");
const app = express();
const cors = require("cors");
const authRoute = require("./routes/auth");



app.use(express.json());
app.use(cors());
app.use("/auth", authRoute);

app.listen(8800, () => {
  console.log("Backend started");
});
