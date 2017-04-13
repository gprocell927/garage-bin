const garageDoor = document.querySelector('.garage-door')
const openGarageButton = document.querySelector('.open-garage-btn')

openGarageButton.addEventListener('click', () => {
  toggleGarageDoorDisplay()
})

function toggleGarageDoorDisplay(){
  if(garageDoor.style.display == 'none'){
    garageDoor.style.display = 'block'
  } else {
    garageDoor.style.display = 'none'
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
  .then(res => document.querySelector('.item-shelf').innerHTML = res.reduce((acc, item) => `${acc} <ul data-id=${item.id} class="item-list">${item.name}</ul>`, ''))
}
