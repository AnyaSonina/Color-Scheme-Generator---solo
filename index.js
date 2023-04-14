const inputColor = document.querySelector("#input-color")
const inputSubmit = document.querySelector("#btn-submit")
const selectedMode = document.querySelector("#color-selection")
const colorBlocks = document.querySelector(".colors-display")
const colorsHeader = document.querySelector("#colors__header")
const popUp = document.getElementById("pop-up")
const container = document.querySelector(".container")
const icon = document.querySelector(".fa-regular")


colorsHeader.addEventListener("submit", (event) => {
  event.preventDefault()
  render() 
})

function render() {
  
  let colorsHTML = ""
  const seedColor = inputColor.value.substring(1)  
  const mode = selectedMode.value

  fetch(`https://www.thecolorapi.com/scheme?hex=${seedColor}&mode=${mode}`)
  .then(response => response.json())
  .then(data => {      
   let colors = data.colors

   let hexValue = ""
   
   colors.map(color => {
     hexValue = color.hex.value
     colorsHTML += `
     <div class="pallete">
     <div class="color-block" style="background:${hexValue}"><span>${hexValue}</span></div>
     <div class="hex">${hexValue}</div>
     </div>
     `     
    })
    colorBlocks.innerHTML = colorsHTML
  })
}

render()
  
const copyFunction = () => {
  let timeoutId = ""
  colorBlocks.addEventListener("click", (event) => {  
    if(event.target.matches(".color-block")){
      navigator.clipboard.writeText(event.target.innerText)
      popUp.textContent = event.target.innerText + " copied to clipboard" 
      popUp.style.opacity = 1
      timeoutId = setTimeout(() => {
        popUp.style.opacity = 0
      }, 1000)
    }     
  })
}

copyFunction()
    
const modeBtn = document.getElementById("mode_icon")
icon.classList.add("fa-moon")

modeBtn.addEventListener("click", () => {
  document.documentElement.classList.toggle("dark")
  if(icon.classList.contains("fa-moon")) {
    icon.classList.replace("fa-moon", "fa-sun")
  }else {
    icon.classList.replace("fa-sun", "fa-moon")
  }
})

