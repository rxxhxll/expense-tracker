# Personal Wealth & Expense Tracker

A simple and user-friendly web application to manage personal finances by tracking income and expenses. This project helps users understand their spending habits through visual charts and real-time summaries.


## Features

- Add transactions with title, amount, category, and type (Income/Expense)
- View total income, total expenses, and current balance
- Visual representation of expenses using a pie chart
- Edit and delete transactions
- Data persists using LocalStorage
- Instant UI updates without page reload
- Handles invalid inputs and edge cases

## Tech Stack

- HTML  
- CSS  
- JavaScript (Vanilla JS)  
- Chart.js (for data visualization)

## Why these?
I chose simple frontend technologies to focus on core logic, clean UI, and real-time data handling without relying on frameworks.

## How to Run Locally

1. Download or clone the repository  
2. Open the project folder  
3. Open `index.html` in your browser  

No additional setup required.

## Functionality Overview

- All financial calculations (income, expense, balance) are handled on the frontend using JavaScript.
- The chart updates automatically whenever a transaction is added, edited, or deleted.
- Data is stored in LocalStorage, so it remains even after refreshing the page.

## Edge Case Handling

- Prevents empty inputs
- Blocks non-numeric and negative values
- Restricts extremely large values
- Handles empty transaction state gracefully

## Precision Handling

Currency values are formatted using:
- Indian currency format (₹)
- Two decimal precision using `Intl.NumberFormat`

## Trade-offs & Improvements

- Used LocalStorage instead of a backend database for simplicity
- No user authentication implemented
- Limited categories

 ## Conclusion

This project focuses on clean UI, accurate calculations, and smooth user experience. It demonstrates strong fundamentals in frontend development and problem-solving.

---