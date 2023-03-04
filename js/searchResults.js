class SearchResult {
  constructor(searchResultElement) {
    this.searchResultElement = searchResultElement;
  }

  async getCompanyData(symbol) {
    try {
      const url =
        "https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/" +
        symbol;

      const response = await fetch(url);
      const result = response.json();

      return result;
    } catch (error) {
      return false;
    }
  }

  companyInfoPage(name, symbol, image, percentage) {
    const container = document.createElement("ul");
    container.classList.add("list-group-flush");
    container.classList.add("list-group");
    container.style.borderBottom = "1px solid gray";
    container.style.width = "fit-content";
    container.style.alignItems = "center";
    container.style.padding = "10px";
    container.style.margin = "auto";
    container.style.marginTop = "10px";

    const makeLink = document.createElement("a");
    makeLink.setAttribute("href", "company.html?symbol=" + symbol);
    makeLink.setAttribute("target", "_blank");
    makeLink.innerHTML = " " + name + " (" + symbol + ") ";

    const CompanyIcon = document.createElement("img");
    CompanyIcon.setAttribute("src", image);
    CompanyIcon.setAttribute("alt", "image");
    CompanyIcon.setAttribute("height", "25");
    CompanyIcon.setAttribute("width", "25");
    CompanyIcon.style.borderRadius = "10px";
    CompanyIcon.onerror = function () {
      CompanyIcon.src = "https://static.thenounproject.com/png/1856610-200.png";
    };

    const percentageChange = document.createElement("span");
    percentageChange.style.fontSize = "10px";
    percentageChange.innerHTML = ` (${percentage})`;

    if (percentage > 0) {
      percentageChange.style.color = "#2E5902";
    } else {
      percentageChange.style.color = "#A62B1F";
    }

    const companyInfo = document.createElement("div");
    companyInfo.style.display = "flex";
    companyInfo.style.alignItems = "center";

    companyInfo.appendChild(CompanyIcon);
    companyInfo.appendChild(makeLink);
    companyInfo.appendChild(percentageChange);

    container.appendChild(companyInfo);

    return container;
  }

  async renderResults(companies) {
    const searchValue = document.getElementById("search-input").value;
    this.searchValue = searchValue;

    companies.forEach(async (item) => {
      const details = await this.getCompanyData(item.symbol);
      const companyProfile = details.profile;
      const companyInfo = this.companyInfoPage(
        item.name,
        item.symbol,
        companyProfile.image,
        companyProfile.changesPercentage
      );
      this.searchResultElement.appendChild(companyInfo);
    });
  }
}
