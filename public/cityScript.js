const fragment = document.createDocumentFragment();
const cityDetails = document.getElementById('city-details');

const searchCity = async () => {
    const userInput = document.getElementById('search-box').value;
    const response = await fetch(`/api/weather/${userInput}`);
    const city = await response.json();

    cityDetails.innerHTML = ''; // clears the section

    const cityDiv = document.createElement('div');

    const cityName = document.createElement('h2');
    cityName.textContent = city.name;
    const cityLatitude = document.createElement('p');
    cityLatitude.textContent = `Latitude: ${city.latitude}`;
    const cityLongitude = document.createElement('p');
    cityLongitude.textContent = `Longitude: ${city.longitude}`;
    const cityElevation = document.createElement('p');
    cityElevation.textContent = `Elevation: ${city.elevation}`;

    cityDiv.append(cityName, cityLatitude, cityLongitude, cityElevation);
    fragment.appendChild(cityDiv);
    cityDetails.appendChild(fragment);
};

document.getElementById('search-button').addEventListener('click', searchCity);
