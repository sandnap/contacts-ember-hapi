'use strict';

exports.seed = function(knex, Promise) {
    return knex('contacts').insert([{
	        first_name: 'Joe',
	        last_name: 'Smith',
	        email: 'jsmith@test.net',
	        phone_number: '(555) 111-2222',
	        street_address: '123 Some Street',
	        city: 'Salt Lake City',
	        state: 'Utah',
	        zip_code: '84111',
	        created_at: new Date()
	    },
	    {
	    	first_name: 'John',
	        last_name: 'Jones',
	        email: 'jjones@test.net',
	        phone_number: '(555) 222-3333',
	        street_address: '1432 Another Street',
	        city: 'Montgomery',
	        state: 'Alabama',
	        zip_code: '99291',
	        created_at: new Date()
	    }
    ]);
};
