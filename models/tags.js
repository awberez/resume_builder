module.exports = function(sequelize, DataTypes) {
  var Tag = sequelize.define("Tag", {
    userTag: DataTypes.STRING,
  }, {timestamps: false});

  Tag.associate = function(models) {
    Tag.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Tag;
};