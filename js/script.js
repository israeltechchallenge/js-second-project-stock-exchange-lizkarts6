const searchButton = document.getElementById("searchBtn");
const userInput = document.getElementById("input");
const searchedList = document.getElementById("listGroup");
const loadingSpinner = document.getElementById("spinner");
const urlForCompanyInfo =
  "https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/";
let result;

function searchData(e) {
  e.preventDefault();
  getSearchData(
    urlForCompanyInfo +
      "search?query=" +
      userInput.value +
      "&limit=10&exchange=NASDAQ"
  );
}

searchButton.addEventListener("click", searchData);

function handleImageError(image) {
  image.onerror = "";
  image.src = "https://static.thenounproject.com/png/1856610-200.png";
  return true;
}

async function getSearchData(url) {
  loadingSpinner.classList.remove("d-none");
  searchedList.innerHTML = "";
  try {
    const response = await fetch(url);
    result = await response.json();
    loadingSpinner.classList.add("d-none");

    if (result.length === 0) {
      searchedList.innerHTML = `No Information Found`;
    } else {
      for (let i = 0; i < result.length; i++) {
        let symbol = result[i].symbol;
        let name = result[i].name;
        let newLi = document.createElement("div");
        newLi.classList.add("list-group-item", "mt-3");
        let companyInfo = await getCompanyDetails(symbol);

        let changeClassForPercentage = "";
        if (companyInfo.profile.changesPercentage < 0) {
          changeClassForPercentage = "percentage-negative";
        } else {
          changeClassForPercentage = "percentage-positive";
        }

        newLi.innerHTML =
          '<img src=" ' +
          companyInfo.profile.image +
          '" onerror="handleImageError(this)" width="20" height="20">' +
          ' <a target="_blank" href=company.html?symbol=' +
          symbol +
          ">" +
          name +
          "</a> <span class='style-for-searchlist-name'>(" +
          symbol +
          ") </span> <span class='style-for-searchlist-symbol " +
          changeClassForPercentage +
          "'>" +
          companyInfo.profile.changesPercentage +
          "</span>";
        searchedList.appendChild(newLi);
      }
    }
  } catch (err) {
    throw new Error("error", err);
  }
}

async function getCompanyDetails(symbol) {
  const url = urlForCompanyInfo + "company/profile/" + symbol;
  try {
    const response = await fetch(url);
    const data = await response.json();

    return data;
  } catch (err) {
    throw new Error("error", err);
  }
}
