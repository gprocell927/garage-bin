const openGarageButton = document.querySelector('.open-garage-btn')
const garageDoor = document.querySelector('.garage-door')

openGarageButton.addEventListener('click', (e) => {
  e.preventDefault()
  if(garageDoor.style.display =='none'){
  garageDoor.style.display = 'block'
  }else {
  garageDoor.style.display = 'none'
  }
})
