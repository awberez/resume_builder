module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    userName: DataTypes.STRING,
    realName: DataTypes.STRING,
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
  };

  return User;
};