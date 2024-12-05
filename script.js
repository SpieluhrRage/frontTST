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


