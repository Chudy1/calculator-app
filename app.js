const calculate = function (n1, operator, n2) {
  const firstNumber = parseFloat(n1);
  const secondNumber = parseFloat(n2);

  if (operator === "add") return firstNumber + secondNumber;
  if (operator === "subtract") return firstNumber - secondNumber;
  if (operator === "divide") return firstNumber / secondNumber;
  if (operator === "multiply") return firstNumber * secondNumber;
};

const calculatorApp = document.querySelector(".container");
const display = calculatorApp.querySelector(".display");
const calculatorKeys = calculatorApp.querySelector(".keys");

calculatorKeys.addEventListener("click", (e) => {
  //1. First determine if a button has been pressed

  if (e.target.matches("button")) {
    const key = e.target;
    const action = key.dataset.action;
    const keyContent = key.textContent;
    const displayContent = display.textContent;
    const previousKeyType = calculatorApp.dataset.previousKeyType;

    if (!action) {
      //To display the clicked key if nothing has been done or an operator key has been pressed
      //Action is any operation aside numbers

      if (
        displayContent === "0" ||
        previousKeyType === "operator" ||
        previousKeyType === "equalsTo"
      ) {
        display.textContent = keyContent;
      } else {
        display.textContent = displayContent + keyContent;
      }

      calculatorApp.dataset.previousKeyType = "numbers";
    }

    if (action === "decimal") {
      if (!displayContent.includes(".")) {
        display.textContent = displayContent + ".";
      } else if (
        previousKeyType === "operator" ||
        previousKeyType === "equalsTo"
      ) {
        display.textContent = "0";
      }
      calculatorApp.dataset.previousKeyType = "decimal";
    }

    if (
      action === "add" ||
      action === "subtract" ||
      action === "multiply" ||
      action === "divide"
    ) {
      const firstValue = calculatorApp.dataset.firstValue;
      const operator = calculatorApp.dataset.operator;
      const secondValue = displayContent;

      if (
        firstValue &&
        operator &&
        previousKeyType !== "operator" &&
        previousKeyType !== "equalsTo"
      ) {
        const calcValue = calculate(firstValue, operator, secondValue);
        display.textContent = calcValue;

        //Update the firstvalue to be calcValue
        calculatorApp.dataset.firstValue = calcValue;
      } else {
        calculatorApp.dataset.firstValue = displayContent;
      }

      calculatorApp.dataset.previousKeyType = "operator";
      calculatorApp.dataset.operator = action;
    }

    if (action === "equalsTo") {
      //The necessary data for calculations
      //This is the second value displayed
      let firstValue = calculatorApp.dataset.firstValue;
      let secondValue = displayContent;
      const action = calculatorApp.dataset.operator;

      if (firstValue) {
        if (previousKeyType === "equalsTo") {
          firstValue = displayContent;
          secondValue = calculatorApp.dataset.modVal;
        }

        display.textContent = calculate(firstValue, action, secondValue);
      }

      calculatorApp.dataset.modVal = secondValue;
      calculatorApp.dataset.previousKeyType = "equalsTo";
    }

    if (action === "del") {
      console.log("Delete a per digit key");
      calculatorApp.dataset.previousKeyType = "del";
    }

    if (action === "clear") {
      console.log("Clear the entire display key");

      calculatorApp.dataset.firstValue = "";
      calculatorApp.dataset.secondValue = "";
      calculatorApp.dataset.modValue = "";
      calculatorApp.dataset.operator = "";

      display.textContent = "0";

      calculatorApp.dataset.previousKeyType = "clear";
    }
  }
});
