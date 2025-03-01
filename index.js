
import { createRequire } from "module";

import { Octokit } from "@octokit/rest";

import { Base64 } from "js-base64";


const require = createRequire(import.meta.url);


const dotenv = require("dotenv");

const express = require("express");


dotenv.config();


var SHA256 = process.env.SHA256;

var A = "th022";

var R = "Key";

var P = "Key";

var S = Base64.encode("Teste1");

var octokit = new Octokit({auth:SHA256,});

try{


(async () => {

const { data: { sha } } = await octokit.request('GET /repos/{owner}/{repo}/contents/{file_path}', {
      owner: A,
      repo: R,
      file_path: P
    });

octokit.repos.createOrUpdateFileContents({
owner:A,
repo:R,
path:P,
message:S,
content:S,
sha:sha,
committer:{
name:"th022",
email:"meunumerofake2026@gmail.com",
},
author:{
name:"th022",
email:"meunumerofake2026@gmail.com",
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
