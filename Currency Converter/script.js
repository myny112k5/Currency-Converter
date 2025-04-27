
const apiUrl = 'https://api.exchangerate-api.com/v4/latest/USD';

const fromCurrency = document.getElementById('fromCurrency');
const toCurrency = document.getElementById('toCurrency');
const amount = document.getElementById('amount');
const convertButton = document.getElementById('convert');
const result = document.getElementById('result');

async function loadCurrencies() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const currencies = Object.keys(data.rates);

        currencies.forEach(currency => {
            const option1 = document.createElement('option');
            option1.value = currency;
            option1.textContent = currency;

            const option2 = document.createElement('option');
            option2.value = currency;
            option2.textContent = currency;

            fromCurrency.appendChild(option1);
            toCurrency.appendChild(option2);
        });

        fromCurrency.value = 'USD';
        toCurrency.value = 'INR';

    } catch (error) {
        console.error('Error loading currencies:', error);
    }
}

async function convertCurrency() {
    const from = fromCurrency.value;
    const to = toCurrency.value;
    const amountValue = amount.value;

    if (amountValue.length == 0) {
        result.innerText = "Please enter an amount.";
        return;
    }

    try {
        const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${from}`);
        const data = await response.json();
        const rate = data.rates[to];
        const convertedAmount = (amountValue * rate).toFixed(2);

        result.innerText = `${amountValue} ${from} = ${convertedAmount} ${to}`;
    } catch (error) {
        console.error('Error converting currency:', error);
        result.innerText = "Conversion failed.";
    }
}

convertButton.addEventListener('click', convertCurrency);

loadCurrencies();
