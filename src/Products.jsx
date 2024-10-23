import React, { useState, useEffect } from 'react';
import data from './data.json'; // Your original data without IDs
import { v4 } from 'uuid';
import AddToCart from './Cart';

export default function Products() {
  // Generate unique IDs for each product
  const productsWithIds = data.map(product => ({
    ...product,
    id: v4() // Generate a unique ID for each product
  }));

  //save to localStorage
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  //Add to cart
  const handleAddToCart = (itemToAdd) => {
    setCart(prevCart => {
      const updatedCart = AddToCart(prevCart, itemToAdd);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  //delete from cart
  const handleRemoveFromCart = (itemToRemove) => {
    setCart(prevCart => {
      const updatedCart = prevCart.filter(cartItem => cartItem.id !== itemToRemove.id);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  // Calculate total price
  const totalPrice = cart.reduce((total, item) => total + item.price, 0).toFixed(2);

  return (
    <>
      <div className='products'>
        {productsWithIds.map((product) => (
          <div className='product' key={product.id}>
            <img 
              src={product.image.desktop}
              alt={product.name}
            />
            <h4>{product.category}</h4>
            <p>{product.name}</p>
            <h3>Price: ${product.price.toFixed(2)}</h3>
            <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
      <div className='cart'>
        <h2>Your Cart ({cart.length})</h2>
        {cart.length > 0 ? (
          <div className='cart-products'>
            {cart.map((cartItem) => (
              <div className='cart-product' key={cartItem.id}>
                <div className='price'>
                  <p>{cartItem.name}</p>
                  <span>${cartItem.price.toFixed(2)}</span>
                </div>
                <button onClick={() => handleRemoveFromCart(cartItem)}>✖</button>
              </div>
            ))}
          </div>
        ) : (
          <p>Your Cart is Empty</p>
        )}
        <div className='total'>
          <p>Order Total</p>
          <h3>${totalPrice}</h3>
        </div>
        <p className='carbon-neutral'>This is a <span>carbon-neutral</span> delivery.</p>
        <button className='order'>Confirm Order</button>
      </div>
    </>
  );
}
