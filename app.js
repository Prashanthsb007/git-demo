
import { account, transactions } from "./data.js";

const balanceElement = document.getElementById("balance");
const messageElement = document.getElementById("message");
const transactionList = document.getElementById("transactionList");

document.getElementById("accountName").textContent =
    account.holderName;

document.getElementById("accountNumber").textContent =
    account.accountNumber;

function updateBalance() {
    balanceElement.textContent =
        "₹" + account.balance.toLocaleString("en-IN");
}

function displayTransactions() {
    transactionList.innerHTML = "";

    transactions.forEach(transaction => {
        const item = document.createElement("li");

        item.textContent =
            `${transaction.date} - ${transaction.type}: ₹${transaction.amount.toLocaleString("en-IN")}`;

        transactionList.appendChild(item);
    });
}

function addTransaction(type, amount) {
    transactions.unshift({
        type: type,
        amount: amount,
        date: new Date().toISOString().split("T")[0]
    });

    displayTransactions();
}

function getAmount() {
    const amount = Number(
        document.getElementById("amount").value
    );

    if (!Number.isSafeInteger(amount) || amount <= 0) {
        messageElement.textContent =
            "Please enter a valid whole-number amount.";
        return null;
    }

    return amount;
}

window.deposit = function () {
    const amount = getAmount();

    if (amount === null) return;

    account.balance += amount;

    addTransaction("Deposit", amount);
    updateBalance();

    messageElement.textContent =
        "Amount deposited successfully!";
};

window.withdraw = function () {
    const amount = getAmount();

    if (amount === null) return;

    if (amount > account.balance) {
        messageElement.textContent =
            "Insufficient balance!";
        return;
    }

    account.balance -= amount;

    addTransaction("Withdrawal", amount);
    updateBalance();

    messageElement.textContent =
        "Amount withdrawn successfully!";
};

updateBalance();
displayTransactions();
