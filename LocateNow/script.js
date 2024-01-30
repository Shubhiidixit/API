const button = document.querySelector("button");

button.addEventListener("click", () => {
    if (navigator.geolocation) {
        button.innerText = "Allow to detect location";
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    } else {
        button.innerText = "Your browser not support";
    }
});

function onSuccess(position) {
    button.innerText = "Detecting your location...";
    let { latitude, longitude } = position.coords;
    fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=34831d3bd38b49f0afc39a901d4faa77`)
        .then(response => response.json()).then(response => {
            let allDetails = response.results[0].components;
            console.table(allDetails);
            let { county, postcode, country } = allDetails;
            button.innerText = `${county} ${postcode}, ${country}`;
        }).catch(() => {
            button.innerText = "Something went wrong";
        });
}

function onError(error) {
    if (error.code == 1) {
        button.innerText = "You denied the request";
    } else if (error.code == 2) {
        button.innerText = "Location is unavailable";
    } else {
        button.innerText = "Something went wrong";
    }
    button.setAttribute("disabled", "true");
}
