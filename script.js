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



document.querySelectorAll('.menu a').forEach(item => {
    item.addEventListener('click', () => {
        document.getElementById('menu-toggle').checked = false;
    });
});

const button = document.querySelector('.js');
const svg = button.querySelector('svg');
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