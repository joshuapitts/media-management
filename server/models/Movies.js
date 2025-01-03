export default (sequelize, DataTypes) => {
    const Movies = sequelize.define("Movies", {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      posterPath: {
        type: DataTypes.STRING,
      },
      releaseDate: {
        type: DataTypes.STRING,
      },
    });
  
    Movies.associate = (models) => {
      Movies.belongsTo(models.Users, {
        foreignKey: {
          allowNull: false,
        },
      });
    };
  
    return Movies;
  };
  