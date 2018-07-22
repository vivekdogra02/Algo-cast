
// You are given coins of different denominations and a total amount of money.
//Write a function to compute the number of combinations that make up that amount. 
// Example amout = 12 coins = [1,2,5]  o/P = 13
function change(amount, coins) {
    let combinations = new Array(amount +1);
    combinations[0] = 1;
    
    for(coin of coins) {
        for(let i=1; i< combinations.length; i++) {
            if(i>=coin) {
                combinations[i] += combinations[i - coin];
            }
        }
    }
    return combinations[amount];
}


// Through recursion  O/P = 3
let coins =  [1,2];
let amount = 4
function changeRecursion(amount, currentCoin){
    if(amount === 0) return 1;
    if(amount < 0) return 0;

    let combos=0;
    for (let i = currentCoin; i < coins.length; i++) {
        combos += changeRecursion(amount - coins[i], i);
    }                                               // current coin
    return combos;
}