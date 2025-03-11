const countriesContainer = document.getElementById('countries-container');
const searchInput = document.getElementById('search');
const filterSelect = document.getElementById('filter');
let countries = [];

function displayCountries(filteredCountries) {
    countriesContainer.innerHTML = "";
    filteredCountries.forEach((country) => {
        const countryCard = document.createElement('div');
        countryCard.classList.add('country-card');
        countryCard.innerHTML = `
            <img src="${country.flags.png}" alt="${country.name.common}">
            <h3>${country.name.common}</h3>
            <p><strong>Region:</strong> ${country.region}</p>
        `;
        countriesContainer.appendChild(countryCard);
    });
}

function filterCountries() {
    const searchInputValue = searchInput.value.toLowerCase().trim();
    const filterValue = filterSelect.value;
    
    const filteredCountries = countries.filter((country) => {
        const matchesSearch = country.name.common.toLowerCase().includes(searchInputValue);
        const matchesRegion = filterValue === "" || country.region === filterValue;
        return matchesSearch && matchesRegion;
    });
    
    displayCountries(filteredCountries);
}

searchInput.addEventListener("input", filterCountries);
filterSelect.addEventListener("change", filterCountries);

async function fetchCountries() {
    try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        countries = await response.json();
        displayCountries(countries);
    } catch (error) {
        console.log("Error", error);
    }
}

fetchCountries();
