"use strict";
document.addEventListener("DOMContentLoaded", () => {
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


runCaptcha();



document.querySelectorAll('.menu a').forEach(item => {
    item.addEventListener('click', () => {
        document.getElementById('menu-toggle').checked = false;
    });
});



const button = document.querySelector('.jsp');

if(button != null){
  const svg = button.querySelector('svg')
  let isDrawing = false; // Состояние "рисования"

// Менять цвет кнопки при нажатии
button.addEventListener('click', () => {
  isDrawing = !isDrawing; // Переключить состояние
  button.style.backgroundColor = isDrawing ? 'red' : '#ccc';
  svg.style.color = isDrawing ? 'white' : 'black';

  // Удалить все сердечки, если "рисование" выключено
  if (!isDrawing) {
    document.querySelectorAll('.heart').forEach((heart) => {
      heart.remove();
    });
  }
});

// SVG-код сердечка
const heartSVG = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path fill="red" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
  </svg>
`;

// Отслеживание движения мыши
document.addEventListener('mousemove', (event) => {
  if (!isDrawing) return; // Если "рисование" выключено, ничего не делать

  const heart = document.createElement('div');
  heart.classList.add('heart');
  heart.style.left = `${event.pageX - 15}px`; // Смещаем, чтобы центр совпал с курсором
  heart.style.top = `${event.pageY - 15}px`;
  heart.innerHTML = heartSVG;
  document.body.appendChild(heart);
});
}



// Конструктор Accumulator


// Создаем экземпляр для хранения общей суммы товаров


// Ссылка на контейнер для элементов корзины
document.addEventListener("DOMContentLoaded", () => {
  const cartItemsContainer = document.querySelector(".cart-items");
  const totalDisplay = document.createElement("span");
  const cartIcon = document.querySelector(".bell svg");
  const totalAdapt = document.querySelector(".dropdown-item.total");

  if (cartItemsContainer) {
    // Функция для накопления итоговой суммы
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
  
    const cartTotal = new Accumulator(0); // Итоговая сумма
    const totalDisplay = document.createElement("span"); // Для отображения рядом с корзиной
    totalDisplay.classList.add("cart-total");
    document.querySelector(".bell").appendChild(totalDisplay);
  
    function updateTotalDisplay() {
      totalDisplay.textContent = cartTotal.value > 0 ? `Итого: ${cartTotal.value} Р` : "";
      totalAdapt.textContent = cartTotal.value > 0 ? `Итого: ${cartTotal.value} Р` : "";
      const cartIcon = document.querySelector(".bell svg");
      cartIcon.style.color = cartTotal.value > 0 ? "#fff200" : "currentColor";
    }
  
    function addToCart(itemName, itemPrice) {
      // Создаем новый элемент для товара
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
  
      // Добавляем товар в контейнер
      cartItemsContainer.appendChild(newItem);
  
      // Обновляем общую сумму
      cartTotal.add(itemPrice);
      updateTotalDisplay();
  
      // Привязываем обработчики для кнопок управления
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
  
    // Привязываем обработчики событий к кнопкам товаров
    document.querySelectorAll(".b").forEach((button) => {
      button.addEventListener("click", () => {
        const itemName = button.getAttribute("data-name");
        const itemPrice = +button.getAttribute("data-price");
        addToCart(itemName, itemPrice);
      });
    });
  }
  
});
