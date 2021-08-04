require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 4004;
const routers = require("./routers");
const cors = require("cors");

app.use(express.json());

app.use(cors());

app.use("/api", routers);

app.listen(port, (_) => {
    console.log(`http://localhost:${port}`);
});
