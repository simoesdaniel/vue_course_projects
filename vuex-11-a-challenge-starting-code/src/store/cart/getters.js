const getters = {
  cartTotals(state) {
    return state.total;
  },
  cartQty(state) {
    return state.qty;
  },
  cartItems(state) {
    return state.items;
  }
};

export default getters;
