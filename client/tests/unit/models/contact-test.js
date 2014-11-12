import {
    moduleForModel,
    test
}
from 'ember-qunit';
import Ember from 'ember';

moduleForModel('contact', 'Contact', {
    // Specify the other units that are required for this test.
    needs: []
});

test('our fullName computed property behaves properly', function() {
    expect(2);
    var model = this.subject();
    // Test first name and last name only
    Ember.run(function() {
        model.set('firstName', 'Billy');
        model.set('lastName', 'Harris');
        equal(model.get('fullName'), 'Billy Harris');
    });
    // Test middle initial
    Ember.run(function() {
        model.set('middleInitial', 'B');
        equal(model.get('fullName'), 'Billy B Harris');
    });
});
