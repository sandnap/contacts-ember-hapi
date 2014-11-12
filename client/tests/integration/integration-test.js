import Ember from 'ember';
import {
    test
}
from 'ember-qunit';
import startApp from '../helpers/start-app';

var App;

module('Integration Test', {
    needs: [],
    setup: function() {
        App = startApp();
    },
    teardown: function() {
        Ember.run(App, App.destroy);
    }
});
test("Page features", function() {
    expect(6);
    visit('/contacts').then(function() {
        // We should have a filtertable on the screen
        equal($('.filtertable').length, 1);
        // We want to make sure we have two contacts in the table
        equal($('.filtertable tbody tr').length, 2);
        // Now check the values in one of our rows
        equal($('.filtertable tbody tr:first td:first a').text(), 'Fred P Jones');
        equal($('.filtertable tbody tr:first td:last').text(), '(555) 333-4444');
    });
    visit('/contacts/1').then(function() {
    	// We should have a contact on the page
    	equal($('#contact').length, 1);
    	equal($('#contact li:first').text().trim(), 'Fred P Jones');
    });
});
