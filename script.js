// localStorage stuff


if (!localStorage.getItem('blank') && !localStorage.getItem('laugh')) {
  localStorage.setItem('blank', false)
  localStorage.setItem('laugh', false)
}
console.log(localStorage.getItem('blank'));
console.log(localStorage.getItem('laugh'));

if (localStorage.getItem('blank') == 'true' && localStorage.getItem('laugh') == 'true') {
  document.querySelector('.locked').textContent = 'Math for birthday girls'
  document.querySelector('.locked').classList.remove('locked')
}


// Discord webhook stuff - #general

export async function sendDiscordNotification(message) {
  const webhookUrl = "https://discord.com/api/webhooks/1545354230972424234/wPxl8MGgTVY0ab-i6hqVEiDTC2o7OdV_yvmEUQaN4KU3SBsxUzrvAthBxEOdiDrHsWcT";

  await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      content: message + getFormattedTime() + '\n----------\n'
    })
  });
}

export async function almost() {
    sendDiscordNotification("----------\nLAST PUZZLE ENTERED\nPREPARE THE GIFT https://www.minecraft.net/en-us/store/gift/minecraft-java-bedrock-edition-pc\n||@everyone||\n")
}

export async function lastQuestion() {
    sendDiscordNotification("----------\nSEND THE GIFT\n||@everyone||\n")
}

export async function done() {
    sendDiscordNotification("----------\nALL TASKS DONE\n||@everyone||\n")
}

function getFormattedTime() {
  const now = new Date();
  const pad = n => String(n).padStart(2, "0");
  return `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())} ${pad(now.getDate())}/${pad(now.getMonth() + 1)}/${now.getFullYear()}`;
}


// Discord webhook stuff - #answers

 export async function sendDiscordNotificationAnswers(title, message, color) {
  const webhookUrl = "https://discord.com/api/webhooks/1545361002575691827/Ikc5OtPu97IH7Vf-jG7RqI-WFTWsPu4_-F8yDIKur0Dzu8g5O0Aw7qqh1k2uMHiHohsH";

  await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      embeds: [{
        title: title,
        description: message + getFormattedTime(),
        color: color,
        timestamp: new Date().toISOString()
      }]
    })
  });
}

export async function answerLaugh(answer, boolean) {
    let bool = 'WRONG'
    if (boolean) bool = 'CORRECT'
    let color = 16711680
    if (boolean) color = 65293
    sendDiscordNotificationAnswers(`Who makes me laugh?`, `\n${answer}\n\n${bool}\n`, color)
}

export async function answerMath(answer, boolean, number) {
    let bool = 'WRONG'
    if (boolean) bool = 'CORRECT'
    let color = 16711680
    if (boolean) color = 65293

    let question = '2 * 5 * 6 / 10 + 3 - 2 + 60' // 67
    if (number === 2) question = '2 + 3' // 5
    if (number === 3) question = '11 * 11' // 121
    sendDiscordNotificationAnswers(`${question}?`, `\n${answer}\n\n${bool}\n`, color)
}

export async function answerBlank(answer, boolean, number) {
    let bool = 'WRONG'
    if (boolean) bool = 'CORRECT'
    let color = 16711680
    if (boolean) color = 65293

    let question = '______ yourself accordingly (6 letters)' // GOVERN
    if (number === 2) question = 'i ____ to have that effect on people (4 letters)' // TEND
    if (number === 3) question = 'the longest word in the english dictionary is _____________________________________________ (45 letters)' // PNEUMONOULTRAMICROSCOPICSILICOVOLCANOCONIOSIS
    if (number === 4) question = 'i ____ you more (4 letters)' // LOVE
    if (number === 5) question = 'i am a ____ daddy (4 letters)' // SLUT
    sendDiscordNotificationAnswers(`Fill in the bank\n${question}?`, `\n${answer}\n\n${bool}\n`, color)
}

/*function buildHome() {
    main.textContent = ''

    const div = document.createElement('div')
    div.classList.add('tasks')

    const buttonB = document.createElement('button')
    buttonB.classList.add('task')
    buttonB.id = 'blank'
    buttonB.textContent = 'b'
    
    const buttonM = document.createElement('button')
    buttonM.classList.add('task')
    buttonM.id = 'math'
    buttonM.textContent = 'm'
    
    const buttonL = document.createElement('button')
    buttonL.classList.add('task')
    buttonL.id = 'laugh'
    buttonL.textContent = 'a'
    
    div.appendChild(buttonB)
    div.appendChild(buttonM)
    div.appendChild(buttonL)

    main.appendChild(div)
} */


