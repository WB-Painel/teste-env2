
import { createRequire } from "module";

const require = createRequire(import.meta.url);

require("dotenv").config();

const express = require("express");

import { Octokit } from "@octokit/rest";

/*const octokit = new Octokit({
    auth: "ghp_"+"BVEoRQG3oyGnxDYY9Iixg0OAghbPuL3BLZFU",
});*/

var sha = "ghp_"+"BVEoRQG3oyGnxDYY9Iixg0OAghbPuL3BLZFU";
var A = "th022";
var R = "Key";
var P = "Key";

var octokit = new Octokit({});

try{

(async () => {

const { data: { sha } } = await octokit.request('GET /repos/{owner}/{repo}/contents/{file_path}', {
owner: A,
repo: R,
file_path: P
});

SHA = sha;
console.log("$"+SHA);

})();

} catch (e) {

};


const app = express();

const port = process.env.PORT || 3000;

app.get("/", function (req, res) {

res.send("Hello, Sinapsel Factory" + data);

});

app.listen(port, () => {

console.info("Application running on http://localhost:3000");

});
