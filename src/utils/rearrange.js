const dragInit = {}

export function setDragInit(values) {
  const key = Object.keys(values)[0];
  dragInit.dragKey = key;
  dragInit.dragKeyValue = values[key];
}

export function resetDragInit() {
  for (const key in dragInit) {
    delete dragInit[key];
  }
}

export function getDragInit() {
  return dragInit;
}