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
      name:userInput.value,
      reason:userReason.value,
      cleanliness: cleanliness.value
    })
  })
  .then(res => res.json())
  .then(res => showItems())
  userInput.value = ''
  userReason.value = ''

})

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
  .then(res => document.querySelector('.item-shelf').innerHTML = res.reduce((acc, item) => `${acc} <ul data-id=${item.id} class="item-list">Name: ${item.name}, Reason: ${item.reason}, Cleanliness: ${item.cleanliness}</ul> `, ''))
}

function sortByName(){
  sortByNameBtn.addEventListener('click', () => {
    const server = ('/api/items')
    fetch(server, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    })
    .then(res => console.log(res.json()))
  })
}
