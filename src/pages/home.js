// src/pages/home.js
import React, { useState } from 'react';
import { Card, Typography, Button, Row, Col, Modal, Input } from 'antd';
import { useUser } from '../context/UserContext';
import '../styles/home.css';
import { useNavigate } from 'react-router-dom';
import products from '../dataDummy/products';

const { Title, Text } = Typography;

const Home = () => {
  const { data } = useUser(); 
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [productList, setProductList] = useState(products);
  const [inputValue, setInputValue] = useState(0);

  const showModal = (product) => {
    setSelectedProduct(product);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };


  const increment = () => {
    setInputValue(prevValue => prevValue + 1); 
  };

  const decrement = () => {
    setInputValue(prevValue => (prevValue > 0 ? prevValue - 1 : 0)); 
  };

  return (
    <div className="home-container">
      <Title level={4}>Wellcome, {data}</Title>
      <Card className="balance-card">
        <div className="welcome-message">       
          <div className="balance-info">
            <Text>Your Balance</Text>
            <Title level={2} className="balance-amount">$ 200.00</Title>
          </div>
        </div>
      </Card>

      <Card className="previous-order-card">
        <Title level={5}>Previous Order</Title>
        <div className="order-info">
          <img src="../images/image2.png" alt="Bag of Laundry" className="order-image" />
          <div>
            <Text>Total Order</Text>
            <Title level={4} className="order-amount">$ 180.00</Title>
          </div>
          <Button 
            type="primary" 
            onClick={() => navigate('/orderSummary')}
            className="invoice-button"
            >
            Invoice
        </Button>
        </div>
      </Card>

      <Card className="most-ordered-card">
        <Title level={5}>Your Most Ordered</Title>
        <div className="order-item">
          <img src="../images/rectangle8.jpg" alt="Dry Cleaning" className="order-image" />
          <div className="order-details">
            <Text>Dry Cleaning</Text>
            <Text>12x | total of $ 4.000</Text>
          </div>
        </div>
      </Card>

      {/* Latest Products Section */}
      <div className="latest-products-section">
      <Title level={5}>Our Latest Product</Title>
      <Row gutter={16}>
        {productList.map((productList, index) => (
          <Col span={12} key={index}>
            <Card
              className="product-card"
              hoverable
              onClick={() => showModal(productList)} 
            >
              <img src={productList.image} alt={productList.name} className="product-image" />
              <div className="product-info">
                <Text>{productList.name}</Text>
                <Text>{productList.price}</Text>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

        <Modal
        title={selectedProduct.name}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={600}
        closable={false}
      >
        <img
          src={selectedProduct.image}
          alt={selectedProduct.name}
          style={{ width: '100%', maxHeight: '600px' }}
        />
        <p><strong>Price:</strong> {selectedProduct.price}</p>
        <p>{selectedProduct.descriptions}</p>
        <div className="quantity-container">
      <Button onClick={decrement}>-</Button>
      <Input 
        value={inputValue} 
        readOnly
        style={{ width: '60px', textAlign: 'center' }} 
      />
      <Button onClick={increment}>+</Button>
    </div>
      </Modal>
      </div>
    </div>
  );
};

export default Home;
