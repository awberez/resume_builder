module.exports = function(sequelize, DataTypes) {
  var Education = sequelize.define("Education", {
    school: DataTypes.STRING,
    degree: DataTypes.STRING,
    start_date: DataTypes.STRING,
    end_date: DataTypes.STRING,
    tagOne: DataTypes.STRING,
    tagTwo: DataTypes.STRING,
    tagThree: DataTypes.STRING
  }, {timestamps: false});

  Education.associate = function(models) {
    Education.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Education;
};