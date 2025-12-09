export async function loadNews() {
  try {
    const res = await fetch("https://newsdata.io/api/1/market?apikey=pub_e3b16449b1e0497d8f1266523a064384&language=en");
    const data = await res.json();

    const newsList = document.getElementById("news-list");
    newsList.innerHTML = "";

    data.results.slice(0, 5).forEach(article => {
      const li = document.createElement("li");
      li.innerHTML = `
        <a href="${article.link}" target="_blank">${article.title}</a>
        <p>${article.description || ""}</p>
      `;
      newsList.appendChild(li);
    });
  } catch {
    document.getElementById("news-list").innerHTML = "<li>Error loading news.</li>";
  }
}