var Hapi = require('hapi'),
    config = require('./config/settings');

var server = Hapi.createServer('0.0.0.0', config.port, config.hapi.options);
module.exports = server;

// Add the server routes
server.route(require('./config/routes'));

if (!module.parent) {
	server.start(function() {
	    console.log('Server running at:', server.info.uri);
	});
}
