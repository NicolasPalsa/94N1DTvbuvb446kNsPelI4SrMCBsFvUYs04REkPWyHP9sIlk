import * as discord from './script.js'

const enter = document.getElementById('laugh')
const main = document.querySelector('.main')


enter.addEventListener('click', () => buildGame())

function buildGame(number) {
    // reset everything and change title
    main.textContent = ''
    document.title = 'What makes me laugh?'

    // build div base
    const div = document.createElement('div')
    div.classList.add('base')

    // build hint text element div
    const divT = document.createElement('div')
    divT.classList.add('text')

    const text = document.createElement('h1')
    text.classList.add('text')
    text.textContent = 'What makes me laugh?'

    divT.appendChild(text)

    // build input element div
    const divI = document.createElement('div')
    divI.classList.add('input')

    const input = document.createElement('input')
    input.type = 'text'
    input.id = 'input'
    input.onpaste = (e) => e.preventDefault()
    input.addEventListener('contextmenu', (e) => e.preventDefault())
    input.addEventListener('drop', (e) => e.preventDefault())
    input.autocomplete = 'off'

    const button = document.createElement('button')
    button.classList.add('submit')
    button.textContent = "THAT'S WHAT!!"

    divI.appendChild(input)
    divI.appendChild(button)

    // append all elements together
    div.appendChild(divT)
    div.appendChild(divI)

    main.appendChild(div)

    button.addEventListener('click', () => checkGuess())
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            button.click()
        }
    })
}

function checkGuess() {
    const guessElement = document.getElementById('input')
    const guess = guessElement.value.toLowerCase()

    if (guess === 'me' || guess === 'luna' || guess === 'wife' ||
        guess === 'lunie' || guess === 'wifey' || guess === 'mee'
         || guess === 'meee' || guess === 'me :3' || guess === 'gf'
        || guess === 'luna zoabi' || guess === 'my wife' || guess === 'my girlfriend') {
        finishGame(true)
    } else finishGame(false)

    guessElement.value = ''
}

function finishGame(boolean) {
    if (boolean) {
        winGame()
    }
    else if (!boolean) {
        buildGame()
        console.log('finishGame() built game');
    }
}

function winGame() {
    main.textContent = ''

    const div = document.createElement('div')
    div.classList.add('win')
    div.textContent = 'YESSSSS YOU MAKE ME LAUGH HEHHEHE :3'

    main.appendChild(div)

    localStorage.setItem('laugh', true)
}