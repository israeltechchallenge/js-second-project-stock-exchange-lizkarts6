const marqueeDataDisplayer = document.getElementById("marqueeData");

class Marquee {
  constructor(element) {
    this.element = element;
  }
  async fetchMarqueeData(urlForCompanyInfo) {
    const response = await fetch(
      urlForCompanyInfo + "stock-screener?/AAPL?&limit=30"
    );
    const data = await response.json();
    const presentMarqueeData = document.createElement("div");
    presentMarqueeData.classList.add("marquee", "visual-aid");
    this.element.append(presentMarqueeData);

    data.forEach((item) => {
      let symbol = item.symbol;
      let price = item.price;

      marqueeDataDisplayer.innerHTML += `<span class="symbol-for-marquee">${symbol}</span> <span class="price-for-marquee">$${price} </span> `;
    });
  }
}
let showMarquee = new Marquee(marqueeDataDisplayer);

showMarquee.fetchMarqueeData(urlForCompanyInfo);
