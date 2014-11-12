import DS from 'ember-data';

var attr = DS.attr;
var Contact = DS.Model.extend({
	firstName: attr('string'),
	lastName: attr('string'),
	middleInitial: attr('string'),
	title: attr('string'),
	phoneNumber: attr('string'),
	email: attr('string'),
	streetAddress: attr('string'),
	city: attr('string'),
	state: attr('string'),
	zipCode: attr('string'),
	createdAt: attr('date'),
	updatedAt: attr('date'),
	fullName: function() {
		var middleInitial = this.get('middleInitial') ? this.get('middleInitial') + ' ' : '';
		return this.get('firstName') + ' ' + middleInitial + this.get('lastName');
	}.property('firstName', 'lastName', 'middleInitial')
});

Contact.reopenClass({
	FIXTURES: [
		{
			id: 1,
			firstName: "Fred",	
			lastName: "Jones",
			middleInitial: "P",
			phoneNumber: "(555) 333-4444",
			email: "fjones@test.com",
			streetAddress: "123 Some Street",
			city: "Some City",
			state: "Nevada",
			zipCode: "12123"
		},
		{
			id: 2,
			firstName: "Susie",	
			lastName: "Thomas",
			title: "PhD",
			phoneNumber: "(555) 444-3333",
			email: "sthomas@test.com",
			streetAddress: "123 Another Street",
			city: "Another City",
			state: "Arizona",
			zipCode: "22211"
		}
	]
});

export default Contact;