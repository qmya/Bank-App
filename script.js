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
        <div class="movements__value">${movement}€</div>
      </div> 
   `;
    //inserting an html by using "insertAdjacentHTML" and it takes 2 perimeters one is ftn & other is the htm element you wanna insert it 😀
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
// displayMovements(account1.movements);
console.log(containerMovements.innerHTML);

//REDUCE METHOD
//accumulator acts as SNOWBALL
const calculateDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce(function (accum, movement) {
    console.log(accum, movement);
    return accum + movement;
  }, 0); // 👈🏽 0 is because we want to give Accum an initial value of 0
  labelBalance.textContent = `${acc.balance}€`;
};

const calculateDisplaySummary = function (acc) {
  //Deposits total
  const incomes = acc.movements
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
    .map(deposit => deposit * (acc.interestRate / 100))
    .filter((int, index, arr) => int >= 1)
    .reduce((accum, inter) => accum + inter, 0);
  labelSumInterest.textContent = `${interest}€`;
};

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

//Update UI
const updateUI = function (acc) {
  //display the movements
  displayMovements(acc.movements);
  //display the balance
  calculateDisplayBalance(acc);
  //display the sumary
  calculateDisplaySummary(acc);
};
//LOGIN TO GET STARTED
let currentAccount;

//Event Handler
btnLogin.addEventListener('click', function (e) {
  e.preventDefault(); //Prevent the form from submitting
  console.log(`login Button is clicked`);
  //Using find method
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    console.log('LOGIN');
    //display the UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0] //split just take the first name [0]
    }!`;

    containerApp.style.opacity = 100;
    //CLEAR THE INPUT FIELDS
    inputLoginUsername.value = inputLoginPin.value = '';
    //remove the input blinking from the pin field:
    inputLoginPin.blur();
    updateUI(currentAccount);
  }
});
//Tranfer Money
btnTransfer.addEventListener('click', function (e) {
  //Prevent the form from submitting
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  console.log(amount);
  const recieverAccount = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  console.log(recieverAccount);
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    recieverAccount &&
    currentAccount.balance >= amount &&
    recieverAccount?.username !== currentAccount.username
  ) {
    // console.log('money transfered');
    currentAccount.movements.push(-amount); //minus the amount from your account
    recieverAccount.movements.push(+amount); //add the amount from your account
    // Update UI
    updateUI(currentAccount);
  }
});
//Request a loan
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  console.log('Loan Button is clicked');
  const amount = Number(inputLoanAmount.value);
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    //"Any" deposits > 10% and when we use "Any" it means that we have to use some
    //if any of the deposit is true then do this 👇🏽
    //Add the amount to the current account
    currentAccount.movements.push(+amount);
    updateUI(currentAccount);
    inputLoanAmount.value = '';
    inputLoanAmount.blur();
  }
});

//Delete the account of current user
btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  console.log('Delete button');
  //correct user name
  //correct pin
  console.log(currentAccount.username, inputCloseUsername.value);

  console.log(currentAccount.pin);
  console.log(inputClosePin.value);
  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    console.log('Yes, both are equal');
    const index = accounts.findIndex(function (acc) {
      return acc.username === currentAccount.username;
    });
    console.log(index);
    //Deelete the account
    accounts.splice(index, 1); //index and a remove 1 array
    containerApp.style.opacity = 0; //logout the user
  }
  //Clear the input field
  inputCloseUsername.value = inputClosePin.value = '';
});
