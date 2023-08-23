import Validations from './classes/Validation.js'
import Warning from './classes/Warning.js'

const allInputs = [...document.querySelectorAll('[data-input]')]

const mainForm = document.forms[0]
const signupButton = document.querySelector('[data-button="sign-up"]')

const validations = new Validations()
const warning = new Warning()

function createWarning(target) {

    if(target.querySelector('img')?.getAttribute('data-validation') === 'invalid') {
        return
    }

    const img = document.createElement('img')
    img.setAttribute('data-validation', 'invalid')
    img.setAttribute('src', './images/icons/important-dark.png')
    console.log(target)
    target.appendChild(img)
    return img
}

function removeWarning(target) {
    target.querySelector('img')?.remove()
}

function createSmallText(text, input) {
    const small = document.createElement('small')
    small.textContent = text
    input.insertAdjacentElement('afterend', small)
    return small
}

function updateValidation() {

    allInputs.forEach(input => {

        const [ _, options ] = Object.entries(validations).find(([ key ]) => key == input.dataset.input)
        const { regex, message } = options

        const isValid = regex.test(input.value)


        const getLabelParent = () => {
            const parent = input.parentElement
            return parent.nodeName === 'LABEL' ? parent : input.closest('label')
        }

        if(isValid) {
            warning.delete(getLabelParent())
            return
        }

        warning.create(getLabelParent())
    })
}

mainForm.addEventListener('submit', (event) => event.preventDefault())
mainForm.addEventListener('input', updateValidation)