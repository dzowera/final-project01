// Import modules for different features
import { convertCurrency, restoreCurrencySelection } from "./converter.js";   // added restoreCurrencySelection
import { loadNews } from "./news.js";
import { initContactForm } from "./contact.js";

// Grab references (may be null on pages without the converter)
const form = document.getElementById("converter-form");
const resultDiv = document.getElementById("result");

// Only wire up converter if form exists on this page
if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const amount = document.getElementById("amount").value;
    const fromCurrency = document.getElementById("from-currency").value;
    const toCurrency = document.getElementById("to-currency").value;

    try {
      const convertedAmount = await convertCurrency(amount, fromCurrency, toCurrency);
      // resultDiv may be null, so guard it too
      if (resultDiv) {
        resultDiv.textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
      }
    } catch {
      if (resultDiv) resultDiv.textContent = "Error fetching conversion rates.";
    }
  });

  // Restore selection only when converter exists
  restoreCurrencySelection();
}

// Mobile navigation toggle (runs on all pages)
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
if (hamburger) {
  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
}

// Initialize features (these should be safe; check their internal guards if they access page-specific DOM)
loadNews();
initContactForm();