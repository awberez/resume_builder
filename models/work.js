module.exports = function(sequelize, DataTypes) {
  var Work = sequelize.define("Work", {
    title: DataTypes.STRING,
    location: DataTypes.STRING,
    start_date: DataTypes.STRING,
    end_date: DataTypes.STRING,
    descript: DataTypes.TEXT,
    duties: DataTypes.TEXT,
    tagOne: DataTypes.STRING,
    tagTwo: DataTypes.STRING,
    tagThree: DataTypes.STRING
  }, {timestamps: false});

  Work.associate = function(models) {
    Work.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Work;
};