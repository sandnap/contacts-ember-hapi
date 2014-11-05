var bookshelf = require('../config/bookshelf');

var Contact = bookshelf.Model.extend({
    tableName: 'contacts'
});

module.exports = {
	Contact: Contact
}
