window.onload = () => start();

//Globals
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

const currTypes = ['0', 'GBP', 'USD', 'EUR', 'CAD', 'AUD', 'TRY', 'BRL'];

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

const url = 'https://api.cryptonator.com/api/ticker/';

let cryptoValue, currencyValue, numberValue;

//DOM Elements
const cryptoSelect = document.querySelector('#crypto');
const currencySelect = document.querySelector('#currency');
const input = document.querySelector('input[type="number"]');
const convert = document.querySelector('button');
const results = document.querySelector('.results p');

//Functions
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

const dataLoad = () => {
  let urlLoad = `${url}${cryptoValue}-${currencyValue}`;
  fetch(urlLoad)
    .then(checkStatus)
    .then(response => response.json())
    .then(response => show(response))
    .catch(error => errorHandler(error));
};

const checkStatus = response => {
  if (response.ok) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(new Error(response.statusText));
  }
};

const show = data => {
  let cryptoIndex = cryptoTypes.findIndex(value => value === cryptoValue);
  let cryptoName = cryptoNames[cryptoIndex];
  let currencyIndex = currTypes.findIndex(value => value === currencyValue);
  let currencyName = currNames[currencyIndex];
  let unicode = currencyUnicodes[currencyIndex];
  let conversion = Math.ceil(numberValue * data.ticker.price);
  results.innerHTML = `You converted ${numberValue} ${cryptoName} to ${currencyName} which equals        <strong>${unicode}${conversion}</strong>`;
};

const errorHandler = error => {
  if (error != '') {
    results.innerHTML = `There seems to be a problem <br> ${error}`;
  }
};

//Listeners
cryptoSelect.addEventListener('mouseenter', e => {
  cryptoSelect.style = 'margin-bottom: 200px';
});

cryptoSelect.addEventListener('mouseleave', e => {
  cryptoSelect.style = 'margin-bottom: 20px';
});

currencySelect.addEventListener('mouseenter', e => {
  currencySelect.style = 'margin-bottom: 200px';
});

currencySelect.addEventListener('mouseleave', e => {
  currencySelect.style = 'margin-bottom: 20px';
});

cryptoSelect.addEventListener('click', e => {
  cryptoValue = e.target.value;
});

currencySelect.addEventListener('click', e => {
  currencyValue = e.target.value;
});

convert.addEventListener('click', () => {
  numberValue = parseInt(input.value);
  convert.disabled = true;
  convert.style = 'opacity: 0.5';
  dataLoad();
});

input.addEventListener('mouseleave', () => {
  convert.disabled = false;
  convert.style = 'opacity: 1';
});
