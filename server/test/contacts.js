process.env.NODE_ENV = 'test'

var Code = require('code');
var Lab = require('lab');
var server = require('../server');
var lab = exports.lab = Lab.script();

var describe = lab.describe;
var it = lab.it;
var before = lab.before;
var after = lab.after;
var expect = Code.expect;


describe('Contacts', function() {
	it(" lists all contacts", function(done) {
	    var options = {
	        method: "GET",
	        url: "/api/contacts"
	    };
	 
	    server.inject(options, function(response) {
	        var result = response.result;
	 
	        expect(response.statusCode).to.equal(200);
	        var contacts = JSON.parse(result);
	        expect(contacts).to.be.instanceof(Object);
	        expect(contacts.contacts).to.be.instanceof(Array);
	        expect(contacts.contacts).to.have.length(2);
	 
	        done();
	    });
	});

	it(" display a contact", function(done) {
	    var options = {
	        method: "GET",
	        url: "/api/contacts/1"
	    };
	 
	    server.inject(options, function(response) {
	        var result = response.result;
	 
	        expect(response.statusCode).to.equal(200);
	        var contact = JSON.parse(result);
	        expect(contact).to.be.instanceof(Object);
	        expect(contact.contact['first_name']).to.equal('Joe');
	        expect(contact.contact['middle_initial']).to.equal(null);
	        expect(contact.contact['last_name']).to.equal('Smith');
	        expect(contact.contact['created_at']).to.not.equal(null);
	        expect(contact.contact['updated_at']).to.equal(null);

	        done();
	    });
	});
});