import { createStore } from 'vuex';
import productsModule from './products/index.js';
import cartModule from './cart/index.js';

const store = createStore({
  modules: {
    prods: productsModule,
    cart: cartModule
  },
  state() {
    return { isLoggedIn: false };
  },
  mutations: {
    authenticationStatus(state, payload) {
      state.isLoggedIn = payload.authenticated;
    }
  },
  actions: {
    login(context) {
      context.commit('authenticationStatus', { authenticated: true });
    },
    logout(context) {
      context.commit('authenticationStatus', { authenticated: false });
    }
  },
  getters: {
    isLoggedIn(state) {
      return state.isLoggedIn;
    }
  }
});

export default store;
