import Ember from 'ember';

const {
  A: emberArray,
  Object: EmberObject,
  get,
  set,
  run
} = Ember;

export default EmberObject.extend({
  unknownProperty(property) {
    let arr = emberArray();
    run.scheduleOnce('afterRender', this, () => set(this, property, arr));
    return arr;
  }
});
