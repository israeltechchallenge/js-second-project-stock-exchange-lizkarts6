const marqueeUrl =
  "https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/stock-screener?/AAPL?&limit=30";
const marqueeDataDisplayer = document.getElementById("marqueeData");

async function fetchMarqueeData(marqueeUrl) {
  const response = await fetch(marqueeUrl);
  const result = await response.json();

  result.forEach((item) => {
    symbol = item.symbol;
    price = item.price;

    marqueeDataDisplayer.innerHTML += `<span class="symbol-for-marquee">${symbol}</span> <span class="price-for-marquee">$${price} </span> `;
  });
}

fetchMarqueeData(marqueeUrl);
