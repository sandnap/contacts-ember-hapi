var server = require('../server'),
    controllers = require('../controllers/controllers');

module.exports = [{
    method: 'GET',
    path: '/api/contacts',
    config: controllers.contacts
}, {
    method: 'GET',
    path: '/api/contacts/{id}',
    config: controllers.contact
}];
