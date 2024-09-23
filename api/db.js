const { Sequelize, Model, DataTypes } = require('sequelize');

// settings
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './db.sqlite3'
});

// models
class User extends Model {}
User.init({
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING
}, { sequelize, modelName: 'users' });

class Favorite extends Model {}
Favorite.init({
  stars: DataTypes.INTEGER,
  notes: DataTypes.STRING,
  tags: DataTypes.STRING,
  title: DataTypes.STRING,
  image: DataTypes.STRING,
  bookId: DataTypes.STRING,
}, { sequelize, modelName: 'favorites' });

// associations
User.favorites = User.hasMany(Favorite);
Favorite.user = Favorite.belongsTo(User);

sequelize.sync();

module.exports = { User, Favorite };
