
import { createRequire } from "module";

import { Octokit } from "@octokit/rest";

import { Base64 } from "js-base64";


const require = createRequire(import.meta.url);


const dotenv = require("dotenv");

const express = require("express");


dotenv.config();


const app = express();


var SHA256 = process.env.SHA256;

var ACCOUNT = process.env.ACCOUNT;

var REPOSITORY = process.env.REPOSITORY;

var PATH = process.env.PATH;

console.log(SHA256);

console.log(ACCOUNT);


const port = process.env.PORT || 3000;

app.get("/", function (req, res) {

res.send("Hello, Sinapsel Factory" + data);

});

app.listen(port, () => {

console.info("Application running on http://localhost:3000");

});
