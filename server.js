const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const environment = process.env.NODE_ENV || 'development'
const configuration = require('./knexfile')[environment]
const database = require('knex')(configuration)

app.use(function(request, response, next){
  response.header("Access-Control-Allow-Origin", "*")
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.set('port', process.env.PORT || 3000)

app.get('/', (request, response) => {
  response.send('Welcome to the garage bin!')
})

app.get('/api/items', (request, response) => {
  database('items').select()
  .then((items) => {
    response.status(200).json(items)
  })
  .catch((error) => {
    console.error('Something is wrong with the database')
  })
})

app.post('/api/items', (request, response) => {
  const { name } = request.body
  const item  = { name }
  database('items').insert(item)
  .then(() => {
    database('items').select()
      .then((items) => {
        res.status(200).json(items)
      })
      .catch((error) => {
        console.error('Something is wrong with the database')
      })
    })
})

if(!module.parent){
app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`)
  })
}

module.exports = app
