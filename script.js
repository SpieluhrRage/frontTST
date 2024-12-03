"use strict";
/*document.addEventListener("DOMContentLoaded", () => {
  // Всплывающее окно при загрузке сайта
  const login = prompt("Введите ваш логин:");
  if (login === "Админ") {
      const password = prompt("Введите пароль:");
      if (password === "Я главный") {
          alert("Здравствуйте!");
      } else if (!password) {
          alert("Отменено");
      } else {
          alert("Неверный пароль");
      }
  } else if (!login) {
      alert("Отменено");
  } else {
      alert("Я вас не знаю");
  }
});

function isEmpty(input) {
  return input.trim() === "";
}

// Генерация буквенной капчи
function generateLetterCaptcha() {
  const length = 5;
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let captcha = "";

  for (let i = 0; i < length; i++) {
    captcha += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return captcha;
}

// Генерация математической капчи
function generateMathCaptcha() {
  const num1 = Math.floor(Math.random() * 10);
  const num2 = Math.floor(Math.random() * 10);
  return { question: `${num1} + ${num2}`, answer: num1 + num2 };
}

// Основная функция проверки
function runCaptcha() {
  let captcha = generateLetterCaptcha();
  let userInput = prompt(`Введите капчу: ${captcha}`);

  if (isEmpty(userInput)) {
    alert("Поле не должно быть пустым!");
    return runCaptcha();
  }

  if (userInput !== captcha) {
    alert("Неправильно! Переключаемся на числовую капчу.");

    
    const mathCaptcha = generateMathCaptcha();
    userInput = prompt(`Решите пример: ${mathCaptcha.question}`);

    if (isEmpty(userInput)) {
      alert("Поле не должно быть пустым!");
      return runCaptcha();
    }

    if (parseInt(userInput) !== mathCaptcha.answer) {
      alert("Неправильно! Попробуйте ещё раз.");
      return runCaptcha(); 
    }
  }

  alert("Капча пройдена успешно! Форма отправлена.");
}


runCaptcha();*/

document.querySelectorAll('.menu a').forEach(item => {
    item.addEventListener('click', () => {
        document.getElementById('menu-toggle').checked = false;
    });
});

const bell = document.querySelector('.bell');
const dropdown = document.querySelector('.dropdown');
const cartItemsContainer = document.querySelector(".cart-items");
const totalDisplay = document.createElement("span");
const totalAdapt = document.querySelector(".dropdown-item.total");
const cartIcon = document.querySelector(".bell svg");

if (cartItemsContainer) {

  function Accumulator(startingValue) {
    this.value = startingValue;

    this.add = function (amount) {
      this.value += amount;
    };

    this.subtract = function (amount) {
      this.value -= amount;
    };

    this.reset = function () {
      this.value = 0;
    };
  }

  const cartTotal = new Accumulator(0);

  totalDisplay.classList.add("cart-total");
  bell.appendChild(totalDisplay);

  
  function toggleDropdownVisibility() {
    if (cartItemsContainer.children.length > 0) {
      dropdown.style.visibility = 'visible';
      dropdown.style.opacity = '1';
    } else {
      dropdown.style.visibility = 'hidden';
      dropdown.style.opacity = '0';
    }
  }

  function updateTotalDisplay() {
    totalDisplay.textContent = cartTotal.value > 0 ? `Итого: ${cartTotal.value} Р` : "";
    totalAdapt.textContent = cartTotal.value > 0 ? `Итого: ${cartTotal.value} Р` : "";
    cartIcon.style.color = cartTotal.value > 0 ? "#fff200" : "currentColor";
    toggleDropdownVisibility();
  }

  function addToCart(itemName, itemPrice) {
    const newItem = document.createElement("div");
    newItem.classList.add("dropdown-item");
    newItem.innerHTML = `
      <span class="item-name">${itemName}</span>
      <span class="item-quantity">1 шт</span>
      <span class="item-price">${itemPrice}</span> 
      <button class="decrease">-</button>
      <button class="increase">+</button>
      <button class="remove">Удалить</button>
    `;

    cartItemsContainer.appendChild(newItem);
    cartTotal.add(itemPrice);
    updateTotalDisplay();

    const decreaseButton = newItem.querySelector(".decrease");
    const increaseButton = newItem.querySelector(".increase");
    const removeButton = newItem.querySelector(".remove");

    let quantity = 1;

    decreaseButton.addEventListener("click", () => {
      if (quantity > 1) {
        quantity--;
        cartTotal.subtract(itemPrice);
        newItem.querySelector(".item-quantity").textContent = `${quantity} шт`;
        updateTotalDisplay();
      }
    });

    increaseButton.addEventListener("click", () => {
      quantity++;
      cartTotal.add(itemPrice);
      newItem.querySelector(".item-quantity").textContent = `${quantity} шт`;
      updateTotalDisplay();
    });

    removeButton.addEventListener("click", () => {
      cartTotal.subtract(quantity * itemPrice);
      newItem.remove();
      updateTotalDisplay();
    });
  }

  
  document.querySelectorAll(".b").forEach((button) => {
    button.addEventListener("click", () => {
      const itemName = button.getAttribute("data-name");
      const itemPrice = +button.getAttribute("data-price");
      addToCart(itemName, itemPrice);
    });
  });

  
  toggleDropdownVisibility();
}


