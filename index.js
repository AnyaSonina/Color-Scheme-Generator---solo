const inputColor = document.querySelector("#input-color")
const inputSubmit = document.querySelector("#btn-submit")
const selectedMode = document.querySelector("#color__selection")
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

  const hexCodes = document.querySelectorAll(".hex")
 
 
  if(moon.style.display == "none") {
    sun.style.display = "inline-block"
    document.body.style.backgroundColor = "#1F2937"   
    document.getElementById("input-color").style.backgroundColor = "lightgray"
    container.style.backgroundColor = "lightgray"
    moon.style.display = "inline-block"
    sun.style.display = "none"    
    hexCodes.forEach(hexCode => {
     hexCode.style.color = "#1F2937"
    })
    
  }else if(moon.style.display == "inline-block"){
    hexCodes.forEach(hexCode => {
      hexCode.style.color = "#fff"
    })
    sun.style.display = "none"
    document.body.style.backgroundColor = "#fff"
    document.getElementById("input-color").style.backgroundColor = "#1F2937"
    container.style.backgroundColor = "#1F2937"
    moon.style.display = "none"
    sun.style.display = "inline-block"
  }
  
})