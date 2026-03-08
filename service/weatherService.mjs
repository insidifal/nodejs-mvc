import * as weatherModel from '../models/weather.mjs';
import * as cityService from '../service/cityService.mjs';
import axios from 'axios';
const weatherUrl = 'https://api.open-meteo.com/v1/forecast'

export const getWeatherData = async (cityName) => {
    const city = await cityService.getCityData(cityName);
    if (!city) throw new Error('City not found');

    // check if the weather is already stored in database
    let weather = await weatherModel.getWeather(cityName);

    // null if weather does not exist in database
    if (!weather) {
        console.log(`Fetching weather for ${cityName}`);
        try {
            const response = await axios.get(weatherUrl, {
                params: {
                    latitude: city.latitude,
                    longitude: city.longitude,
                    current: [
                        "temperature_2m",
                        "wind_speed_10m",
                        "wind_direction_10m",
                        "cloud_cover"
                    ]
                }
            });
            // axios will throw an error if not ok

            const data = response.data;

            if (data && data.current) {
                weather = await weatherModel.updateWeather({
                    city: city.name,
                    utc_offset_seconds: data.utc_offset_seconds,
                    timezone: data.timezone,
                    timezone_abbreviation: data.timezone_abbreviation,
                    current: data.current
                });
            } else {
                throw new Error('No weather data from OpenMeteo');
            }
        } catch(e) {
            console.log(`Error fetching weather for city ${cityName}: ${e}`);
        }
    }

    return weather;
};
