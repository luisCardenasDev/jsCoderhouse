Invoice Registration Simulator

This project is a simple JavaScript console-based simulator that allows users to register invoices through dialog boxes (prompt, alert, confirm).
It validates the input data, stores the invoices in an array, and finally displays them in the browser console ordered by the most recent date.

Features
Register invoices with:
Invoice number (must be unique and non-empty).
Description (required).
RUC/RUS of the issuer (8–11 digits, numeric only).
Date in DD-MM-YYYY format (validated against the calendar).
Base amount (positive number).
VAT percentage (0–100).
Discount percentage (0–100).

Automatic calculation of:
VAT amount.
Discount amount.
Total invoice amount.

Invoices are stored in memory and printed in the console sorted by date (most recent first).
After each registration, a summary is displayed via alert.

Usage
Open the HTML file in a browser.
The simulator starts automatically.
Follow the prompts to enter invoice data.
After finishing, check the browser console (F12 → Console tab) to see the full list of invoices.
