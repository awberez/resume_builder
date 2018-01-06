module.exports = function(sequelize, DataTypes) {
  var Experience = sequelize.define("Experience", {
    skill: DataTypes.STRING,
    tagOne: DataTypes.STRING,
    tagTwo: DataTypes.STRING,
    tagThree: DataTypes.STRING
  }, {timestamps: false});

  Experience.associate = function(models) {
    Experience.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Experience;
};