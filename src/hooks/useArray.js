import { useState } from 'react';

export function useArray(initial = [], externalState) {
  const internalState = useState(initial);
  const [array, setArray] = externalState ?? internalState;

  function push(item) {
    setArray((currentArray) => [...currentArray, item]);
  }

  function remove(id) {
    setArray((currentArray) => currentArray.filter((item) => item.id !== id));
  }

  function update(id, changes) {
    setArray((currentArray) =>
      currentArray.map((item) =>
        item.id === id ? { ...item, ...changes } : item
      )
    );
  }

  function clear() {
    setArray([]);
  }

  return {
    array,
    set: setArray,
    push,
    remove,
    update,
    clear,
  };
}