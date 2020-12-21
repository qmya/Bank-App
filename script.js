'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const euroToUSD = 1.1; //1.23

const displayMovements = function (movements) {
  //lets make the container empty so it does not have any html elements inside 👇🏽
  containerMovements.innerHTML = '';

  movements.forEach(function (movement, index) {
    const type = movement > 0 ? 'deposit' : 'withdrawal';
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      index + 1
    } ${type} </div>
        <div class="movements__value">${movement}</div>
      </div> 
   `;
    //inserting an html by using "insertAdjacentHTML" and it takes 2 perimeters one is ftn & other is the htm element you wanna insert it 😀
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
displayMovements(account1.movements);
console.log(containerMovements.innerHTML);

//REDUCE METHOD
//accumulator acts as SNOWBALL
const calculateDisplayBalance = function (movements) {
  const balance = movements.reduce(function (accum, movement, index, arr) {
    console.log(accum, movement);
    return accum + movement;
  }, 0); // 👈🏽 0 is because we want to give Accum an initial value of 0
  console.log(balance); //3840
  labelBalance.textContent = `${balance}€`;
};

console.log(calculateDisplayBalance(account1.movements));

const calculateDisplaySummary = function (movements) {
  //Deposits total
  const incomes = movements
    .filter(movement => movement > 0)
    .map(movement => movement * euroToUSD)
    .reduce((accum, movement) => accum + movement, 0);
  labelSumIn.textContent = `${Math.round(incomes)}€`;
  console.log(incomes);
  //Withdrawals total
  const outGoing = movements
    .filter(movement => movement < 0)
    .map(movement => movement * euroToUSD)
    .reduce((accum, movement) => Math.abs(accum + movement, 0));
  labelSumOut.textContent = `${Math.round(outGoing)}€`;
  //Interest =  1.2% of deposits
  const interest = movements
    .filter(movement => movement > 0)
    .map(deposit => deposit * (1.2 / 100))
    .filter((int, index, arr) => int >= 1)
    .reduce((accum, inter) => accum + inter, 0);
  labelSumInterest.textContent = `${interest}€`;
};

calculateDisplaySummary(account1.movements);

// const user = 'Steven Thomas Williams'; //stw
// const username = user.toLowerCase().split(' ');
// console.log(username);

//change the normal funtion 👉🏽 🏹Function: just remove the function keyword & replaceit with => before {}
const createUsernames = function (userAccounts) {
  console.log(userAccounts); //It will give the whole array of accounts with the values of each element too

  userAccounts.forEach(function (userAccount) {
    userAccount.username = userAccount.owner
      .toLowerCase()
      .split(' ') //create an array
      .map(name => name[0])
      .join(''); //Change the array and join it will no space
    console.log(userAccount.username);
  });
};

createUsernames(accounts);
console.log(accounts);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const totalDepositsInUSD = movements
  .filter((mov, index, arr) => {
    console.log(mov, index, arr);
    return mov > 0;
  })
  .map((mov, index, arr) => {
    console.log(arr, mov);
    return mov * euroToUSD;
  })
  .reduce((accum, mov) => {
    console.log(accum, mov);
    return accum + mov;
  });
console.log(totalDepositsInUSD);

// const deposit = movements
//   .filter(mov => mov > 0)
//   .map((mov, index, arr) => {
//     console.log(arr, mov);
//     return mov * euroToUSD;
//   })
//   .reduce((accum, mov) => {
//     console.log(accum, mov);
//     return accum + mov;
//   });

// console.log(deposit);
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// // LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
