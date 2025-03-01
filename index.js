
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

var PATCH = process.env.PATCH;


var DATA = new Date();

var DIA = DATA.getDate();

var MES = DATA.getMonth();

var ANO = DATA.getFullYear();


var KEY = Base64.encode("Teste4"+DIA+MES+ANO);


var USER = process.env.USER;

var EMAIL = process.env.EMAIL;


var octokit = new Octokit({auth:SHA256,});

try{

(async () => {

const { data: { sha } } = await octokit.request('GET /repos/{owner}/{repo}/contents/{file_path}', {
      owner: ACCOUNT,
      repo: REPOSITORY,
      file_path: PATCH
      });

octokit.repos.createOrUpdateFileContents({
owner:ACCOUNT,
repo:REPOSITORY,
path:PATCH,
message:KEY,
content:KEY,
sha:sha,
committer:{
name:USER,
email:EMAIL,
},
author:{
name:USER,
email:EMAIL,
},

headers: {
    'X-GitHub-Api-Version': '2022-11-28'
  }
});

})();

} catch (e) {

console.log("Erro:"+e);

};


const port = process.env.PORT || 3000;

app.get("/", function (req, res) {

res.send("Hello, Sinapsel Factory" + data);

});

app.listen(port, () => {

console.info("Application running on http://localhost:3000");

});
