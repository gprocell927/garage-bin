const garageDoor = document.querySelector('.garage-door')
const openGarageButton = document.querySelector('.open-garage-btn')
const newItemForm = document.querySelector('.item-form')

openGarageButton.addEventListener('click', () => {
  toggleGarageDoorDisplay()
})

function toggleGarageDoorDisplay(){
  if(garageDoor.style.display == 'none'){
    garageDoor.style.display = 'block'
  } else {
    garageDoor.style.display = 'none'
    showItems()
    renderNewItemForm()
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
  .then(res => document.querySelector('.item-shelf').innerHTML = res.reduce((acc, item) => `${acc} <ul data-id=${item.id} class="item-list">${item.name}</ul>`, ''))
}

function renderNewItemForm () {
  newItemForm.innerHTML =
  `<section>
    <aside class="new-item-container">
      <span>Name of junk item: </span>
      <input placeholder="New item name" />
      <span>Why do you hang on to this crap?</span>
      <input placeholder="Lame reason here" />
      <span>Select the cleanliness of this item:</span>
      <select>
        <option value='Sparkling'>Sparkling</option>
        <option value='Dusty'>Dusty</option>
        <option value='Rancid'>Rancid</option>
      </select>
    </aside>
  </section>`
}
