// converter.js
// Handles currency conversion using the ExchangeRate API (EUR base restriction on free tier)

export async function convertCurrency(amount, fromCurrency, toCurrency) {
  try {
    // Fetch latest rates for the selected currencies
    const res = await fetch(
      `https://api.exchangeratesapi.io/v1/latest?access_key=929c5767b484b816354cd580a5817a17&symbols=${fromCurrency},${toCurrency}`
    );
    const data = await res.json();

    if (data.success) {
      // Convert via EUR base: (EUR→to / EUR→from)
      const eurToFrom = data.rates[fromCurrency];
      const eurToTo = data.rates[toCurrency];
      const rate = eurToTo / eurToFrom;

      let usd = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: toCurrency,
      })

      // Return converted amount rounded to 2 decimals
      return usd.format((amount * rate).toFixed(2));
    } else {
      throw new Error("Conversion failed");
    }
  } catch (error) {
    // Handle API or network errors
    throw new Error("Error fetching conversion rates");
  }
}