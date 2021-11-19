const express = require("express")
const server = express()
const routes = require("./routes")
const path = require("path")

//Setando como view engine (template engine) o ejs. O express já espera essa config pelo comando abaixo, para trabalhar com a engine.
server.set('view engine', 'ejs')

// Mudar o local da pasta views
server.set('views', path.join(__dirname, 'views'))

// Habilitar arquivos static
// funcionalinadade do express para criar todas as rotas para os arquivos public/static, mas não serve para isso sempre, serve para adicionar configuracoes ao server
server.use(express.static("public"))

// Habilitar req.body . Por padrão o express não deixar acessar o corpo da requisição
server.use(express.urlencoded( { extended: true }))
// rotas
server.use(routes)

server.listen(3000, () => console.log('rodando'))