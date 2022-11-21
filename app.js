const textId = document.querySelector('#textId');
const btnId = document.querySelector('#btnText');
const headerCard = document.querySelector(" #headerCard");
const nextCard = document.querySelector("#nextCard");

document.querySelector("#btnLocation").addEventListener("click", () => {

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }

});

function onError(err) {
    console.log(err);
};

async function onSuccess(position) {
    let lat = position.coords.latitude;
    let lng = position.coords.longitude;
    //api, google,opencageddata
    const api_key = "e12c47b9cc3346ca8fa876beece3a7d8";

    const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${api_key}`

    const response = await fetch(url);
    const data = await response.json();

    const country = data.results[0].components.country

    textId.value = country
    btnId.click();
};

btnId.addEventListener('click', () => {
    document.querySelector("#loading").style.display = "block";
    counDisplay(textId.value);

})

async function counDisplay(country) {
    const countryUrl = "https://restcountries.com/v3.1";
    let borderCountries;

    await fetch(`${countryUrl}/name/${country}`)
        .then(response => {
            if (!response.ok)
                throw new Error("country not find")
            return response.json();
        })
        .then(data => {
            reqDisplay(data[0]);
            borderCountries = data[0].borders.toString();
        })
        .catch(error => {
            console.log(error);
        })

    await fetch(`${countryUrl}/alpha?codes=${borderCountries}`)
        .then(response => response.json())
        .then(data => {
            borderDisplay(data);
        })
        .catch(error => {
            console.log(error);
            document.querySelector("#loading").style.display = "none";
        })
};



function reqDisplay(data) {

    document.querySelector("#loading").style.display = "none";
    headerCard.innerHTML = '';

    let html = `
            <div class="card my-3">
                <div class="row g-0">
                    <div class="col-md-6 d-flex justify-content-center align-items-center">
                        <img src="${data.flags.png}" class="flag-image my-3" alt="...">
                    </div>
                    <div class="col-md-6">
                        <div class="card-body mx-5">
                            <h5 class="card-title">State&nbsp;: ${data.altSpellings[2]}</h5>
                            <p class="card-text">Capital&nbsp;: ${data.capital}</p>
                            <p class="card-text">Population&nbsp;: ${(data.population / 1000000).toFixed()} M
                            </p>
                            <p class="card-text">Currency&nbsp;:
                                ${Object.values(data.currencies)[0].name}(${Object.values(data.currencies)[0].symbol})
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            `;

    headerCard.insertAdjacentHTML("beforeend", html);
}

function borderDisplay(borderCountries) {
    nextCard.innerHTML = '';

    borderCountries.forEach(country => {
        let html = `
            <div class="col-md-3 my-cards my-4 ">
                <img src="${country.flags.png}" class=" w-50" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${country.name.common}</h5>
                </div>
                `;
        nextCard.insertAdjacentHTML("beforeend", html);
    });
}

function renderError() {

}