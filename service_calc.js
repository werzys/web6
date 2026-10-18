document.addEventListener("DOMContentLoaded", function () {
    'use strict';

    const quantityInput = document.getElementById("service-quantity");
    const quantityError = document.getElementById("service-quantity-error");
    const typeRadios = document.getElementsByName("serviceType");
    const optionsBlock = document.getElementById("service-options-block");
    const selectOption = document.getElementById("service-option");
    const propertiesBlock = document.getElementById("service-properties-block");
    const expressCheckbox = document.getElementById("prop-express");
    const totalPriceSpan = document.getElementById("service-total-price");


    const prices = {
        types: {
            type1: 1000,
            type2: 2000,
            type3: 3500
        },
        options: {
            opt1: 0,
            opt2: 500,
            opt3: 1000
        },
        properties: {
            express: 700
        }
    };

    function updateServicePrice() {
        quantityError.textContent = "";

        const quantityVal = quantityInput.value.trim();
        const regex = /^\d+$/;

        if (!regex.test(quantityVal)) {
            quantityError.textContent = "Введите целое положительное число!";
            totalPriceSpan.textContent = "0 руб.";
            return;
        }

        const quantity = parseInt(quantityVal, 10);
        if (quantity <= 0) {
            quantityError.textContent = "Количество должно быть больше нуля!";
            totalPriceSpan.textContent = "0 руб.";
            return;
        }

        let selectedType = "type1";
        typeRadios.forEach(function (radio) {
            if (radio.checked) {
                selectedType = radio.value;
            }
        });

        let currentPrice = prices.types[selectedType];

       
        if (selectedType === "type1") {
            optionsBlock.style.display = "none";
            propertiesBlock.style.display = "none";
        }
        
        else if (selectedType === "type2") {
            optionsBlock.style.display = "block";
            propertiesBlock.style.display = "none";

            const optValue = selectOption.value;
            if (prices.options[optValue] !== undefined) {
                currentPrice += prices.options[optValue];
            }
        }
        
        else if (selectedType === "type3") {
            optionsBlock.style.display = "none";
            propertiesBlock.style.display = "block";

            if (expressCheckbox.checked) {
                currentPrice += prices.properties.express;
            }
        }

        const totalPrice = currentPrice * quantity;
        totalPriceSpan.textContent = totalPrice + " руб.";
    }

    
    quantityInput.addEventListener("input", updateServicePrice);

    typeRadios.forEach(function (radio) {
        radio.addEventListener("change", updateServicePrice);
    });

    selectOption.addEventListener("change", updateServicePrice);
    expressCheckbox.addEventListener("change", updateServicePrice);

    
    updateServicePrice();
});
