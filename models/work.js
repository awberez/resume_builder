module.exports = function(sequelize, DataTypes) {
  var Work = sequelize.define("Work", {
    whereWork: DataTypes.STRING,
    whenWork: DataTypes.STRING,
    title: DataTypes.STRING,
    descript: DataTypes.TEXT,
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