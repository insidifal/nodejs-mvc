import * as weatherService from '../service/weatherService.mjs';

export const getWeatherData = async (req, res) => {
    try {
        const { cityName } = req.params;
        const weather = await weatherService.getWeatherData(cityName);

        if (!weather) {
            return res.status(404).json({
                error: `${cityName} weather not found.`
            });
        }

        res.json(weather);
    } catch(e) {
        console.log(e);
        res.status(500).json({ error: 'Server error' });
    }
};
