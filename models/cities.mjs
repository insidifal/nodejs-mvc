import { Sequelize, DataTypes, Op } from 'sequelize';

export const sequelizeCities = new Sequelize({
    dialect: 'sqlite',
    storage: '.database.sqlite'
});

export const City = sequelizeCities.define(
    'City', {
        id: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false },
        name: { type: DataTypes.TEXT, allowNull: false },
        latitude: { type: DataTypes.DECIMAL, allowNull: false },
        longitude: { type: DataTypes.DECIMAL, allowNull: false },
        elevation: { type: DataTypes.DECIMAL, allowNull: false },
    }, {
        tableName: 'cities',
        timestamps: true,
    }
);

// upsert to update if the ID already exists
export const newCity = async (cityData) => {
    // create city
    const [instance, created] = await City.upsert(cityData, { returning: true });
    // and then return the instance
    return instance;
};

// search for a city
export const getCity = async (cityName) => await City.findOne({
    where: {
        // Op.iLike for case-insensitive search
        name: { [Op.like]: cityName },
    }
});
