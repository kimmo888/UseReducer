import { useReducer } from "react";
import productReducer, { initialProductState } from "./reducers/productReducer";
import types from "./types";

const ProductApp = () => {
    const [productState, dispatch] = useReducer(productReducer, initialProductState);

    const { products, cart, productActive } = productState;

    return (
        <div>
            <h2>Product</h2>
            <ul>
                {products.map(product => (
                    <li key={product.id} >
                        {product.title}
                        <button onClick={()=>dispatch({
                            type: types.productShow,
                            payload: product.id
                        })}>
                        Show
                        </button>
                        <button onClick={()=> dispatch({
                            type: types.productAddToCart,
                            payload: product.id
                        })} >
                        Add to Car
                        </button>
                    </li>
                ))}
            </ul>
            <h2>Cart</h2>
            <ul>
                {cart.map(product => (
                    <li key={product.id} >
                        {product.title}  - quantity: {product.quantity}
                        <button onClick={()=> dispatch({
                            type: types.productRemoveFromCart,
                            payload: product.id
                        })} >
                            Remove one
                        </button>
                        <button onClick={()=> dispatch({
                            type: types.productDeleteFromCart,
                            payload: product.id
                        })} >
                            Delete All
                        </button>
                    </li>
                ))}
            </ul>
            <h2>Preview</h2>
            <p>{productActive.title}</p>
            <p>-------------------------End----------------------</p>
        </div>
    )
}

export default ProductApp;