const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.set('port', process.env.PORT || 3000)
app.locals.title = 'Garage Bin'
app.locals.items = {
  id: 1,
  name: 'rubber chicken'
}

app.get('/', (request, response) => {
  response.send('Welcome to the garage bin!')
})

app.get('/api/items', (request, response) => {
  const items = app.locals.items
  response.json({ items })
})

app.get('/api/items/:id', (request, response) => {
  const { id } = request.params
  const message = app.locals.items[id]

  if(!message) { return response.sendStatus(404) }

  response.json({ id, message })
})

if(!module.parent){
app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`)
  })
}

module.exports = app
