
import { createRequire } from "module";

import { Octokit } from "@octokit/rest";

import { Base64 } from "js-base64";


const require = createRequire(import.meta.url);


const dotenv = require("dotenv");

const express = require("express");


dotenv.config();


var SHA256 = process.env.SHA256;

var ACCOUNT = process.env.ACCOUNT;

var REPOSITORY = process.env.REPOSITORY;

var PATH = process.env.PATH;


var KEY = Base64.encode("Teste2");


var USER = process.env.USER;

var EMAIL = process.env.EMAIL;


var octokit = new Octokit({auth:SHA256,});

try{

(async () => {

const { data: { SHA } } = await octokit.request('GET /repos/{owner}/{repo}/contents/{file_path}', {
      owner: ACCOUNT,
      repo: REPOSITORY,
      file_path: PATH
      });

octokit.repos.createOrUpdateFileContents({
owner:ACCOUNT,
repo:REPOSITORY,
path:PATH,
message:KEY,
content:KEY,
sha:SHA,
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


const app = express();

const port = process.env.PORT || 3000;

app.get("/", function (req, res) {

res.send("Hello, Sinapsel Factory" + data);

});

app.listen(port, () => {

console.info("Application running on http://localhost:3000");

});
