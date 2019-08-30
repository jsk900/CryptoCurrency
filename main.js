window.onload = () => start();

//Globals
//Cryto-Currencies
const cryptoTypes = [
  '0',
  'BTC',
  'ETH',
  'LTC',
  'ZEC',
  'DASH',
  'XRP',
  'XMR',
  'NEO',
  'ADA',
  'EOS'
];

//Cryto-currency names
const cryptoNames = [
  'Crypto-Currency Select',
  'Bitcoin',
  'Ethereum',
  'Litecoin',
  'Zcash',
  'Dash',
  'Ripple',
  'Monero',
  'NEO',
  'Cardano',
  'EOS'
];

//Currency type
const currTypes = ['0', 'GBP', 'USD', 'EUR', 'CAD', 'AUD', 'TRY', 'BRL'];

//Currency names
const currNames = [
  'Currency Select',
  'British Pound Sterling',
  'US Dollar',
  'European Euro',
  'Canadian Dollar',
  'Australian Dollar',
  'Turkish Lira',
  'Brazilian Real'
];

//Currency unicode symbols
const currencyUnicodes = [
  '',
  '\u00A3',
  '\u0024',
  '\u20AC',
  '\u0043\u0024',
  '\u0041\u0024',
  '\u20BA',
  '\u0052\u0024'
];

//Url for crypto currency converter
const url = 'https://api.cryptonator.com/api/ticker/';

let cryptoValue, currencyValue, numberValue;

//DOM Elements
const cryptoSelect = document.querySelector('#crypto');
const currencySelect = document.querySelector('#currency');
const input = document.querySelector('input[type="number"]');
const convert = document.querySelector('button');
const results = document.querySelector('.results p');

//Functions
//Main start build lists
const start = () => {
  cryptoTypes.map((type, index) => {
    const option = document.createElement('option');
    option.value = type;
    option.innerHTML = cryptoNames[index];
    cryptoSelect.appendChild(option);
    convert.disabled = true;
    convert.style = 'opacity: 0.5';
  });

  currTypes.map((type, index) => {
    const option = document.createElement('option');
    option.value = type;
    option.innerHTML = currNames[index];
    currencySelect.appendChild(option);
  });
};

//Get data from api
const dataLoad = () => {
  let urlLoad = `${url}${cryptoValue}-${currencyValue}`;
  fetch(urlLoad)
    .then(checkStatus)
    .then(response => response.json())
    .then(response => show(response))
    .catch(error => errorHandler(error));
};

//Deal with promise
const checkStatus = response => {
  if (response.ok) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(new Error(response.statusText));
  }
};

//Show data
const show = data => {
  let cryptoIndex = cryptoTypes.findIndex(value => value === cryptoValue);
  let cryptoName = cryptoNames[cryptoIndex];
  let currencyIndex = currTypes.findIndex(value => value === currencyValue);
  let currencyName = currNames[currencyIndex];
  let unicode = currencyUnicodes[currencyIndex];
  let conversion = Math.ceil(numberValue * data.ticker.price);
  results.innerHTML = `You converted ${numberValue} ${cryptoName} to ${currencyName} which equals        <strong>${unicode}${conversion}</strong>`;
};

//Handle errors
const errorHandler = error => {
  if (error != '') {
    results.innerHTML = `There seems to be a problem <br> ${error}`;
  }
};

//Listeners
//Expand list
cryptoSelect.addEventListener('mouseenter', e => {
  cryptoSelect.style = 'margin-bottom: 200px';
});

//Collapse list
cryptoSelect.addEventListener('mouseleave', e => {
  cryptoSelect.style = 'margin-bottom: 20px';
});

//Expand list
currencySelect.addEventListener('mouseenter', e => {
  currencySelect.style = 'margin-bottom: 200px';
});

//Collapse list
currencySelect.addEventListener('mouseleave', e => {
  currencySelect.style = 'margin-bottom: 20px';
});

//Select crypto currency
cryptoSelect.addEventListener('click', e => {
  cryptoValue = e.target.value;
});

//Select currency
currencySelect.addEventListener('click', e => {
  currencyValue = e.target.value;
});

//Convert button clicked
convert.addEventListener('click', () => {
  numberValue = parseInt(input.value);
  convert.disabled = true;
  convert.style = 'opacity: 0.5';
  dataLoad();
});

//Show convert button
input.addEventListener('mouseleave', () => {
  convert.disabled = false;
  convert.style = 'opacity: 1';
});
