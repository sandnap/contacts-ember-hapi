process.env.NODE_ENV = 'test'

var moment = require('moment');
var Code = require('code');
var Lab = require('lab');
var server = require('../server');
var bookshelf = require('../config/bookshelf');
var lab = exports.lab = Lab.script();

var describe = lab.describe;
var it = lab.it;
var before = lab.before;
var after = lab.after;
var expect = Code.expect;

before(function(done) {
	bookshelf.knex.migrate.latest().then(function() {
		bookshelf.knex.seed.run().then(function() {
			done();
		});
	});
});

after(function(done) {
	bookshelf.knex('contacts').truncate().then(function() {
		done();
	});
});

describe('Contacts', function() {
	it("lists all contacts", function(done) {
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

	it("display a contact", function(done) {
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

	        done();
	    });
	});

	var localContact = {
		contact: {
			first_name: 'Jack',
			middle_initial: null,
			last_name: 'Johnson',
			title: 'President',
			phone_number: '(555) 222-2034',
			email: 'jjohnson@test.net',
			street_address: '123 Some Street',
			city: 'Pittsburgh',
			state: 'PA',
			zip_code: '11223'
		}
	};

	it("create a contact", function(done) {
	    var options = {
	        method: "POST",
	        url: "/api/contacts",
	        payload: JSON.stringify(localContact)
	    };
	 
	    server.inject(options, function(response) {
	        var result = response.result;
	 
	        expect(response.statusCode).to.equal(200);
	        var contact = JSON.parse(result);
	        expect(contact).to.be.instanceof(Object);
	        // Set our localContact variable for use in other tests 
	        localContact = contact;
	        expect(contact.contact['first_name']).to.equal('Jack');
	        expect(contact.contact['middle_initial']).to.equal(null);
	        expect(contact.contact['last_name']).to.equal('Johnson');
	        expect(contact.contact['phone_number']).to.equal('(555) 222-2034');

	        var created = moment(contact.contact['created_at']);
	        var updated = moment(contact.contact['updated_at']);

	        expect(created.isValid()).to.equal(true);
	        expect(updated.isValid()).to.equal(true);

    		var now = moment();
    		var then = moment().subtract(5, 'seconds');

    		expect(now.isAfter(created) || now.isSame(created)).to.equal(true);
    		expect(then.isAfter(created)).to.equal(false);
    		expect(now.isAfter(updated) || now.isSame(updated)).to.equal(true);
    		expect(then.isAfter(updated)).to.equal(false);
		    // Make sure our record is added
		    options = {
		        method: "GET",
		        url: "/api/contacts"
		    };
		 
		    server.inject(options, function(response) {
		        var result = response.result;
		 
		        expect(response.statusCode).to.equal(200);
		        var contacts = JSON.parse(result);
		        expect(contacts).to.be.instanceof(Object);
		        expect(contacts.contacts).to.be.instanceof(Array);
		        expect(contacts.contacts).to.have.length(3);
		 
		        done();
		    });
	    });

	});

	it("update a contact", function(done) {
		// Modify some of the data on our contact
		localContact.contact['first_name'] = 'Billy';
		localContact.contact['last_name'] = 'Smith';
		localContact.contact['phone_number'] = '(555) 111-2222';

	    var options = {
	        method: "PUT",
	        url: "/api/contacts/" + localContact.contact['id'],
	        payload: JSON.stringify(localContact)
	    };
	 
	    server.inject(options, function(response) {
	        var result = response.result;
	 
	        expect(response.statusCode).to.equal(200);
	        var contact = JSON.parse(result);
	        expect(contact).to.be.instanceof(Object);
	        // Set our localContact variable for use in other tests 
	        localContact = contact;
	        expect(contact.contact['first_name']).to.equal('Billy');
	        expect(contact.contact['middle_initial']).to.equal(null);
	        expect(contact.contact['last_name']).to.equal('Smith');
	        expect(contact.contact['phone_number']).to.equal('(555) 111-2222');

	        var created = moment(contact.contact['created_at']);
	        var updated = moment(contact.contact['updated_at']);

	        expect(created.isValid()).to.equal(true);
	        expect(updated.isValid()).to.equal(true);

    		var now = moment();
    		var then = moment().subtract(5, 'seconds');

    		expect(now.isAfter(created) || now.isSame(created)).to.equal(true);
    		expect(updated.isAfter(created)).to.equal(true);
    		expect(now.isAfter(updated) || now.isSame(updated)).to.equal(true);
    		expect(then.isAfter(updated)).to.equal(false);

	        done();
	    });
	});

	it("delete a contact", function(done) {
	    var options = {
	        method: "DELETE",
	        url: "/api/contacts/" + localContact.contact['id'],
	        payload: JSON.stringify(localContact)
	    };
	 
	    server.inject(options, function(response) {
	        expect(response.result).to.equal('{}');
		    // Make sure our record is removed
		    options = {
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
	});
});