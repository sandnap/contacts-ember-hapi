var models = require('../models/models'),
    utils = require('../utils/utils');

module.exports = {
    contacts: {
        handler: function(request, reply) {
            models.Contact.fetchAll().then(function(contacts) {
                reply(utils.formatJson('contacts', contacts));
            });
        }
    },
    contact: {
        handler: function(request, reply) {
            new models.Contact({id: request.params.id}).fetch().then(function(contact) {
                reply(utils.formatJson('contact', contact));
            });
        }
    }
};
