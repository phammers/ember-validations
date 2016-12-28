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
    if (cache.hasOwnProperty(property)) {
      run.once(this, cache[property]);
    } else {
      const handler = func.bind(this, property);
      cache[property] = handler;
      run.once(this, handler);
    }

    return emberArray();
  }
});
