const searchBtn = document.querySelector(".search-btn");
const searchInput = document.querySelector(".search-input");
const cardsContainer = document.querySelector(".cards-container");
// const proxy = "https://cors-anywhere.herokuapp.com/";

//Get all Countries
const getCountryData = async function () {
  const cached = localStorage.getItem("countries");
  if (cached) return JSON.parse(cached);

  // const url = "https://www.apicountries.com/countries";
  const res = await fetch("/api/countries", {
    method: "GET",
  });
  const data = await res.json();
  localStorage.setItem("countries", JSON.stringify(data));
  return data;
};

//Rendering Cards of Countries
const renderCountryCards = function (country) {
  html = `
    <main class="container">
      <article class="country-conatiner">
        <img src="${country.flags.png}" alt="${
    country.flags.alt
  }" class="flag" />
        <div class="country-info">
          <h2 class="country-name">${country.name}</h2>
          <h3 class="region">${country.region}</h3>
          <p class="capital">📍 <span>${
            country.capital ? country.capital : "No capital"
          }</span></p>
          <p class="lang-used">🗣 <span>${
            country.languages ? country.languages[0].name : "No Language"
          }</span></p>
          <p class="currency">💰 <span>${
            country.currencies ? country.currencies[0].code : "No currency"
          }</span></p>
        </div>
      </article>
    </main>
    `;
  return html;
};

//Display Rendered Cards
const countryCards = async function () {
  let countryData = await getCountryData();
  cardsContainer.innerHTML = "";

  countryData.sort((a, b) => {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
  });

  countryData = countryData.filter((country) => {
    if (country.name.toLowerCase() !== "israel") return country;
  });

  countryData.forEach((country) => {
    let html = renderCountryCards(country);
    cardsContainer.insertAdjacentHTML("beforeend", html);
  });
};

//Search on English and Arabic
searchInput.addEventListener("input", async (e) => {
  let query = e.target.value.toLowerCase();
  let countryData = await getCountryData();
  cardsContainer.innerHTML = "";

  if (query) {
    countryData
      .filter((country) => {
        if (country.name.toLowerCase().includes(query))
          return country.name.toLowerCase().includes(query);
      })
      .forEach((country) => {
        let html = renderCountryCards(country);
        cardsContainer.insertAdjacentHTML("beforeend", html);
      });
  } else {
    countryCards();
  }
});

window.addEventListener("load", countryCards);
