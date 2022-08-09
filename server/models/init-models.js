var DataTypes = require("sequelize").DataTypes;
var _cinema = require("./cinema");
var _cinema_movie = require("./cinema_movie");
var _cineplex = require("./cineplex");
var _movie = require("./movie");
var _seat = require("./seat");
var _showtime = require("./showtime");
var _ticket = require("./ticket");
var _user = require("./user");

function initModels(sequelize) {
  var cinema = _cinema(sequelize, DataTypes);
  var cinema_movie = _cinema_movie(sequelize, DataTypes);
  var cineplex = _cineplex(sequelize, DataTypes);
  var movie = _movie(sequelize, DataTypes);
  var seat = _seat(sequelize, DataTypes);
  var showtime = _showtime(sequelize, DataTypes);
  var ticket = _ticket(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);

  cinema_movie.belongsTo(cinema, { as: "cinema", foreignKey: "cinemaId"});
  cinema.hasMany(cinema_movie, { as: "cinema_movies", foreignKey: "cinemaId"});
  showtime.belongsTo(cinema, { as: "cinema", foreignKey: "cinemaId"});
  cinema.hasMany(showtime, { as: "showtimes", foreignKey: "cinemaId"});
  ticket.belongsTo(cinema, { as: "cinema", foreignKey: "cinemaId"});
  cinema.hasMany(ticket, { as: "tickets", foreignKey: "cinemaId"});
  cinema.belongsTo(cineplex, { as: "cineplex", foreignKey: "cineplexId"});
  cineplex.hasMany(cinema, { as: "cinemas", foreignKey: "cineplexId"});
  cinema_movie.belongsTo(movie, { as: "movie", foreignKey: "movieId"});
  movie.hasMany(cinema_movie, { as: "cinema_movies", foreignKey: "movieId"});
  ticket.belongsTo(movie, { as: "movie", foreignKey: "movieId"});
  movie.hasMany(ticket, { as: "tickets", foreignKey: "movieId"});
  ticket.belongsTo(seat, { as: "seat", foreignKey: "seatId"});
  seat.hasMany(ticket, { as: "tickets", foreignKey: "seatId"});
  seat.belongsTo(showtime, { as: "showtime", foreignKey: "showtimeId"});
  showtime.hasMany(seat, { as: "seats", foreignKey: "showtimeId"});
  ticket.belongsTo(user, { as: "user", foreignKey: "userId"});
  user.hasMany(ticket, { as: "tickets", foreignKey: "userId"});

  return {
    Cinema: cinema,
    Cinema_movie: cinema_movie,
    Cineplex: cineplex,
    Movie: movie,
    Seat: seat,
    Showtime: showtime,
    Ticket: ticket,
    User: user,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
