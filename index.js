const express = require('express')
const nunjucks = require('nunjucks')

const app = express()
app.use(express.urlencoded({ extended: false }))

nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
})
app.set('view engine', 'njk')

const middleware = (req, res, next) => {
  const { idade } = req.query
  if (!idade) {
    return res.redirect('/')
  }
  return next()
}

app.get('/', (req, res) => {
  return res.render('input-age')
})

app.post('/check', (req, res) => {
  const idade = req.body.idade
  if (idade >= 18) {
    return res.redirect(`/major?idade=${idade}`)
  } else {
    return res.redirect(`/minor?idade=${idade}`)
  }
})

app.get('/major', middleware, (req, res) => {
  const { idade } = req.query
  return res.render('major', { idade })
})

app.get('/minor', middleware, (req, res) => {
  const { idade } = req.query
  return res.render('minor', { idade })
})

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000')
})
