const garageDoor = document.querySelector('.garage-door')
const openGarageButton = document.querySelector('.open-garage-btn')
const newItemForm = document.querySelector('.item-form')
const submitItemButton = document.querySelector('.submit-item-btn')
const userInput = document.querySelector('.item-name-input')
const userReason = document.querySelector('.item-reason-input')
const cleanliness = document.querySelector('.cleanliness-selection')
const updateCleanliness = document.querySelector('.update-cleanliness')
const itemShelf = document.querySelector('.item-shelf')
const sortByNameBtn = document.querySelector('.sort-by-name-btn')
const newItemContainer = document.querySelector('.new-item-container')
const itemNameList = document.querySelector('.item-list')
const itemAttributes = document.querySelector('.item-attributes')
const itemDetails = document.querySelector('.item-details')
let itemName

openGarageButton.addEventListener('click', () => {
  document.querySelector('.slider').classList.toggle('closed')
  // toggleGarageDoorDisplay()
})

submitItemButton.addEventListener('click', (e) => {
  e.preventDefault()
  const server = ('/api/items')
  debugger
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
  .then(res => getItems())
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

itemShelf.addEventListener('click', (e) => {
    const id = e.target.dataset.id
    itemName = e.target.dataset.id
    getItemDetails(id, itemName)
  })

// updateCleanliness.addEventListener('change', (e) => {
//
//   const id = e.target.dataset.id
//   console.log(id);
//   const server = (`/api/items/${id}`)
//
//   fetch(server, {
//     method:'PATCH',
//     headers: {
//       'Content-Type': 'application/json',
//       'Accept': 'application/json',
//     },
//     body: JSON.stringify({
//       cleanliness: updateCleanliness.value
//     })
//   })
//   .then(res => res.json())
//   .then(res => showItems())
// }) //cannot read event listener of null

function getItemDetails(id){
  const server = (`/api/items/${id}`)
  fetch(server, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  })
  .then(res => res.json())
  .then(res => itemDetails.innerHTML = showItemDetails(res))
}

function showItemDetails(details){
  return `<p>Name: ${details[0].name}<br>
             Reason: ${details[0].reason}<br>
             Cleanliness: ${details[0].cleanliness}
          </p>
            <select class="update-cleanliness">
              <option value="Sparkling">Sparkling</option>
              <option value="Dusty">Dusty</option>
              <option value="Rancid">Rancid</option>
            </select>`
}

function showSortedItems(items){
  return itemShelf.innerHTML = items.reduce((acc, item) => `${acc}
  <ul
    data-id=${item.id}
    class="item-list"
  >
      ${item.name}
  </ul>
  <hr> `, '')
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
    getItems()
    countItems()
    cleanlinessCount()
  }
}

function getItems(){
  const server = ('/api/items')
  fetch(server, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  })
  .then(res => res.json())
  .then(res => itemShelf.innerHTML = showItems(res))
}

function showItems(details){
  return details.reduce((acc, item) => `${acc}
  <ul
    data-id=${item.id}
    class="item-list"
  >
      ${item.name}
  </ul>
  <hr> `, '')
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
  const server = ('/api/items')
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
