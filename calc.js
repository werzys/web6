document.addEventListener("DOMContentLoaded", function () {
    'use strict';

    const quantityInput = document.getElementById("calc-quantity");
    const productSelect = document.getElementById("calc-product");
    const calcButton = document.getElementById("calc-btn");
    const resultDiv = document.getElementById("calc-result");
    const errorDiv = document.getElementById("calc-error");

    function calculate() {
        const quantityVal = quantityInput.value.trim();
        errorDiv.textContent = "";
        resultDiv.textContent = "";

        const regex = /^\d+$/;
        if (!regex.test(quantityVal)) {
            errorDiv.textContent = "Ошибка: введите целое положительное число!";
            return;
        }

        const quantity = parseInt(quantityVal, 10);
        if (quantity <= 0) {
            errorDiv.textContent = "Ошибка: количество должно быть больше нуля!";
            return;
        }

        const price = parseInt(productSelect.value, 10);
        const total = quantity * price;

        resultDiv.textContent = "Стоимость заказа: " + total + " руб.";
    }

    if (calcButton) {
        calcButton.addEventListener("click", function (event) {
            event.preventDefault();
            calculate();
        });
    }
});