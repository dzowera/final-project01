export async function convertCurrency(amount, fromCurrency, toCurrency) {
  const res = await fetch(`https://api.exchangeratesapi.io/v1/latest?access_key=929c5767b484b816354cd580a5817a17&symbols=${fromCurrency},${toCurrency}`);
  const data = await res.json();

  if (data.success) {
    const eurToFrom = data.rates[fromCurrency];
    const eurToTo = data.rates[toCurrency];
    const rate = eurToTo / eurToFrom;
    return (amount * rate).toFixed(2);
  } else {
    throw new Error("Conversion failed");
  }
}