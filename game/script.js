



let listMap = []
listMap = []


function addPoly(x, y) {
    var newPoly = document.createElement("div")
    newPoly.className = "poly";

    newPoly.style.setProperty("--x", `${x}px`)
    newPoly.style.setProperty("--y", `${y}px`)

    const blockmain = document.querySelector('div.map')
    blockmain.appendChild(newPoly)
}
function addPlayer() {
    var newPoly = document.createElement("div")
    newPoly.classList = "poly player";

    newPoly.style.setProperty("--x", `${0}px`)
    newPoly.style.setProperty("--y", `${32}px`)

    const blockmain = document.querySelector('main')
    blockmain.appendChild(newPoly)
}

addPoly(0, 0)
addPoly(32, 0)
addPoly(64, 0)
addPoly(0, 32)
addPoly(32, 32)
addPoly(64, 32)
addPoly(0, 64)
addPoly(32, 64)
addPoly(64, 64)
addPlayer()

let classMap = document.querySelector('.map')
classMap.style.setProperty("--x", `${0}px`)
classMap.style.setProperty("--y", `${0}px`)


document.addEventListener('keypress', function(event) {
    if(event.key == 'w') {
        let currentY = parseInt(classMap.style.getPropertyValue('--y'))
        classMap.style.setProperty("--y", `${currentY + 32}px`)
        
    }
    if(event.key == 'a') {
        let currentY = parseInt(classMap.style.getPropertyValue('--x'))
        classMap.style.setProperty("--x", `${currentY + 32}px`)
        
    }
    if(event.key == 's') {
        let currentY = parseInt(classMap.style.getPropertyValue('--y'))
        classMap.style.setProperty("--y", `${currentY - 32}px`)
        
    }
    if(event.key == 'd') {
        let currentY = parseInt(classMap.style.getPropertyValue('--x'))
        classMap.style.setProperty("--x", `${currentY - 32}px`)
        
    }
})