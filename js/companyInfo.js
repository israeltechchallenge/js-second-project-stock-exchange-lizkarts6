let urlParams = new URLSearchParams(window.location.search);
const symbol = urlParams.get("symbol");
const companyProfileUrl = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/`;
const spinner = document.getElementById("spinnerForCompany");
const myChart = document.getElementById("myChart");

async function fetchCompanyData(companyProfileUrl) {
  spinner.classList.remove("d-none");
  const response = await fetch(`${companyProfileUrl}company/profile/${symbol}`);
  const result = await response.json();
  spinner.classList.add("d-none");

  const companyImg = result.profile.image;
  const companyName = result.profile.companyName;
  const companyDescription = result.profile.description;
  const companyWebsite = result.profile.website;
  const companyPrice = result.profile.price;
  const priceChanges = result.profile.changesPercentage;

  document.getElementById("companyTitle").innerHTML = companyName;

  document.getElementById(
    "companyWebsite"
  ).innerHTML = `<a href=${companyWebsite} target="_blank"> ${companyWebsite} </a>`;

  document.getElementById("companyImg").innerHTML = `<img src="${companyImg}">`;

  document.getElementById(
    "companyPrice"
  ).innerHTML = `Stock price: ${companyPrice}$`;

  if (priceChanges < 0) {
    document.getElementById("priceChange").innerHTML = `(${priceChanges}%)`;
    document.getElementById("priceChange").style.color = "red";
  } else {
    document.getElementById("priceChange").innerHTML = `(+${priceChanges}%)`;
    document.getElementById("priceChange").style.color = "green";
  }

  document.getElementById("companyDescription").innerHTML = companyDescription;
}

fetchCompanyData(companyProfileUrl);

async function getCompanyChart(companyProfileUrl) {
  const response = await fetch(
    `${companyProfileUrl}historical-price-full/${symbol}?serietype=line`
  );
  const result = await response.json();

  const history = result.historical;
  let historyDate = [];
  for (let i = 0; i < history.length; i++) {
    historyDate.push(history[i].date);
  }
  const labels = historyDate.reverse();
  let HistoryClose = [];
  for (let i = 0; i < history.length; i++) {
    HistoryClose.push(history[i].close);
  }
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Storck Price History",
        backgroundColor: "#3b622b",

        data: HistoryClose.reverse(),
      },
    ],
  };
  const chartAreaBorder = {
    id: "chartAreaBorder",
    beforeDraw(chart, options) {
      const {
        myChart,
        chartArea: { left, top, width, height },
      } = chart;
      myChart.strokeRect(left, top, width, height);
      myChart.restore();
    },
  };
  const config = {
    type: "bar",
    data: data,
    options: {
      plugins: {
        chartAreaBorder: {
          borderColor: "#3b622b",
        },
      },
    },
  };

  const myChart = new Chart(document.getElementById("myChart"), config);
}

getCompanyChart(companyProfileUrl);
