var pageNum = 1
const monsterList = document.getElementById(`monster-container`)
const monsterUl = document.createElement(`ul`)
monsterList.appendChild(monsterUl)
monsterUl.id=`monster-list`
const createMonsterDiv = document.getElementById(`create-monster`)
const createForm = document.createElement(`form`)
createMonsterDiv.appendChild(createForm)
createForm.innerHTML=`<input id="name" placeholder="name"><input id="age" placeholder="age"><input id="description" placeholder="description"><button id="create-button">Create</button>`

const addMonsterToDom = (arr) => {
    const newLi = document.createElement(`li`)
    document.getElementById(`monster-list`).appendChild(newLi)
    newLi.innerHTML=`<h1>${arr.name}</h1><h5>Age: ${arr.age}</h5>${arr.description}`
}

const loadTwenty = () => {
    fetch(`http://localhost:3000/monsters?_limit=20&_page=${pageNum}`)
.then(res => res.json())
.then(json => {
    // console.log(json)
    monsterUl.innerHTML=``
    json.forEach((element) => {
        addMonsterToDom(element)
    })
})
}

const backBtn = document.getElementById(`back`)
const forwardBtn = document.getElementById(`forward`)

backBtn.addEventListener("click", () => {
   if (pageNum >= 2) {pageNum--
    loadTwenty()
   }
})
forwardBtn.addEventListener("click", () => {
    pageNum++
    loadTwenty()
})

loadTwenty()

const createBtn = document.getElementById(`create-button`)
const nameInput = document.getElementById(`name`)
const ageInput = document.getElementById(`age`)
const descInput = document.getElementById(`description`)

const postNewMonster = () => {
    fetch(`http://localhost:3000/monsters`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({
            name: `${nameInput.value}`, age: `${ageInput.value}`, description: `${descInput.value}`
        })
    })
}

createBtn.addEventListener("click", () => postNewMonster())