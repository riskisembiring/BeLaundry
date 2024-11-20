import React, { useState, useEffect } from 'react';
import { Layout, Menu, Button, Drawer } from 'antd';
import { Link } from 'react-router-dom';
import {
  HomeOutlined,
  ShopOutlined,
  DollarOutlined,
  SettingOutlined,
  MenuOutlined,
} from '@ant-design/icons';
import '../../styles/navbar.css';

const { Sider, Header } = Layout;

const SideNavbar = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [drawerVisible, setDrawerVisible] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleDrawer = () => {
    setDrawerVisible(!drawerVisible);
  };

  const logoSection = (
    <div className="logo-section">
      <img src="/path/to/logo.png" alt="belaundry logo" className="logo" />
      <span className="brand-name">belaundry</span>
    </div>
  );

  const menuItems = (
    <Menu
      theme="light"
      mode="vertical"
      defaultSelectedKeys={['1']}
      style={{ backgroundColor: '#2D9CDB' }}
    >
      <Menu.Item key="2" icon={<HomeOutlined />}>
        <Link to="/">Home</Link>
      </Menu.Item>
      <Menu.Item key="1" icon={<ShopOutlined />}>
        <Link to="/products">Product</Link>
      </Menu.Item>
      <Menu.Item key="3" icon={<DollarOutlined />}>
        <Link to="/sales">Sales</Link>
      </Menu.Item>
      <Menu.Item key="4" icon={<SettingOutlined />}>
        <Link to="/settings">Setting</Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <div>
      {isMobile ? (
        <Header
          style={{
            backgroundColor: '#2D9CDB',
            display: 'flex',
            alignItems: 'center',
            padding: '0 16px',
            position: 'fixed',
            width: '100%',
            zIndex: 1000,
          }}
        >
          {logoSection}
          <Button
            type="text"
            icon={<MenuOutlined style={{ fontSize: '24px', color: 'white' }} />}
            onClick={toggleDrawer}
            style={{ marginLeft: 'auto' }}
          />
          <Drawer
            title="Menu"
            placement="top"
            closable={true}
            onClose={toggleDrawer}
            visible={drawerVisible}
            height="auto"
            bodyStyle={{ padding: 0, margin: 0 }}
            drawerStyle={{ backgroundColor: '#2D9CDB' }}
          >
            {menuItems}
          </Drawer>
        </Header>
      ) : (
        <Sider
          width={200}
          style={{ minHeight: '100vh', backgroundColor: '#2D9CDB', position: 'fixed', left: 0 }}
        >
          {logoSection}
          {menuItems}
        </Sider>
      )}
    </div>
  );
};

export default SideNavbar;
