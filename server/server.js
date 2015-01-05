var Hapi = require('hapi'),
    config = require('./config/settings');

var server = new Hapi.Server();
server.connection({host: '0.0.0.0', port: config.port});
module.exports = server;

// Add the server routes
server.route(require('./config/routes'));

if (!module.parent) {
	server.start(function() {
	    console.log('Server running at:', server.info.uri);
	});
}
