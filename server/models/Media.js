export default (sequelize, DataTypes) => {
    const Media = sequelize.define("Media", {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      posterPath: {
        type: DataTypes.STRING,
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  
    Media.associate = (models) => {
      Media.belongsTo(models.Users, { foreignKey: "userId", onDelete: "CASCADE" });
    };
  
    return Media;
  };
  