import "../css/main.scss"
import "../css/style.scss"

const rippleButton = document.querySelectorAll("button")

rippleButton.forEach((button) => {
    button.addEventListener("click", (e) => {
        mousePositionToCustomProp(e, button)
        button.classList.add("pulse")
        button.addEventListener(
            "animationend",
            () => {
                button.classList.remove("pulse")
            },
            {
                once: true,
            }
        )
    })
})

const skill_area = document.querySelector("span.skills")
const cursor = document.querySelector("span.cursor")

const skill_list = [
    "A Web Developer",
    "An Android Developer",
    "An Application Developer",
    "A Content Creator",
    "A Data Analyst",
    "A Cloud Engineer",
    "A Computer Engineer",
]
const typing_delay = 300
const erasing_delay = 200
const new_word_delay = 2000
let word_index = 0
let character_index = 0
let isTyping = true

function changeClass(active = true) {
    if (active) {
        if(!cursor.classList.contains('active')) {
            cursor.classList.add('active')
        }
    } else {
        if(cursor.classList.contains('active')) {
            cursor.classList.remove('active')
        }
    }
}

(function typeWriter() {
    if (character_index < skill_list[word_index].length && isTyping) {
        changeClass(true)
        skill_area.textContent += skill_list[word_index].charAt(character_index)
        character_index++

        let waitingTime = 0
        if (character_index < skill_list[word_index].length) {
            waitingTime = typing_delay
            changeClass(true)
        } else {
            waitingTime = new_word_delay
            changeClass(false)
        }
        setTimeout(typeWriter, waitingTime)
    } else {
        isTyping = false
        if (character_index > 0) {
            changeClass(true)
            skill_area.textContent = skill_list[word_index].substring(
                0,
                character_index - 1
            )
            character_index--
            setTimeout(typeWriter, erasing_delay)
        } else {
            changeClass(false)
            if (word_index < skill_list.length - 1) {
                word_index++
            } else {
                word_index = 0
            }
            isTyping = true
            setTimeout(typeWriter, 1000)
        }
    }
})()

/**
 * Handling Click Event
 * @param {object} event
 * @param {HTMLButtonElement} element
 */
function mousePositionToCustomProp(event, element) {
    let posX = event.offsetX
    let posY = event.offsetY

    element.style.setProperty("--x", posX + "px")
    element.style.setProperty("--y", posY + "px")
}
