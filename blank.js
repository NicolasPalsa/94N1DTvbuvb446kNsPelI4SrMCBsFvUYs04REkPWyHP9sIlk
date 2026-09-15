import * as discord from './script.js'

const enter = document.getElementById('blank')
const main = document.querySelector('.main')
const tasks = document.querySelector('.tasks')
let child = ''

let timerInterval = null


enter.addEventListener('click', () => buildGame())

function buildGame() {
    // reset everything and change title
    main.textContent = ''
    document.title = 'Fill in the blank'

    // build div base
    const div = document.createElement('div')
    div.classList.add('base')
    div.classList.add('hidden')

    // build hint text element div
    const divT = document.createElement('div')
    divT.classList.add('text')

    const text = document.createElement('p')
    text.classList.add('text')
    text.textContent = '______ yourself accordingly.'

    const letters = document.createElement('p')
    letters.classList.add('letters')
    letters.textContent = '(6 letters)'

    divT.appendChild(text)
    divT.appendChild(letters)

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
    button.textContent = 'GUESS'

    divI.appendChild(input)
    divI.appendChild(button)

    // build intro element div
    const divIntro = document.createElement('div')
    divIntro.classList.add('intro')

    const headerIntro = document.createElement('h2')
    headerIntro.classList.add('intro')
    headerIntro.textContent = 'Fill in the blank'

    const textIntro = document.createElement('p')
    textIntro.classList.add('intro')
    textIntro.textContent = "it's pretty simple, fill in the blank, except you have a minute and guessing wrong restarts the game, it's really easy though"

    const start = document.createElement('button')
    start.id = 'start'
    start.textContent = 'START'

    divIntro.appendChild(headerIntro)
    divIntro.appendChild(textIntro)
    divIntro.appendChild(start)

    // build timer element div
    const divTimer = document.createElement('div')
    divTimer.classList.add('timer')

    const headerTimer = document.createElement('h4')
    headerTimer.classList.add('timer')
    headerTimer.textContent = 'Time left:'

    const pTimer = document.createElement('p')
    pTimer.classList.add('timer')

    divTimer.appendChild(headerTimer)
    divTimer.appendChild(pTimer)

    // build victory element div


    // append all elements together
    div.appendChild(divT)
    div.appendChild(divI)
    div.appendChild(divTimer)

    main.appendChild(divIntro)
    main.appendChild(div)
    
    child = document.getElementById('child')

    button.addEventListener('click', () => checkGuess())
    start.addEventListener('click', () => {
        main.removeChild(divIntro)
        div.classList.remove('hidden')
        divIntro.classList.add('hidden')
        startGame()
    })
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            button.click()
        }
    })
}

function checkGuess() {
    const guessElement = document.getElementById('input')
    const textElement = document.querySelector('p.text')
    const letters = document.querySelector('p.letters')
    const guess = guessElement.value
    const text = textElement.textContent

    if (text === '______ yourself accordingly.') {
        if (guess.toUpperCase() === 'GOVERN') {
            textElement.textContent = 'I ____ to have that effect on people.'
            letters.textContent = '(4 letters)'
            discord.answerBlank(guess.toUpperCase(), true, 1)
        } else discord.answerBlank(guess.toUpperCase(), false, 1)
    }
    else if (text === 'I ____ to have that effect on people.') {
        if (guess.toUpperCase() === 'TEND') {
            textElement.textContent = 'The longest word in the english dictionary is\n_____________________________________________.'
            letters.textContent = '(45 letters)'
            discord.answerBlank(guess.toUpperCase(), true, 2)
        } else discord.answerBlank(guess.toUpperCase(), false, 2)
    }
    else if (text === 'The longest word in the english dictionary is\n_____________________________________________.') {
        if (guess.toUpperCase() === 'PNEUMONOULTRAMICROSCOPICSILICOVOLCANOCONIOSIS') {
            letters.textContent = '(4 letters)'
            textElement.textContent = 'I ____ you more.'
            discord.answerBlank(guess.toUpperCase(), true, 3)
        } else discord.answerBlank(guess.toUpperCase(), false, 3)
    }
    else if (text === 'I ____ you more.') {
        if (guess.toUpperCase() === 'LOVE') {
            textElement.textContent = 'I am a ____.'
            letters.textContent = '(4 letters)'
            discord.answerBlank(guess.toUpperCase(), true, 4)
        } else discord.answerBlank(guess.toUpperCase(), false, 4)
    }
    else if (text === 'I am a ____.') {
        if (guess.toUpperCase() === 'SLUT') {
            discord.answerBlank(guess.toUpperCase(), true, 5)
            finishGame(true)
        } else discord.answerBlank(guess.toUpperCase(), false, 5)
    }

    guessElement.value = ''
}

function startGame() {
    timer()
    document.querySelector('p.timer').textContent = '60 seconds left'
}

function timer() {
    let time = parseInt(60 * 1000)

    timerInterval = setInterval(() => {
        if (time > 1) {
            time = time - 1000
            document.querySelector('p.timer').textContent = time / 1000 + ' seconds left'
        } else {
            clearInterval(timerInterval)
            finishGame(false)
        }
    }, 1000);

}

function finishGame(boolean) {
    clearInterval(timerInterval)
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
    div.textContent = 'You did it!!! so proud of u :3\nNow go to the home page'

    main.appendChild(div)

    localStorage.setItem('blank', true)
}