const garageDoor = document.querySelector('.garage-door')
const openGarageButton = document.querySelector('.open-garage-btn')
const newItemForm = document.querySelector('.item-form')
const submitButton = document.querySelector('.submit-item-btn')
const userInput = document.querySelector('.item-name-input')
const userReason = document.querySelector('.item-reason-input')
const cleanliness = document.querySelector('.cleanliness-selection')
const itemShelf = document.querySelector('.item-shelf')
const sortByNameBtn = document.querySelector('.sort-by-name-btn')
const newItemContainer = document.querySelector('.new-item-container')
let names

openGarageButton.addEventListener('click', () => {
  toggleGarageDoorDisplay()
})

submitButton.addEventListener('click', (e) => {
  e.preventDefault()
  const server = ('/api/items')

  fetch(server, {
    method:'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      name:userInput.value.toLowerCase(),
      reason:userReason.value,
      cleanliness: cleanliness.value
    })
  })
  .then(res => res.json())
  .then(res => showItems())
  userInput.value = ''
  userReason.value = ''
})

sortByNameBtn.addEventListener('click', () => {
    const server = ('/api/items/sortByName')
    fetch(server, {
      method:'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    })
    .then(res => res.json())
    .then(res => showSortedItems(res))
  })


function showSortedItems(items){
  return itemShelf.innerHTML = items.reduce((acc, item) => `${acc} <ul data-id=${item.id} class="item-list">Name:<a href="https://www.w3schools.com/html/"> ${item.name}</a>, Reason: ${item.reason}, Cleanliness: ${item.cleanliness}</ul> `, '')
}

function toggleGarageDoorDisplay(){
  if(garageDoor.style.display == 'none'){
    garageDoor.style.display = 'block'
    newItemContainer.style.display = 'none'
    itemShelf.style.display = 'none'
  } else {
    garageDoor.style.display = 'none'
    newItemForm.style.display = 'block'
    itemShelf.style.display = 'block'
    showItems()
    countItems()
    cleanlinessCount()
  }
}

function showItems(){
  const server = ('/api/items')
  fetch(server, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  })
  .then(res => res.json())
  .then(res => itemShelf.innerHTML = res.reduce((acc, item) => `${acc} <ul data-id=${item.id} class="item-list">Name: <a href="https://www.w3schools.com/html/">${item.name}</a>, Reason: ${item.reason}, Cleanliness: ${item.cleanliness}</ul> `, ''))
}

function countItems(){
  const server = ('/api/items')
  fetch(server, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  })
  .then(res => res.json())
  .then(res => document.querySelector('.item-count').innerHTML = `Number of items in garage: ${res.length}`)
}

function cleanlinessCount(){
  const server = ('/api/items/cleanlinessCount')
  fetch(server, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  })
  .then(res => res.json())
  .then(res => res.map(thing => thing.cleanliness))
  .then(res => res.reduce((acc, item) => {
    acc[item] = (acc[item] || 0) + 1
    return acc
  }, {} ))
  .then(res => document.querySelector('.cleanliness-count').innerHTML = `Items counted by cleanliness: Sparkling: ${res['Sparkling']}, Dusty: ${res['Dusty']}, Rancid: ${res['Rancid']}`)
}
