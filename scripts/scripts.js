const form = document.getElementById("converter-form");
const resultDiv = document.getElementById("result");
let chart; // global chart reference

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const amount = document.getElementById("amount").value;
  const fromCurrency = document.getElementById("from-currency").value;
  const toCurrency = document.getElementById("to-currency").value;

  try {
    // Always fetch with EUR as base (free tier restriction)
    const latestRes = await fetch(`https://api.exchangeratesapi.io/v1/latest?access_key=929c5767b484b816354cd580a5817a17&symbols=${fromCurrency},${toCurrency}`);
    const latestData = await latestRes.json();

    if (latestData.success) {
      const eurToFrom = latestData.rates[fromCurrency];
      const eurToTo = latestData.rates[toCurrency];

      // Conversion formula: amount * (EUR→to / EUR→from)
      const rate = eurToTo / eurToFrom;
      const convertedAmount = (amount * rate).toFixed(2);

      resultDiv.textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;

      // Load historical chart
      await loadHistoricalChart(fromCurrency, toCurrency);
    } else {
      resultDiv.textContent = "Error: Could not fetch conversion rates.";
    }
  } catch (error) {
    resultDiv.textContent = "Error fetching conversion rates. Please try again.";
  }
});

async function loadHistoricalChart(base, target) {
  const today = new Date();
  const dates = [];
  const rates = [];

  // Collect last 7 days
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const dateStr = d.toISOString().split("T")[0];
    dates.push(dateStr);

    const res = await fetch(`https://api.exchangeratesapi.io/v1/${dateStr}?access_key=929c5767b484b816354cd580a5817a17&symbols=${base},${target}`);
    const data = await res.json();

    if (data.success) {
      const eurToBase = data.rates[base];
      const eurToTarget = data.rates[target];
      const rate = eurToTarget / eurToBase;
      rates.push(rate);
    } else {
      rates.push(null);
    }
  }

  const ctx = document.getElementById("exchangeChart").getContext("2d");

  // Destroy old chart if exists
  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: dates,
      datasets: [{
        label: `${base} → ${target}`,
        data: rates,
        borderColor: "#10B981",
        backgroundColor: "rgba(16,185,129,0.2)",
        fill: true,
        tension: 0.3
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: "top" },
        title: { display: true, text: "Exchange Rate Trend (Past 7 Days)" }
      }
    }
  });
}