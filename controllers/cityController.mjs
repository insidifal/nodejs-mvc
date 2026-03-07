import * as cityService from '../service/cityService.mjs';

export const getCity = async (req, res) => {
    try {
        const { cityName } = req.params;
        const city = await cityService.getCityData(cityName);

        if (!city) {
            return res.status(404).json({
                error: `${cityName} not found.`
            });
        }

        res.json(city);
    } catch(e) {
        console.log(e);
        res.status(500).json({ error: 'Server error' });
    }
};
