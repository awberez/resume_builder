module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    password: DataTypes.STRING
  }, {timestamps: false});

  User.associate = function(models) {
    User.hasMany(models.Experience, {
      onDelete: "cascade"
    });
    User.hasMany(models.Work, {
      onDelete: "cascade"
    });
    User.hasMany(models.Tag, {
      onDelete: "cascade"
    });
  };

  return User;
};