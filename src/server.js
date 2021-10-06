const express = require("express")
const server = express()
const routes = require("./routes")

// Habilitar arquivos static
// funcionalinadade do express para criar todas as rotas para os arquivos public/static, mas não serve para isso sempre, serve para adicionar configuracoes ao server
server.use(express.static("public"))

// rotas
server.use(routes)

server.listen(3000, () => console.log('rodando'))