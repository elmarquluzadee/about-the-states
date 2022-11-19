const textId = document.querySelector('#textId');
const btnId = document.querySelector('#btnText');
const headerCard = document.querySelector(" #headerCard"); const nextCard = document.querySelector("#nextCard");
btnId.addEventListener('click', () => {
    console.log();
    counDisplay(textId.value);
})




function counDisplay(cauntry) {

    fetch('https://restcountries.com/v3.1/name/' + cauntry)
        .then((response) => { return response.json() })
        .then((data) => {
            reqDisplay(data[0]);
            const cauntrs = data[0].borders.toString();
            return fetch('https://restcountries.com/v3.1/alpha?codes=' + cauntrs);
        }).then((response) => { return response.json(); })
        .then((data) => { borderDisplay(data) });
};


function reqDisplay(data) {

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

function borderDisplay(data) {
    for (let i in data) {
        console.log(i)

        let html = `

            <div class="col-3 my-cards">
                <img src="${data[i].flags.png}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${data[i].name.common}</h5>
                </div>
                `;
        nextCard.insertAdjacentHTML("beforeend", html);
    }
}
