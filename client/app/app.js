import Ember from 'ember';
import DS from 'ember-data';
import Resolver from 'ember/resolver';
import loadInitializers from 'ember/load-initializers';
import config from './config/environment';

Ember.MODEL_FACTORY_INJECTIONS = true;

var adapter;
var env = config.environment; 
if (env === 'test') {
  adapter = DS.FixtureAdapter.extend({
    latency: 500
  });
} else {
  adapter = DS.ActiveModelAdapter;
}

var App = Ember.Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver: Resolver,
  ApplicationAdapter: adapter
});

loadInitializers(App, config.modulePrefix);

export default App;
