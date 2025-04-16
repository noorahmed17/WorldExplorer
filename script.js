const searchBtn = document.querySelector(".search-btn");
const searchInput = document.querySelector(".search-input");
const cardsContainer = document.querySelector(".cards-container");

//Get all Countries
const getCountryData = async function () {
  const url = "https://restcountries.com/v3.1/all";
  const res = await fetch(url, {
    method: "GET",
  });
  const data = await res.json();
  return data;
};

//Get A Country
const getCountry = async function (name) {
  const url = `https://restcountries.com/v3.1/name/${name}`;
  const res = await fetch(url, {
    method: "GET",
  });
  const data = await res.json();
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
          <h2 class="country-name">${country.name.common} ${
    country.translations.ara.common
  }</h2>
          <h3 class="region">${country.continents[0]}</h3>
          <p class="capital">📍 <span>${
            country.capital ? country.capital[0] : "No capital"
          }</span></p>
          <p class="lang-used">🗣 <span>${
            country.languages
              ? Object.values(country.languages)[0] || "No Language"
              : "No Language"
          }</span></p>
          <p class="currency">💰 <span>${
            country.currencies
              ? Object.keys(country.currencies).join(", ")
              : "No currency"
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
    if (a.name.common < b.name.common) return -1;
    if (a.name.common > b.name.common) return 1;
  });

  countryData = countryData.filter((country) => {
    if (country.name.common.toLowerCase() !== "israel") return country;
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
        if (country.name.common.toLowerCase().includes(query))
          return country.name.common.toLowerCase().includes(query);
        if (country.translations.ara.common.includes(query))
          return country.translations.ara.common.includes(query);
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
