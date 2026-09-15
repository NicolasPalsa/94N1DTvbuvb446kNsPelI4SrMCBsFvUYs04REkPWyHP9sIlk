import * as discord from './script.js'

const enter = document.getElementById('math')
const main = document.querySelector('.main')



enter.addEventListener('click', () => {
    if (localStorage.getItem('blank') === "true" && localStorage.getItem('laugh') === "true") {
        console.log('passed to maths');
        buildGame()
    } else {
        window.alert('You have to beat the two other tasks to progress to maths')
    }
})

function buildGame() {
    // notify
    discord.almost()

    // reset everything and change title
    main.textContent = ''
    document.title = 'MATH TIMEEEE'

    // build div base
    const div = document.createElement('div')
    div.classList.add('base')
    div.classList.add('hidden')

    // build hint text element div
    const divT = document.createElement('div')
    divT.classList.add('text')

    const text = document.createElement('p')
    text.classList.add('text')
    text.textContent = '2 × 5 × 6 ÷ 10 + 3 - 2 + 60'

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
    button.textContent = 'EQUALS'

    divI.appendChild(input)
    divI.appendChild(button)

    // build intro element div
    const divIntro = document.createElement('div')
    divIntro.classList.add('intro')

    const headerIntro = document.createElement('h2')
    headerIntro.classList.add('intro')
    headerIntro.textContent = 'Math'

    const textIntro = document.createElement('p')
    textIntro.classList.add('intro')
    textIntro.textContent = "Hey it's maths! lol good luck, it's 10 questions, and they get harder in difficulty according to your IQ, no time limit bc that'd be too hard for you\nAnd be a good girl don't use AI"

    const start = document.createElement('button')
    start.id = 'start'
    start.textContent = 'START'

    divIntro.appendChild(headerIntro)
    divIntro.appendChild(textIntro)
    divIntro.appendChild(start)

    // append all elements together
    div.appendChild(divT)
    div.appendChild(divI)

    main.appendChild(divIntro)
    main.appendChild(div)

    button.addEventListener('click', () => checkGuess())
    start.addEventListener('click', () => {
        main.removeChild(divIntro)
        div.classList.remove('hidden')
        divIntro.classList.add('hidden')
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
    const guess = guessElement.value
    const text = textElement.textContent

    if (text === '2 × 5 × 6 ÷ 10 + 3 - 2 + 60') {
        if (guess == '67') {
            textElement.textContent = '(8 + 4 × (6 - 2)) ÷ 2 - 3'
            discord.answerMath(guess, true, 1)
        } else discord.answerMath(guess, false, 1)
    }
    if (text === '(8 + 4 × (6 - 2)) ÷ 2 - 3') {
        if (guess == '9') {
            textElement.textContent = '2 + 3 - 3 + 3 - 3 + 3 - 3 + 3 - 3 + 3 - 3 + 3 - 3 + 3 - 3 + 3 - 3'
            discord.lastQuestion()
            discord.answerMath(guess, true, 2)
        } else discord.answerMath(guess, false, 2)
    }
    else if (text === '2 + 3 - 3 + 3 - 3 + 3 - 3 + 3 - 3 + 3 - 3 + 3 - 3 + 3 - 3 + 3 - 3') {
        if (guess == '2') {
            textElement.textContent = '11 × 11'
            discord.answerMath(guess, true, 3)
        } else discord.answerMath(guess, false, 3)
    }
    else if (text === '11 × 11') {
        if (guess == '121') {
            discord.done()
            discord.answerMath(guess, true, 4)
            winGame()
        } else discord.answerMath(guess, false, 4)
    }

    guessElement.value = ''
}


function winGame() {
    main.textContent = ''

    const div = document.createElement('div')
    div.classList.add('win')
    div.textContent = `Heh... ok I lied this isn't the gift, check ur email :3\nWould be pretty weak for a gift wouldn't it lmao`

    main.appendChild(div)
}