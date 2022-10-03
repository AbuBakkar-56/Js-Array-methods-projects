const account1={
    accountName:'Jonas Schemetdman',
    transactions:[1000,232,442,444,211,133,-111,-399,-190,210,-110],
    intrest:1.2,
    pin:1221,
}
const account2={
    accountName:'Williams Smith',
    transactions:[900,1200,-1000,300,-400,200,-210],
    intrest:1.2,
    pin:1291,
}
const account3={
    accountName:'Jonas Roger Bill',
    transactions:[500,800,300,-450,300,-750,10,-50],
    intrest:1.2,
    pin:1241,
}
const account4={
    accountName:'Noers Smith Max',
    transactions:[1000,1200,2000,-1500,-400,3000,2100],
    intrest:1.2,
    pin:1771,
};
const accounts=[account1,account2,account3,account4];
const mainApp=document.querySelector('.app')
const movementsContainer=document.querySelector('.movements');
const movementsRow=document.querySelector('.movements__row');
const balance=document.querySelector('.balance__value');
const transactionsin=document.querySelector('.summary__value--in');
const transactionsOut=document.querySelector('.summary__value--out');
const transactionsintrest=document.querySelector('.summary__value--interest');
const userLoginAccount=document.querySelector('.login__input--user');
const userLoginPin=document.querySelector('.login__input--pin');
const btnLogin=document.querySelector('.login__btn')
const welcomeMsg=document.querySelector('.welcome');
const app=document.querySelector('.app')
const transferTo=document.querySelector('.form__input--to')
const transferAmount=document.querySelector('.form__input--amount');
const btnTransfer=document.querySelector('.form__btn--transfer');
const btnSort=document.querySelector('.btn--sort');
const btnLoan=document.querySelector('.form__btn--loan');
const loadAmount=document.querySelector('.form__input--loan-amount');
const btnCloseAccount=document.querySelector('.form__btn--close');
const labelconfirmUser=document.querySelector('.form__input--user');
const labelconfirmPin=document.querySelector('.form__input--pin')
//application
let displayTransactions=function(acc,sort=false){
    const movs=sort?acc.slice().sort((a,b)=>a-b):acc
    movementsContainer.innerHTML=``;
    //acc
     movs.forEach(function(val,index){
        const type=val>0?"deposit":"withdrawal"; 
        const html=`
        <div class="movements__row">
        <div class="movements__type movements__type--${type}">${index+1} ${type}</div>
        <div class="movements__value">${val}</div>
      </div>
        `;
        movementsContainer.insertAdjacentHTML('afterbegin',html)
     })
};
let accBalance;
const calcTransactions=function(acc){
    accBalance=acc.reduce((acc,sum)=>acc+sum,0);
    balance.textContent=`${accBalance}€`;
};
const calcDepositTransactions=function(acc){
   const calcs=acc.filter(fr=>fr>0).reduce((acc,sum)=>acc+sum,0);
   transactionsin.textContent=`${calcs}€`
};
calcDepositTransactions(account1.transactions);
const calcWithdrawTransactions=function(acc){
   const calcs=acc.filter(fr=>fr<0).reduce((acc,sum)=>acc+sum,0);
   transactionsOut.textContent=`${calcs}€`;
}
const calcIntrestRate=function(acc){
  const calcs=acc.filter(fr=>fr>0).map(mp=>mp*1.2/100).reduce((acc,sum)=>acc+sum,0);
  transactionsintrest.textContent=`${Math.floor(calcs)}€`;
};
const userNames=function(accs){
    accs.forEach(function(acc){
      acc.userName=acc.accountName.
      toLowerCase().split(' ').map(n=>n[0]).join('')
    })
};
userNames(accounts);
//userLogin
let currentUser;
btnLogin.addEventListener('click',function(e){
    e.preventDefault();
    currentUser=accounts.find((acc)=>acc.userName===userLoginAccount.value);
    if(currentUser?.pin===+(userLoginPin.value)){
        welcomeMsg.textContent=`Welcome Back ${currentUser.accountName}`;
        app.style.opacity=100;
        displayTransactions(currentUser.transactions);
        calcTransactions(currentUser.transactions);
        calcWithdrawTransactions(currentUser.transactions);
        calcIntrestRate(currentUser.transactions);
    }else if(currentUser.pin!=+(userLoginPin.value)){
        welcomeMsg.textContent=`Wrong Credentials Try Agin`
    }
});
btnTransfer.addEventListener('click',function(e){
     e.preventDefault();
     const reciverAccount=accounts.find(f=>f.userName===transferTo.value);
     const amount=+(transferAmount.value);
    if(amount>0 && accBalance>=amount && reciverAccount.userName!==transferTo.userName){
        localStorage.setItem('item',currentUser.transactions.push(-amount))
        localStorage.setItem('item',reciverAccount.transactions.push(amount))
        displayTransactions(currentUser.transactions);
        calcTransactions(currentUser.transactions);
        calcWithdrawTransactions(currentUser.transactions);
        calcIntrestRate(currentUser.transactions);
    }
})
btnLoan.addEventListener('click',function(e){
    e.preventDefault();
    const amountValue=+(loadAmount.value);
    amountValue.value=0;
    if(amountValue>0){
    currentUser.transactions.push(amountValue);
        displayTransactions(currentUser.transactions);
        calcTransactions(currentUser.transactions);
        calcWithdrawTransactions(currentUser.transactions);
        calcIntrestRate(currentUser.transactions);
        calcDepositTransactions(currentUser.transactions);
    }
});
btnCloseAccount.addEventListener('click',function(e){
    e.preventDefault();
    const confirmUser=accounts.find(f=>f.userName===labelconfirmUser.value);
    if(currentUser.pin===+(labelconfirmPin.value)){
        confirmUser.transactions.fill(Math.floor(Math.random*234345234323245))+66654773723;
        confirmUser.pin=Math.floor(Math.random()*8909982447567585)+198334443;
        mainApp.style.opacity=0;
        welcomeMsg.textContent=`Account Deleted Successfully`;
    }
});
let sorted=false;
btnSort.addEventListener('click',function(e){
    e.preventDefault();
    displayTransactions(currentUser.transactions,!sorted);
    sorted=!sorted
});

//flat and flatmap
const arr=[23,13,442,13,133,122,90,323];
// console.log(arr.reverse());
// console.log(arr.push(90));
// console.log(arr.pop());
// console.log(arr.unshift(90));
// console.log(arr.shift());
// console.log(arr.splice(1,2,'x','x'));
// console.log(arr.at(2));
// console.log(arr.slice(2,5));
// console.log(arr.slice(-2));
// const f=arr.find(f=>f>90)
// const f=arr.findIndex(f=>f>90)
// const f=arr.some(s=>s>90)
// const f=arr.every(e=>e>0)
// const f=arr.sort((a,b)=>b-a)
//flat and flatmap
// const array=[23,23,11,332,[212,332],[32,11,[12,11]]];
// const flat=array.flat(2);
// console.log(array);
// console.log(flat);
// console.log([34,21,34,24,23]);
// console.log(new Array(34,89,90,13));
// let arrs=new Array(3);
// arrs.fill(9)
// console.log(arrs);
// let arrss;
// arrss.from({length:7},()=>7);
// console.log(arrss)
