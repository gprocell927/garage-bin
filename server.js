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
app.use(express.static('public'))

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

app.get('/api/items/sortByName', (request, response) => {
  database('items').select().orderBy('name')
  .then((items) => {
    response.status(200).json(items)
  })
  .catch((error) => {
    console.error('Something is wrong with the database')
  })
})

app.get('/api/items/cleanlinessCount', (request, response) => {
  database('items').select().orderBy('cleanliness', 'desc')
  .then((items) => {
    response.status(200).json(items)
  })
  .catch((error) => {
    console.error('Something is wrong with the database')
  })
})

app.post('/api/items', (request, response) => {
  const { name, reason, cleanliness} = request.body
  const item  = { name, reason, cleanliness }
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
  console.log(`Garage Bin is running on ${app.get('port')}.`)
  })
}

module.exports = app
