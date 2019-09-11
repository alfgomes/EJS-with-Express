const express = require('express') //É o pacote mais simples para criarmos as rotas do nosso app
const faker = require('faker') //Usamos ele para gerar algumas informações aleatórias como Nome, email, imagens. (Útil para testes)
const bodyParser = require('body-parser')
const expressLayouts = require('express-ejs-layouts') //Usamos ele para conseguirmos enviar dados para nossas páginas ejs pelo express.
const app = express()
const port = process.env.PORT || 5000

app.set('view engine', 'ejs')     // É o pacote responsável pela engine EJS (Setamos que nossa engine será o ejs)
app.use(expressLayouts)           // Definimos que vamos utilizar o express-ejs-layouts na nossa aplicação
app.use(bodyParser.urlencoded())  // Com essa configuração, vamos conseguir parsear o corpo das requisições

app.use(express.static(__dirname + '/public'))
app.listen(port, () => {
  console.log(`Server executando em http://localhost:${port}`)
})

app.get('/', (req, res) => {
  res.render('pages/home')
})

app.get('/about', (req, res) => {
  var users = [{
    name: faker.name.findName(),
    email: faker.internet.email(),
    avatar: 'http://placebear.com/300/300'
  }, {
    name: faker.name.findName(),
    email: faker.internet.email(),
    avatar: 'http://placebear.com/400/300'
  }, {
    name: faker.name.findName(),
    email: faker.internet.email(),
    avatar: 'http://placebear.com/500/300'
  }]

  res.render('pages/about', {
    usuarios: users
  })
})

app.get('/contact', (req, res) => {
  res.render('pages/contact')
})

app.post('/contact', (req, res) => {
  //res.status(200).send('Obrigado por entrar em contato conosco, ' + req.body.name + '! Responderemos em breve!')
  let msg = {
    name: req.body.name,
    email: req.body.email,
    text: req.body.message
  }
  
  res.render('pages/contact_resp', {
    message: msg
  })
})