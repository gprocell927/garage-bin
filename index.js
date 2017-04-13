const openGarageButton = document.querySelector('.open-garage-btn')
const garageDoor = document.querySelector('.garage-door')
const submitItemButton = document.querySelector('.submit-item-btn')

openGarageButton.addEventListener('click', (e) => {
  toggleGarageDoorDisplay(e)
  getItems()
  renderNewItemForm(e)
})

submitItemButton.addEventListener('click', (e) => {
  e.preventDefault()
  const newItemInput = document.querySelector('.new-item-input')
})

function getItems() {
  const server = ('/api/items')
  fetch(server, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  })
  .then(response => response.json())
  .then(response => document.querySelector('.item-shelf').innerHTML = response.reduce((acc, item) => `${acc} <ul data-id${item.id} class="item-list">${item.name}</ul>`, '')
  )
}

function toggleGarageDoorDisplay(e){
  e.preventDefault()
  if(garageDoor.style.display =='none'){
  garageDoor.style.display = 'block'
  }else {
  garageDoor.style.display = 'none'
  }
}

function renderNewItemForm(e){
  document.querySelector('.item-shelf').innerHTML =
  `<section>
    <aside class="new-item-container">
      <input placeholder="Enter a New Item" class="new-item-input" />
      <input type="submit" value="Submit" class="submit-item-btn" />
    </aside>
    <h1 class="item-name">${e.target.innerHTML}</h1>
  </section>`
}
