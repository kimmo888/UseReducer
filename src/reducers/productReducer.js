import types from "../types";

export const initialProductState = {
    products: [
        {id: 1, title: "Product 1", price: 100,quantity: 1},
        {id: 2, title: "Product 2", price: 50,quantity: 1},
        {id: 3, title: "Product 3", price: 120,quantity: 1},
    ],
    cart: [
        {id: 1, title: "Product 1", price: 100, quantity: 1},
    ], // es recomendable trabajar solo con los id los quantity
    productActive: {id: 1, title: "Product 1", price: 100},
}

const productReducer = (state = {}, action) => {
    switch (action.type) {
        case types.productShow:
            return {
                ...state, productActive: state.products.find(product => product.id === action.payload)
            }
        case types.productAddToCart:{
            const cartNewProduct = state.cart.find(product => product.id === action.payload);

            return cartNewProduct
            ?{
                ...state, cart: state.cart.map(product => product.id === action.payload ? {...product, quantity: product.quantity + 1} : product)
            }
            : {
            ...state, cart:[...state.cart,{...state.products.find(product => product.id === action.payload), quantity: 1}]
            }
        }
        case types.productRemoveFromCart:{
            const productDelete= state.cart.find(product => product.id === action.payload);

            return productDelete.quantity > 1
            ?
            {
                ...state, cart: [...state.cart.map(product => product.id === action.payload ? {...product, quantity: product.quantity - 1} : product)]
            }
            :{
                ...state, cart: state.cart.filter(product => product.id !== action.payload)
            }
        }
        case types.productDeleteFromCart:
            return {
                ...state, cart: state.cart.filter(product => product.id !== action.payload)
            }
        default:
            return state;
    }
}
export default productReducer;