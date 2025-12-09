// Import modules for different features
import { convertCurrency } from "./converter.js";   // Handles currency conversion API calls
import { loadNews } from "./news.js";               // Fetches and displays latest financial news
import { initContactForm } from "./contact.js";     // Manages contact form submission + confirmation

// Grab references to the converter form and result display
const form = document.getElementById("converter-form");
const resultDiv = document.getElementById("result");

// Attach event listener to the converter form
// This runs whenever the user submits a conversion request
form.addEventListener("submit", async (e) => {
  e.preventDefault(); // Prevent page reload on form submission

  // Get user input values
  const amount = document.getElementById("amount").value;
  const fromCurrency = document.getElementById("from-currency").value;
  const toCurrency = document.getElementById("to-currency").value;

  try {
    // Call converter module to fetch conversion rate and calculate result
    const convertedAmount = await convertCurrency(amount, fromCurrency, toCurrency);

    // Display conversion result in the UI
    resultDiv.textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
  } catch {
    // Handle errors gracefully (e.g., API failure, invalid input)
    resultDiv.textContent = "Error fetching conversion rates.";
  }
});

// Initialize the news section (fetches headlines from NewsData.io API)
loadNews();

// Initialize the contact form (adds confirmation message after submission)
initContactForm();