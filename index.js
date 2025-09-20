
import { createRequire } from "module";

import { Octokit } from "@octokit/rest";

import { Base64 } from "js-base64";


const require = createRequire(import.meta.url);


const dotenv = require("dotenv");

const express = require("express");


dotenv.config();


const app = express();


function generateRandomNumericKey(length = 12) {

let key = '';

for (let i = 0; i < length; i++) {

key += Math.floor(Math.random() * 10);

}

return key;

}

function generateAndPushKey() {

var SHA256 = process.env.SHA256;

var ACCOUNT = process.env.ACCOUNT;

var REPOSITORY = process.env.REPOSITORY;

var PATCH = process.env.PATCH;

var USER = process.env.USER;

var EMAIL = process.env.EMAIL;

const KEY = generateRandomNumericKey(12);

var octokit = new Octokit({auth:SHA256,});

(async () => {

try{

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

console.log("✅ KEY numérica atualizada com sucesso:", KEY);

} catch (e) {

console.error("❌ Erro ao atualizar KEY:", e);

}

})();

}

function scheduleDailyTaskAtHour(taskFunction, targetHour = 11) {

const now = new Date();

const nextRun = new Date();

nextRun.setHours(targetHour, 0, 0, 0);

if (now >= nextRun) {

nextRun.setDate(nextRun.getDate() + 1);

}

const msUntilNextRun = nextRun - now;

console.log(`⏳ Aguardando ${(msUntilNextRun / 1000 / 60).toFixed(2)} minutos até a primeira execução às ${targetHour}:00`);

setTimeout(() => {

taskFunction();

setInterval(taskFunction, 24 * 60 * 60 * 1000);

}, msUntilNextRun);

}

scheduleDailyTaskAtHour(generateAndPushKey, 11);

const port = process.env.PORT || 3000;

app.get("/", function (req, res) {

res.send("✅ Aplicação Sinapsel Factory está rodando!");

});

app.listen(port, () => {

console.info(`🚀 Aplicação rodando em http://localhost:${port}`);

});
