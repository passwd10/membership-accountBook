const selector = (id, node = document) => {
  return node.querySelector(id);
};

const selectorAll = (id, node = document) => {
  return node.querySelectorAll(id);
};


export { selector, selectorAll };
