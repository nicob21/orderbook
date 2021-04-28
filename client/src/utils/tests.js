/* Return node(s) with the given data-test attribute */
export const findByTestAttr = (wrapper, val) => {
  return wrapper.dive().find(`[data-test="${val}"]`);
};

export const findByTestAttrNoHook = (wrapper, val) => {
  return wrapper.find(`[data-test="${val}"]`);
};
