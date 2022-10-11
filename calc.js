let operation = {
  displayText: '',
  value1: '',
  value2: '',
  operator: '',
  result: '',
  displayIsResult: false,
  lastInputValue: 0
}

const buttons = document.querySelectorAll('.button')
const display = document.getElementById('screen')

const buttonPress = (event) => {
  let button = event.target.id
  // check if button is +, -, /, x or =
  if (event.target.classList.contains('calc')) {
    assignOperator(button)
  // check if button is 'clear'
  } else if (button === 'clear') {
    clear()
  } else if (isValid(button)) {
    if (operation.displayIsResult) {
      operation.displayText = ''
    }
    updateDisplay(button)
  } 
}

const updateValue1 = (value) => {
  operation.value1 = parseFloat(value)
}

const updateValue2 = (value) => {
  operation.value2 = parseFloat(value)
}

const assignOperator = (button) => {
  // only run if there is a value in displayText so that input cannot be blank before a operator is assigned
  if (operation.displayText !== '') {
    
    if ((button !== 'equal') && (operation.value1 === '')){
      // assign operator
      operation.operator = button
      // update value1 with what's on the display
      updateValue1(operation.displayText)
      // clear display
      operation.displayText = ''
    } else if ((button === 'equal') && (operation.operator === '')) {
      //return if 'equal' button is pressed but there hasn't been an operator assigned yet
      return
    } else {
      if (button === 'equal') {
        updateValue2(operation.displayText)
        calculate()
      } else {
        updateValue2(operation.displayText)
        calculate()
        // update the operator after the calculation
        operation.operator = button
      }
    }

  }
}

const calculate = () => {
  switch(operation.operator){
    case 'add':
      result = operation.value1 + operation.value2
      break
    case 'sub':
      result = operation.value1 - operation.value2
      break
    case 'mult':
      result = operation.value1 * operation.value2
      break
    case 'div':
      result = operation.value1 / operation.value2
      break
  }
  display.innerText = result.toString()
  operation.displayText = result.toString()
  operation.value1 = result
  operation.value2 = ''
  operation.displayIsResult = true
}

// Clears data, resets calculator
const clear = () => {
  operation.displayText = ''
  operation.value1 = ''
  operation.value2 = ''
  operation.operator= ''
  operation.result = ''
  operation.displayIsResult = false
  display.innerText = operation.displayText
}

const isValid = (button) => {
  //check for existing decimal
  if (button === 'decimal') {
    for(let i = 0; i < operation.displayText.length; i++) {
      if (operation.displayText[i] === '.') {
        return false
      }
    }
  }
  //check if displayText length is greater than 8
  if (operation.displayText.length >= 8) {
    return false
  }
  // return true if passes above checks
  return true
}

const updateDisplay = (button) => {
  if (button === 'decimal') {
    operation.displayText += '.'
  } else {
    operation.displayText += parseInt(button)
  }
  display.innerText = operation.displayText
}

for (const button of buttons) {
  button.addEventListener('click', buttonPress)
}

