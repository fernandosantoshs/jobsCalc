const sqlite3 = require("sqlite3");
const { open } = require("sqlite");

// Quando uma arrow function tem apenas um item em seu escopo, não é necessário envolver a funcao com chaves
//() => { open() } seria () => open()
// assim como ficou abaixo
module.exports = () => open(
    {
    filename: "./database.sqlite",
    driver: sqlite3.Database,
  });
