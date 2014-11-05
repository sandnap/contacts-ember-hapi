var knexConfig = require('../knexfile'); 
var settings = require('./settings');
var knex = require('knex')(knexConfig[settings.environment]);

var bookshelf = require('bookshelf')(knex);
module.exports = bookshelf;