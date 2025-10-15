const initialState = {
    cart: [],
    totalPrice: 0,
    cartId: null,
};

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_CART": {
            const productToAdd = action.payload;

            // Ensure cart is always array
            const cartArray = Array.isArray(state.cart) ? state.cart : [];

            const existingProduct = cartArray.find(
                (item) => item.productId === productToAdd.productId
            );

            let updatedCart;
            if (existingProduct) {
                // Replace existing product
                updatedCart = cartArray.map((item) =>
                    item.productId === productToAdd.productId ? productToAdd : item
                );
            } else {
                // Add new product
                updatedCart = [...cartArray, productToAdd];
            }

            return {
                ...state,
                cart: updatedCart,
                
            };
        }

        case "REMOVE_CART": {
            const cartArray = Array.isArray(state.cart) ? state.cart : [];
            return {
                ...state,
                cart: cartArray.filter(
                    (item) => item.productId !== action.payload.productId
                ),
            };
        }

        case "GET_USER_CART_PRODUCTS": {
            // Ensure payload.cart is always array
            const cartArray = Array.isArray(action.payload) ? action.payload : [];

            return {
                ...state,
                cart: cartArray,
                totalPrice: action.totalPrice ?? 0,
                cartId: action.cartId ?? null,
            };
        }

        case "CLEAR_CART":
            return { ...initialState };

        default:
            return state;
    }
};
