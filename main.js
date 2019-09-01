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

let cryptoValue, currencyValue, numberValue, paddingPosCrypto, paddingPosCurr;

//DOM Elements
const cryptoSelect = document.querySelector('#crypto');
const currencySelect = document.querySelector('#currency');
const input = document.querySelector('input[type="number"]');
const convert = document.querySelector('button');
const results1 = document.querySelector('.results1 p');
const results2 = document.querySelector('.results2 p');

//Functions
//Main start build lists
const start = () => {
  cryptoTypes.map((type, index) => {
    const option = document.createElement('option');
    option.value = type;
    option.innerHTML = cryptoNames[index];
    cryptoSelect.appendChild(option);

    paddingPosCrypto =
      cryptoSelect.scrollWidth / 2 - cryptoSelect[0].innerHTML.length * 2;
    cryptoSelect.style = `padding-left: ${paddingPosCrypto}px;`;
  });

  currTypes.map((type, index) => {
    const option = document.createElement('option');
    option.value = type;
    option.innerHTML = currNames[index];
    currencySelect.appendChild(option);

    paddingPosCurr =
      currencySelect.scrollWidth / 2 - currencySelect[0].innerHTML.length * 2;
    currencySelect.style = `padding-left: ${paddingPosCurr}px;`;
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
  results1.innerHTML = `You converted ${numberValue} ${cryptoName} to ${currencyName}`;
  results2.innerHTML = `${unicode}${conversion}`;
};

//Handle errors
const errorHandler = error => {
  if (error != '') {
    results1.innerHTML = `There seems to be a problem <br> ${error}`;
  }
};

//Listeners
//Expand list
cryptoSelect.addEventListener('mouseenter', e => {
  e.target.style = `margin-bottom: 175px; padding-left: ${paddingPosCrypto}px;`;
});

//Collapse list
cryptoSelect.addEventListener('mouseleave', e => {
  cryptoSelect.style = `margin-bottom: 20px; padding-left: ${paddingPosCrypto}px`;
});

//Expand list
currencySelect.addEventListener('mouseenter', e => {
  currencySelect.style = `margin-bottom: 140px; padding-left: ${paddingPosCurr}px`;
});

//Collapse list
currencySelect.addEventListener('mouseleave', e => {
  currencySelect.style = `margin-bottom: 20px; padding-left: ${paddingPosCurr}px`;
});

//Select crypto currency
cryptoSelect.addEventListener('click', e => {
  cryptoValue = e.target.value;
  input.value = '';
  results1.innerHTML = '';
  results2.innerHTML = '';
  console.log(e.target.scrollWidth);
  paddingPosCrypto =
    e.target.scrollWidth / 2 - cryptoSelect[0].innerHTML.length * 2;
  e.target.style = `padding-left: ${paddingPosCrypto}px`;
});

//Select currency
currencySelect.addEventListener('click', e => {
  currencyValue = e.target.value;

  paddingPosCurr =
    e.target.scrollWidth / 2 - currencySelect[0].innerHTML.length * 2;
  e.target.style = `padding-left: ${paddingPosCurr}px`;
});

//Show results
input.addEventListener('keyup', e => {
  if (e.which === 13) {
    numberValue = parseInt(input.value);
    dataLoad();
  }
});

convert.addEventListener('click', e => {
  e.preventDefault();
  numberValue = parseInt(input.value);
  dataLoad();
});
