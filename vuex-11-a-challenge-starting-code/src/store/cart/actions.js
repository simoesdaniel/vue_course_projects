const actions = {
    addProductToCart(context,payload){
        console.log(payload);
        context.commit('addToCart', payload);
    },
    removeProductFromCart(context,payload){
        context.commit('removeFromCart', payload);
    },
};

export default actions;
