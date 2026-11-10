
const display = document.getElementById("display");

const buttons = document.querySelectorAll("button");

let expression = "";

// Add click event to every button
buttons.forEach(function(button) {

    button.addEventListener("click", function() {

        const value = button.textContent;

        // Clear everything
        if (value === "C") {
            expression = "";
            display.value = "";
            return;
        }

        // Delete last character
        if (value === "DEL") {
            expression = expression.slice(0, -1);
            display.value = expression;
            return;
        }

        // Calculate result
        if (value === "=") {

            if (expression === "") {
                return;
            }

            try {
                // Only allow calculator characters
                if (!/^[0-9+\-*/%.() ]+$/.test(expression)) {
                    throw new Error("Invalid expression");
                }

                const result = Function(
                    '"use strict"; return (' + expression + ')'
                )();

                if (!Number.isFinite(result)) {
                    throw new Error("Invalid result");
                }

                expression = String(
                    Number(result.toPrecision(12))
                );

                display.value = expression;

            } catch (error) {
                display.value = "Error";
                expression = "";
            }

            return;
        }

        // Prevent multiple decimal points in one number
        if (value === ".") {

            const currentNumber = expression.split(/[+\-*/%]/).pop();

            if (currentNumber.includes(".")) {
                return;
            }
        }

        // Add number or operator
        expression += value;

        display.value = expression;

    });

});
