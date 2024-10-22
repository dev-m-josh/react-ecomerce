import React, {useState} from 'react'
import data from './data.json'
import AddToCart from './Cart'


export default function Products() {
     // State to hold cart items
    const [cart, setCart] = useState([]);

    //add to cart
    function handleAddToCart(itemToAdd){
        // Update the cart
        setCart(prevCart => AddToCart(prevCart, itemToAdd)); 
      };

      //remove from cart
      const handleRemoveFromCart = (itemToRemove) => {
        //update the cart
        setCart(prevCart => prevCart.filter(cartItem => cartItem !== itemToRemove));
      };
    
  return (
    <div>
      {data.map((product, index) => (
        <div key={index}>
            <img 
            src={product.image.desktop}
            alt={product.name}
            />
            <h4>{product.category}</h4>
            <p>{product.name}</p>
            <h4>Price:{product.price}</h4>
            <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
        </div>
      ))}
      <div>
      <h2>Cart</h2>
      {cart.length > 0 ? (
        <ul>
            {cart.map((cartItem, index) => (
                <div key={index}>
                <img src={cartItem.image.desktop}/>
                <div>
                <p>{cartItem.name} -</p> 
                <h3>${cartItem.price}</h3>
                </div>
                <button onClick={() => handleRemoveFromCart(cartItem)}>Remove</button>
                </div>
            ))}
        </ul>
      ) : (
        <p>Your Cart is Empty</p>
      )}
      <p>You have {cart.length} selected items.</p>
      </div>
    </div>
  )
}
