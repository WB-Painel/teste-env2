//1
import { createRequire } from "module";
import { Octokit } from "@octokit/rest";
import { Base64 } from "js-base64";
import cron from "node-cron";

const require = createRequire(import.meta.url);

const dotenv = require("dotenv");
const express = require("express");

dotenv.config();

const app = express();

console.log(
  "Horário atual Brasil:",
  new Date().toLocaleString("pt-BR", {
    timeZone: "America/Sao_Paulo"
  })
);

// =====================
// GERADOR DE KEY
// =====================
function generateRandomNumericKey(length = 12) {
  let key = "";
  for (let i = 0; i < length; i++) {
    key += Math.floor(Math.random() * 10);
  }
  return key;
}

// =====================
// ENVIO PARA GITHUB
// =====================
async function generateAndPushKey() {
  try {
    const {
      SHA256,
      ACCOUNT,
      REPOSITORY,
      PATCH,
      USER,
      EMAIL
    } = process.env;

    const KEY = generateRandomNumericKey(256);
    const EncodedKEY = Base64.encode(KEY);

    const octokit = new Octokit({ auth: SHA256 });

    const { data: { sha } } = await octokit.request(
      "GET /repos/{owner}/{repo}/contents/{file_path}",
      {
        owner: ACCOUNT,
        repo: REPOSITORY,
        file_path: PATCH
      }
    );

    await octokit.repos.createOrUpdateFileContents({
      owner: ACCOUNT,
      repo: REPOSITORY,
      path: PATCH,
      message: KEY,
      content: EncodedKEY,
      sha,
      committer: {
        name: USER,
        email: EMAIL
      },
      author: {
        name: USER,
        email: EMAIL
      },
      headers: {
        "X-GitHub-Api-Version": "2022-11-28"
      }
    });

    console.log("✅ KEY atualizada:", KEY);
  } catch (e) {
    console.error("❌ Erro ao atualizar KEY:", e);
  }
}

// =====================
// AGENDAMENTO BRASIL
// =====================
cron.schedule(
  "0 8,13,18,23 * * *",
  () => {
    console.log(
      "⏰ Executando geração de KEY:",
      new Date().toLocaleString("pt-BR", {
        timeZone: "America/Sao_Paulo"
      })
    );

    generateAndPushKey();
  },
  {
    timezone: "America/Sao_Paulo"
  }
);

// =====================
// EXPRESS (HEROKU)
// =====================
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("✅ Aplicação rodando com scheduler BR!");
});

app.listen(port, () => {
  console.log(`🚀 Servidor ativo na porta ${port}`);
});

/*import { createRequire } from "module";

import { Octokit } from "@octokit/rest";

import { Base64 } from "js-base64";


const require = createRequire(import.meta.url);


const dotenv = require("dotenv");

const express = require("express");


dotenv.config();


const app = express();

console.log('Horário atual no servidor (UTC):', new Date().toISOString());


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

const KEY = generateRandomNumericKey(256);

const EncodedKEY = Base64.encode(KEY);

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
content:EncodedKEY,
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

}*/

/*function scheduleDailyTaskAtHour(taskFunction, targetHour = 0) {

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

setInterval(taskFunction, 12 * 60 * 60 * 1000);

}, msUntilNextRun);

}*/
/*
//scheduleDailyTaskAtHour(generateAndPushKey, 0);

function scheduleDailyTasks(taskFunction, hours = []) {

function scheduleNextRun(hour) {

const now = new Date();
  
const nextRun = new Date();

nextRun.setHours(hour, 0, 0, 0);

if (now >= nextRun) {

nextRun.setDate(nextRun.getDate() + 1);

}

const delay = nextRun - now;

console.log(`⏳ Próxima execução às ${hour}:00 em ${(delay/1000/60).toFixed(2)} min`);

setTimeout(() => {

taskFunction();

scheduleNextRun(hour); // reagenda pro próximo dia

}, delay);

}

hours.forEach(scheduleNextRun);

}

scheduleDailyTasks(generateAndPushKey, [8, 13, 18, 23]);

const port = process.env.PORT || 3000;

app.get("/", function (req, res) {

res.send("✅ Aplicação Sinapsel Factory está rodando!");

});

app.listen(port, () => {

console.info(`🚀 Aplicação rodando em http://localhost:${port}`);

});*/
