import { writable, get } from 'svelte/store';
import localforage from 'localforage';

localforage.config({
  driver: localforage.LOCALSTORAGE,
  name: 'csdb',
});

function createLocalStorageStore(key, initialValue) {
  const store = writable(initialValue);

  localforage.getItem(key).then(local_value => {
    store.set(local_value);
  });

  return {
    subscribe: store.subscribe,
    set(value) {
      localforage.setItem(key, value);
      store.set(value);
    },
    update(cb) {
      const value = cb(get(store));
      this.set(value);
    },
  };
}

export { createLocalStorageStore };
