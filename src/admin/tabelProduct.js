import React, { useState, useEffect } from 'react';
import { Table, Button, Popconfirm, Row, message } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import '../styles/tableProduct.css';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const TableComponent = () => {
  const [data, setData] = useState([]);
  const { token } = useUser();
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await fetch('https://belaundry-api.sebaris.link/platform/product', {
        headers: {
          'Content-Type': 'application/json',
          'token': token,
          'Cache-Control': 'no-cache',
        },
      }); 
      const result = await response.json();
      const formattedData = result.response.map((item, index) => ({
        key: String(index + 1),
        id: item.id,
        name: item.name,
        description: item.description,
        image: item.image
      }));
      setData(formattedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleEdit = (id) => {
    alert(`Edit product with id: ${id}`);
  };

  const handleDelete = (id) => {
    alert(`Delete product with id: ${id}`);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      hidden: 'true',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (imageUrl) => (
        <img
          src={imageUrl}
          alt="-"
          style={{ width: 100, height: 100, objectFit: 'cover' }} 
        />
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <div>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEdit(record.id)}
            className="action-button"
          />
          <Popconfirm
            title="Are you sure to delete this product?"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button
              icon={<DeleteOutlined />}
              className="action-button"
              style={{ marginLeft: 8 }}
            />
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Row style={{ marginBottom: 16 }}>
        <div style={{ textAlign: 'right', width: '100%' }}>
          <Button type="primary" onClick={() => navigate('/add-product')}>
            Add Product
          </Button>
        </div>
      </Row>

      <Table dataSource={data} columns={columns} size="small"/>
    </div>
  );
};

export default TableComponent;
