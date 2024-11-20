import React, { useState } from 'react';
import { Form, Input, InputNumber, Button, Select, Upload, message, Typography } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import '../styles/addProduct.css';
import { useUser } from '../context/UserContext';

const { TextArea } = Input;
const { Option } = Select;
const { Text } = Typography;

const AddProductForm = ({name}) => {
  const { token } = useUser();
  const [form] = Form.useForm();

  const addProduct = async (values) => {
    try {
      const response = await fetch('https://belaundry-api.sebaris.link/platform/product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'token' : token,
        },
        body: JSON.stringify({
          name: values.productName,
          description: values.description,
          sku: values.sku,
          stock: values.stock,
          category_id: values.category,
          price: values.price,
          image: values.upload[0].name,
        }),
      });
      const data = await response.json();
      if (data.status === true) {
        message.success(data.message).then(() => {
          form.resetFields();
        });
      } else {
        message.error(data.message);
      }      
    } catch (error) {
      message.error('Something went wrong!');
    } finally {
    }
  };

  return (
    <>
      <Form.Item className="user-name-right">
      <div className="header-container">
        <h1>Add New product</h1>
        <h3 type="secondary">Added by: {name}</h3>
      </div>
    </Form.Item>
      <Form
        form={form} 
        layout="vertical"
        onFinish={addProduct}
        className="responsive-form"
        style={{ maxWidth: 800, margin: '0 auto' }}
      >
        <Form.Item
          label="Product Name"
          name="productName"
          rules={[{ required: true, message: 'Please enter the product name!' }]}
        >
          <Input placeholder="Enter product name" />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: 'Please enter the product description!' }]}
        >
          <TextArea rows={4} placeholder="Enter product description" />
        </Form.Item>

        <Form.Item
          label="SKU"
          name="sku"
          rules={[{ required: true, message: 'Please enter the product SKU!' }]}
        >
          <Input placeholder="Enter product SKU" />
        </Form.Item>

        <Form.Item
          label="Stock"
          name="stock"
          rules={[{ required: true, message: 'Please enter the stock quantity!' }]}
        >
          <InputNumber min={0} placeholder="Enter stock quantity" style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          label="Category"
          name="category"
          rules={[{ required: true, message: 'Please select a category!' }]}
        >
          <Select placeholder="Select a category">
            <Option value="wash-and-fold">Wash and Fold</Option>
            <Option value="dry-clean">Dry Clean</Option>
            <Option value="home">Home</Option>
            <Option value="others">Others</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Price"
          name="price"
          rules={[{ required: true, message: 'Please enter the product price!' }]}
        >
          <InputNumber min={0} prefix="$" placeholder="Enter price" style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          label="Upload Image"
          name="upload"
          valuePropName="fileList"
          getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
        >
          <Upload name="image" listType="picture" maxCount={1}>
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Publish
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default AddProductForm;
