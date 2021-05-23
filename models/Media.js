const { Model, DataTypes } = require("sequelize");

const sequelize = require('../config/connection');

class Media extends Model {}

Media.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    media_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    media_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    media_artist: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    media_location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    media_rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      references: {
        model: "user",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "media",
  }
);

module.exports = Media;
