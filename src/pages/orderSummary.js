import React from 'react';
import { Button } from 'antd';
import '../styles/orderSummary.css';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const OrderSummary = ({ address, products }) => {
    const { data } = useUser(); 
    const navigate = useNavigate();
  const calculateTotal = () => {
    return products.reduce((total, product) => total + product.qty * product.price, 0);
  };

  return (
    <div className="order-summary">
    <div className="order-summary-container">
      <h2 className="order-summary-title">Order Summary</h2>
      <p><strong>Name:</strong> {data}</p>
      <p><strong>Address:</strong> {address}</p>
      <hr />
      <div>
        <h3>Products:</h3>
        {products.map((product, index) => (
          <div key={index} className="product-item">
            <img src={product.image} alt={product.name} className="product-image" />
            <div className="product-details">
              <div><strong>{product.name}</strong></div>
              <div>Qty: {product.qty}</div>
              <div>Price: ${product.price + '.00'}</div>
            </div>
          </div>
        ))}
      </div>
      <hr />
      <div className="order-total">
        <strong>Total:</strong>
        <span>${calculateTotal() + '.00'}</span>
      </div>
      <div className="whatsapp-button">
        <Button type='primary'>WhatsApp</Button>
        <Button type='default' onClick={() => navigate('/home')}>Kembali</Button>
      </div>
    </div>
    </div>
  );
};

export default OrderSummary;
