
import { createRequire } from "module";

const require = createRequire(import.meta.url);

require("dotenv").config();

const express = require("express");

import { Octokit } from "@octokit/rest";

const octokit = new Octokit({
    auth: "ghp_"+"BVEoRQG3oyGnxDYY9Iixg0OAghbPuL3BLZFU",
});

const { data } = octokit.request("/user");

console.log(data);

const app = express();

const port = process.env.PORT || 3000;

app.get("/", function (req, res) {

res.send("Hello, Sinapsel Factory" + data);

});

app.listen(port, () => {

console.info("Application running on http://localhost:3000");

});
