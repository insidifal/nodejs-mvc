import { Sequelize, DataTypes, Op, literal } from 'sequelize';

export const sequelizeWeather = new Sequelize({
    dialect: 'sqlite',
    storage: '.database.sqlite'
});

export const Weather = sequelizeWeather.define(
    'Weather', {
        city: { type: DataTypes.TEXT, allowNull: false, unique: true },
        utc_offset_seconds: { type: DataTypes.INTEGER },
        timezone: { type: DataTypes.TEXT },
        timezone_abbreviation: { type: DataTypes.TEXT },
        current: { type: DataTypes.JSON },
    }, {
        tableName: 'weather',
        timestamps: true,
    }
);

// upsert to update if the ID already exists
export const updateWeather = async (weatherData) => {
    // insert and initialise instance
    const [instance] = await Weather.upsert(weatherData, { returning: true });
    // and then return the instance
    return instance;
};

// search for a city
export const getWeather = async (cityName) => await Weather.findOne({
    where: {
        // Op.iLike for case-insensitive search
        city: { [Op.like]: cityName },
        updatedAt: { [Op.gt]: literal("datetime('now', '-1 hour')") }
    }
});
