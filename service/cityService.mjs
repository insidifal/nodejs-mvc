import * as cityModel from '../models/cities.mjs';
import axios from 'axios';
const cityUrl = 'https://geocoding-api.open-meteo.com/v1/search'

export const getCityData = async (cityName) => {
    // check if the city is already stored in database
    let city = await cityModel.getCity(cityName);

    // null if city does not exist in database
    // should there be a try catch here?
    if (!city) {
        console.log(`Fetching city ${cityName}`);
        try {
            const response = await axios.get(cityUrl, {
                params: { name: cityName, count: 1 }
            });
            // axios checks response status

            const data = response.data.results?.[0];

            if (data) {
                city = await cityModel.newCity({
                    id: data.id,
                    name: data.name,
                    latitude: data.latitude,
                    longitude: data.longitude,
                    elevation: data.elevation,
                });
            }
        } catch(e) {
            console.log(`Error fetching city ${cityName}: ${e}`);
        }
    }

    return city;
};
