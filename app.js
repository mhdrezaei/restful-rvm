const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const databaseConnection = require("./config/databaseConnection");
const user = require("./routes/user");
const data = require("./routes/data");
const status = require("./routes/status")
const summary = require("./routes/sunmmary")
const setTZ = require("set-tz");
setTZ("Asia/Tehran");
const PORT = process.env.PORT;
databaseConnection();

// parser
// add json body parser
app.use(express.json());
app.use(cookieParser());

// route
app.use("/api/v1/", user);
app.use("/api/v1/", data);
app.use("/api/v1/", status);
app.use("/api/v1/", summary);

const server = app.listen(PORT, () => {
  console.log(`server is running in port ${PORT}`);
});
