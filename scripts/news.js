// news.js
// Fetches and displays latest market headlines using NewsData.io API

export async function loadNews() {
  try {
    // Call NewsData.io Market API with your public key
    const res = await fetch(
      `https://newsdata.io/api/1/latest?apikey=pub_e3b16449b1e0497d8f1266523a064384&country=mw,za,gb,us,sa&language=en&category=business,politics,technology,world&timezone=africa/harare&removeduplicate=1`
    );
    const data = await res.json();

    const newsList = document.getElementById("news-list");
    if (!newsList) return; // guard: do nothing when element is missing

    newsList.innerHTML = "";

    // Display top 5 articles
    (data.results || []).slice(0, 5).forEach(article => {
      const li = document.createElement("li");
      li.innerHTML = `
        <a href="${article.link}" target="_blank">${article.title}</a>
        <p>${article.description || ""}</p>
      `;
      newsList.appendChild(li);
    });
  } catch (error) {
    const newsList = document.getElementById("news-list");
    if (newsList) {
      newsList.innerHTML = "<li>Error loading news. Please try again later.</li>";
    } else {
      console.error("loadNews failed:", error);
    }
  }
}