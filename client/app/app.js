import Ember from 'ember';
import DS from 'ember-data';
import Resolver from 'ember/resolver';
import loadInitializers from 'ember/load-initializers';
import config from './config/environment';

Ember.MODEL_FACTORY_INJECTIONS = true;

var adapter;
// var env = config.environment; 
// if (env === 'development' || env === 'test') {
//   adapter = DS.FixtureAdapter.extend({
//     latency: 500
//   });
// } else {
  adapter = DS.ActiveModelAdapter.extend({
    // pathForType: function(type) {
    //   return 'form_hero/' + type;
    // },
    // find: function(store, type, id) {
    //   return this.ajax(this.buildURL(type.typeKey, id) + '/edit', 'GET');
    // }
  });
// }

var App = Ember.Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver: Resolver,
  ApplicationAdapter: adapter
});

loadInitializers(App, config.modulePrefix);

export default App;
