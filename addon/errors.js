import Ember from 'ember';

const {
  A: emberArray,
  Object: EmberObject,
  get,
  set,
  run
} = Ember;

const cache = {};

const func = function(property) {
  set(this, property, emberArray());
};

export default EmberObject.extend({
  unknownProperty(property) {
    if (property === 'defineProperty') {
      return;
    }
    if (cache.hasOwnProperty(property)) {
      run.once(this, cache[property]);
    } else {
      Ember.defineProperty(this,property,null );
      const handler = func.bind(this, property);
      cache[property] = handler;
      run.once(this, handler);
    }

    return emberArray();
  }
  
});
