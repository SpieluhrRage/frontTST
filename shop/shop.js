"use strict";

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
    const bell = document.querySelector('.bell');
      const dropdown = document.querySelector('.dropdown');
      
      // Функция для показа dropdown
      function showDropdown() {
        dropdown.style.visibility = 'visible';
        dropdown.style.opacity = '1';
      }
      
      // Функция для скрытия dropdown
      function hideDropdown() {
        dropdown.style.visibility = 'hidden';
        dropdown.style.opacity = '0';
      }
    if (cartItemsContainer.children.length > 0) {
      // Добавляем события
      bell.addEventListener('mouseenter', showDropdown); // Показываем при наведении на bell
      dropdown.addEventListener('mouseleave', hideDropdown); // Скрываем при уходе с dropdown
      
      // Дополнительно: скрытие, если курсор уходит с bell
      bell.addEventListener('mouseleave', () => {
        setTimeout(() => {
          if (!dropdown.matches(':hover')) {
            hideDropdown();
          }
        }, 200); // Короткая задержка для плавности
      });
    } else {
      hideDropdown();
    }
  }

  function updateTotalDisplay() {
    totalDisplay.textContent = cartTotal.value > 0 ? `Итого: ${cartTotal.value} Р` : "";
    totalAdapt.textContent = cartTotal.value > 0 ? `Итого: ${cartTotal.value} Р` : "";
    cartIcon.style.color = cartTotal.value > 0 ? "#fff200" : "currentColor";
    toggleDropdownVisibility();
  }

  function addToCart(itemName, itemPrice) {
    // Проверяем, есть ли уже товар в корзине
    let existingItem = Array.from(cartItemsContainer.children).find(item => 
        item.querySelector(".item-name").textContent === itemName
    );

    if (existingItem) {
        // Если товар уже есть, увеличиваем его количество
        const quantityElement = existingItem.querySelector(".item-quantity");
        let quantity = parseInt(quantityElement.textContent);
        quantity++;
        quantityElement.textContent = `${quantity} шт`;

        // Обновляем итоговую сумму
        cartTotal.add(itemPrice);
    } else {
        // Если товара нет, создаём новый элемент
        const newItem = document.createElement("div");
        newItem.classList.add("dropdown-item");
        newItem.innerHTML = `
            <span class="item-name">${itemName}</span>
            <span class="item-quantity">1 шт</span>
            <span class="item-price">${itemPrice} Р</span>
            <button class="decrease">-</button>
            <button class="increase">+</button>
            <button class="remove">Удалить</button>
        `;

        cartItemsContainer.appendChild(newItem);

        // Обновляем итоговую сумму
        cartTotal.add(itemPrice);

        // Получаем кнопки для управления товаром
        const decreaseButton = newItem.querySelector(".decrease");
        const increaseButton = newItem.querySelector(".increase");
        const removeButton = newItem.querySelector(".remove");

        // Добавляем обработчик для уменьшения количества
        decreaseButton.addEventListener("click", () => {
            const quantityElement = newItem.querySelector(".item-quantity");
            let quantity = parseInt(quantityElement.textContent);

            if (quantity > 1) {
                quantity--;
                quantityElement.textContent = `${quantity} шт`;

                // Обновляем итоговую сумму
                cartTotal.subtract(itemPrice);
            } else {
                // Если количество стало 0, удаляем товар
                cartTotal.subtract(itemPrice);
                newItem.remove();
            }

            updateTotalDisplay();
        });

        // Добавляем обработчик для увеличения количества
        increaseButton.addEventListener("click", () => {
            const quantityElement = newItem.querySelector(".item-quantity");
            let quantity = parseInt(quantityElement.textContent);
            quantity++;
            quantityElement.textContent = `${quantity} шт`;

            // Обновляем итоговую сумму
            cartTotal.add(itemPrice);
            updateTotalDisplay();
        });

        // Добавляем обработчик для удаления товара
        removeButton.addEventListener("click", () => {
            const quantityElement = newItem.querySelector(".item-quantity");
            let quantity = parseInt(quantityElement.textContent);

            // Уменьшаем итоговую сумму на количество удалённого товара
            cartTotal.subtract(quantity * itemPrice);
            newItem.remove();
            updateTotalDisplay();
        });
    }

    // Обновляем отображение итоговой суммы
    updateTotalDisplay();
}

// Привязываем обработчики событий к кнопкам добавления
document.querySelectorAll(".b").forEach(button => {
    button.addEventListener("click", () => {
        const itemName = button.getAttribute("data-name");
        const itemPrice = +button.getAttribute("data-price");
        addToCart(itemName, itemPrice);
    });
});

toggleDropdownVisibility();


}
const container = document.querySelector('.cont');
const sortToggleButton = document.getElementById('sort-toggle');
const sortIcon = document.getElementById('sort-icon');
const sortText = document.getElementById('sort-text');

function sortItems(order) {
    const items = Array.from(container.children);

    // Сортируем товары по цене
    items.sort((a, b) => {
        const priceA = parseInt(a.querySelector('.b').getAttribute('data-price'), 10);
        const priceB = parseInt(b.querySelector('.b').getAttribute('data-price'), 10);
        return order === 'asc' ? priceA - priceB : priceB - priceA;
    });

    // Переставляем элементы в DOM
    items.forEach(item => container.appendChild(item));
}

sortToggleButton.addEventListener('click', () => {
    const currentOrder = sortToggleButton.getAttribute('data-order');
    const newOrder = currentOrder === 'asc' ? 'desc' : 'asc';

    // Сортируем товары
    sortItems(newOrder);

    // Обновляем атрибут, текст и иконку кнопки
    sortToggleButton.setAttribute('data-order', newOrder);
    sortText.textContent = newOrder === 'asc' 
        ? 'По возрастанию цены'
        : 'По убыванию цены';
    sortIcon.style.transform = newOrder === 'asc' ? 'scaleY(1)' : 'scaleY(-1)';
});
