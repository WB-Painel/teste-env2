import { createRequire } from "module";

const require = createRequire(import.meta.url);

require("dotenv").config();

const express = require("express");

const app = express();

const port = process.env.PORT || 3000;

app.get("/", function (req, res) {

res.send("Hello, Sinapsel Factory");

});

app.listen(port, () => {

console.info("Application running on http://localhost:3000");

});
