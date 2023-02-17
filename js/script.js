const userInput = document.getElementById("input");
const searchBtn = document.getElementById("searchBtn");
const listGroup = document.getElementById("listGroup");
const loadingSpinner = document.getElementById('spinner')

searchBtn.addEventListener("click", (e) => {
  listGroup.innerHTML = "";
  e.preventDefault();

  getSearchResults(userInput);
});

async function getSearchResults(userInput) {
  loadingSpinner.classList.remove('d-none');
  const response = await fetch(
    "https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=" +
      userInput.value +
      "&limit=10&exchange=NASDAQ"
  );
  const result = await response.json();
loadingSpinner.classList.add('d-none')
  result.forEach((item) => {
    let name = item.name;
    let symbol = item.symbol;
    let newLi = document.createElement("li");
    newLi.classList.add("list-group-item", 'mt-3');
    newLi.innerHTML =
      '<a target="_blank" href=company.html?symbol=' +
      symbol +
      ">" +
      name +
      "(" +
      symbol +
      ")</a>";
    listGroup.appendChild(newLi);
  });
}
