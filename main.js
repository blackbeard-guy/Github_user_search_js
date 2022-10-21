const searchEl = document.querySelector('.main')

const wrapperEl = document.createElement('div')
wrapperEl.classList.add('wrapper')

const formEl = document.createElement('form')
formEl.classList.add('search-form')
formEl.addEventListener('submit', async (e) => {
    e.preventDefault()
    const inputsValue = Object.fromEntries(new FormData(e.target))

    const response = await fetch(`https://api.github.com/users/${inputsValue.name}`)
    if(response.ok) {
        const data = await response.json()
        wrapperEl.innerHTML = ''
        createProfileCard(data)
    } else{
        alert ('User is not found')
    }
})

const inputEl = document.createElement('input')
inputEl.classList.add('search-form-input')
inputEl.setAttribute('name', 'name')

const searchBtn = document.createElement('button')
searchBtn.classList.add('search-form-btn')
searchBtn.setAttribute('type', 'submit')
searchBtn.innerText = 'Search'

formEl.appendChild(inputEl)
formEl.appendChild(searchBtn)
searchEl.appendChild(formEl) 

function createProfileCard(dataFromGH) {
    const cardEl = document.createElement('div')
    cardEl.classList.add('card')
    
    const picEl = document.createElement('img')
    picEl.classList.add('card-avatar')
    picEl.src = dataFromGH.avatar_url

    const nameEl = document.createElement('p')
    nameEl.classList.add('card-bio')
    if(dataFromGH.name) {
        nameEl.innerText += `Name: ${dataFromGH.name}`
    }

    const cityEl = document.createElement('p')
    cityEl.classList.add('card-bio')
    if(dataFromGH.location) {
        cityEl.innerText += ` City: ${dataFromGH.location}`
    }

    const bioEl = document.createElement('p')
    bioEl.classList.add('card-bio')
    if(dataFromGH.bio) {
        bioEl.innerText += ` Bio: ${dataFromGH.bio}`
    }
    
    const deleteBtn = document.createElement('button')
    deleteBtn.classList.add('delete-btn')
    deleteBtn.innerText = 'Delete'
    
    deleteBtn.addEventListener('click', deleteProfileCard)

    cardEl.appendChild(picEl)
    cardEl.appendChild(nameEl)
    cardEl.appendChild(cityEl)
    cardEl.appendChild(bioEl)
    cardEl.appendChild(deleteBtn)
    wrapperEl.appendChild(cardEl)
    searchEl.appendChild(wrapperEl)
}

function deleteProfileCard() {
    const wrapperEl = document.querySelector('.wrapper')
    wrapperEl.innerHTML = ''
}


