const inputColor = document.querySelector("#input-color")
const inputSubmit = document.querySelector("#btn-submit")
const selectedMode = document.querySelector("#color-selection")
const colorBlocks = document.querySelector(".colors-display")
const colorsHeader = document.querySelector("#colors__header")
const popUp = document.getElementById("pop-up")
const container = document.querySelector(".container")


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
const moon = document.querySelector(".fa-moon")
const sun = document.querySelector(".fa-sun")
moon.style.display = "none"


modeBtn.addEventListener("click", () => {
 if(moon.style.display == "none") {
    sun.style.display = "inline-block"
    document.body.style.background = "#1F2937"   
    inputColor.style.background = "lightgray"
    container.style.background = "lightgray"
    container.style.color = "#1F2937" 
    modeBtn.style.background = "#FFF"
    modeBtn.style.borderColor = "#1F2937"
    inputSubmit.style.background = "#FFF"
    inputSubmit.style.borderColor = "#1F2937"
    selectedMode.style.borderColor = "#1F2937"
    selectedMode.style.background = "#FFF"
    moon.style.display = "inline-block"
    sun.style.display = "none"    
       
  }else if(moon.style.display == "inline-block"){
    sun.style.display = "none"
    document.body.style.background = "#FFF"
    modeBtn.style.background = "#1F2937"
    inputColor.style.background = "#1F2937"
    container.style.background = "#1F2937"
    container.style.color = "#FFF" 
    inputSubmit.style.background = "#1F2937"
    selectedMode.style.background = "#1F2937"
    inputSubmit.style.borderColor = "#FFF"
    selectedMode.style.borderColor = "#FFF"
    modeBtn.style.borderColor = "#FFF"
    moon.style.display = "none"
    sun.style.display = "inline-block"
  }
  
})

