module.exports = (sequelize, DataTypes) => {
    let UserMovie = sequelize.define('UserMovie', {
        userId: DataTypes.INTEGER.UNSIGNED,
        movieId: DataTypes.INTEGER.UNSIGNED
    });

    // TODO: Temporary fix for table names on linux.  Sequalize
    // TODO: seems to want to use the capitalized table name
    UserMovie.tableName = 'userMovies';
    
    return UserMovie;
};
