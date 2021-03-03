import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const store = {
  namespaced: true,
  state() {
    return { items: [], total: 0, qty: 0 };
  },
  mutations: mutations,
  actions: actions,
  getters: getters
};

export default store;
