import React from 'react';
import { useBasket } from '../../../context/BasketContext';
import './BasketPage.css';
import brokenImg  from '../../../assets/broken-image.png';

const BasketPage = () => {
  const { basket, removeFromBasket, clearBasket } = useBasket();

  console.log("basket",basket);
  const totalPrice = basket.reduce(
    (acc, item) => acc + item.productId.price * item.quantity,
    0
  ).toFixed(2);

  return (
    <div className="basket-page">
      <h1>Your Basket</h1>
      {basket.length === 0 ? (
        <p className="empty-message">Your basket is empty.</p>
      ) : (
        <>
          <ul className="basket-list">
            {basket.map((item) => (
              <li key={item.productId._id} className="basket-item">
                <div className="product-info">
                  <img
                    src={item.productId.image || brokenImg}
                    alt={item.productId.name}
                    className="product-image"
                  />
                  <h3 className="product-name">{item.productId.name}</h3>
                  <p className="product-price">${item.productId.price.toFixed(2)}</p>
                </div>
                <div className="quantity-info">
                  <p>Quantity: {item.quantity}</p>
                  <p>Total: ${(item.productId.price * item.quantity).toFixed(2)}</p>
                </div>
                <button
                  className="remove-button"
                  onClick={() => removeFromBasket(item.productId._id)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div className="basket-summary">
            <p className="total-price">Total: ${totalPrice}</p>
            <div className="action-buttons">
              <button className="clear-button" onClick={clearBasket}>
                Clear Basket
              </button>
              <button className="checkout-button">Checkout</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default BasketPage;
