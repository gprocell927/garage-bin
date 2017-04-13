const openGarageButton = document.querySelector('.open-garage-btn')
const garageDoor = document.querySelector('.garage-door')

openGarageButton.addEventListener('click', (e) => {
  e.preventDefault()
  if(garageDoor.style.display =='none'){
  garageDoor.style.display = 'block'
  }else {
  garageDoor.style.display = 'none'
  }
  renderNewItemForm(e)
})

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
