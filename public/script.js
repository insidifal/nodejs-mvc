const fragment = document.createDocumentFragment();
const cityDetails = document.getElementById('city-details');
const notification = document.getElementById('notification');
const searchStatus = document.getElementById('status');

const searchCity = async () => {
    notification.innerHTML = '';
    searchStatus.innerHTML = '<p>Searching...</p>';

    try {
        const userInput = document.getElementById('search-box').value;
        const response = await fetch(`/api/weather/${userInput}`);
        if (!response.ok) throw new Error(response.status);
        const data = await response.json();

        cityDetails.innerHTML = ''; // clears the section

        const cityDiv = document.createElement('div');

        const cityName = document.createElement('h2');
        cityName.textContent = data.city;
        const time = document.createElement('h3');
        time.textContent = `${data.current.time} ${data.timezone_abbreviation}`;
        const temperature = document.createElement('p');
        temperature.textContent = `Temperature: ${data.current.temperature_2m}°`;
        const windSpeed = document.createElement('p');
        windSpeed.textContent = `Wind Speed: ${data.current.wind_speed_10m} km/h`;
        const windDirection = document.createElement('p');
        windDirection.textContent = `Wind Direction: ${data.current.wind_direction_10m}°`;
        const cloudCover = document.createElement('p');
        cloudCover.textContent = `Cloud Cover: ${data.current.cloud_cover} %`;

        cityDiv.append(cityName, time, temperature, windSpeed, windDirection, cloudCover);
        fragment.appendChild(cityDiv);
        cityDetails.appendChild(fragment);
    } catch(e) {
        notification.innerHTML = `<p>${e}</p>`;
    }

    searchStatus.innerHTML = '';
};

document.getElementById('search-button')
    .addEventListener('click', searchCity);
document.getElementById('search-box')
.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') { searchCity() }
    });
