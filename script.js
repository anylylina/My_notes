let a = ""; // first number
let b = ""; // second number
let sign = ""; // знак операции
let finish = false;

const digit = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
const action = ["-", "+", "X", "/"];

//экран
const display = document.querySelector(".calc-screen p");

function updateFontSize() {
  if (display.textContent.length > 7) {
    display.style.fontSize = "3rem";
  }
  if (display.textContent.length > 10) {
    display.style.fontSize = "2rem";
  }
  if (display.textContent.length > 14) {
    display.style.fontSize = "1.5rem";
  }
}

document.addEventListener("click", updateFontSize); // Проверять при каждом клике

const out = document.querySelector(".calc-screen p");

function clearAll() {
  a = "";
  b = "";
  sign = "";
  finish = false;
  out.textContent = 0;
}

document.querySelector(".ac").onclick = clearAll;

document.querySelector(".buttons").onclick = (event) => {
  //нажата не кнопка
  if (!event.target.classList.contains("btn")) return;
  //нажата кноака clearAll
  if (event.target.classList.contains("ac")) return;

  out.textContent = "";
  //получаю нажатую кнопку
  const key = event.target.textContent;

  //если нажата кнопка 0-9 или .
  if (digit.includes(key)) {
    if (b === "" && sign === "") {
      a += key;

      out.textContent = a;
    } else if (a !== "" && b !== "" && finish) {
      b = key;
      finish = false;
      out.textContent = b;
    } else {
      b += key;
      out.textContent = b;
    }
    console.table(a, b, sign);
    return;
  }

  // если нажата клавиша + - / *
  if (action.includes(key)) {
    sign = key;
    out.textContent = sign;
    console.table(a, b, sign);
    return;
  }

  //нажата равно =
  if (key === "=") {
    if (b === "") b = a;

    switch (sign) {
      case "+":
        a = +a + +b;
        break;

      case "-":
        a = a - b;
        break;

      case "X":
        a = a * b;
        break;

      case "/":
        if (b === "0") {
          out.textContent = "Error";
          a = "";
          b = "";
          sign = "";
          return;
        }
        a = a / b;
        break;
    }
    finish = true;
    out.textContent = a;
    console.table(a, b, sign);
  }
};
