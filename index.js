require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const router = require("./app/routers");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/", express.static("public"));
app.use("/api", router);

app.listen(port, (_) => {
    console.log(`http://localhost:${port}`);
});
