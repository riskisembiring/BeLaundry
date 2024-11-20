import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import { Layout } from 'antd';
import Sign from './pages/sign';
import SignUp from './pages/signup';
import Home from './pages/home';
// import HomeAdmin from './admin/homeAdmin';
import TableProducts from './admin/tabelProduct';
import OrderSummary from './pages/orderSummary';
import sampleProducts from './dataDummy/data';
import SideNavbar from './admin/components/navbar';
import AddProduct from './admin/addProduct';
import './index.css';

const { Content } = Layout;

const App = () => {
  return (
    <UserProvider>
      <Router>
        <AppLayout />
      </Router>
    </UserProvider>
  );
};

// Component to handle layout rendering
const AppLayout = () => {
  const location = useLocation(); // Get current location

  // Check if current route is one of the ones where sidebar should be hidden
  const hideNavbarRoutes = ['/sign', '/signup', '/home', '/orderSummary'];
  const showNavbar = !hideNavbarRoutes.includes(location.pathname);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* Conditionally render the SideNavbar */}
      {showNavbar && <SideNavbar />} 
      <Layout className="layout">
        <Content style={{ padding: '24px' }}>
          <Routes>
            <Route path="/sign" element={<Sign />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/home" element={<Home />} />
            {/* <Route path="/homeAdmin" element={<HomeAdmin />} /> */}
            <Route path="" element={<TableProducts />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route
              path="/orderSummary"
              element={<OrderSummary products={sampleProducts} customerName="Riski" address="Depok, West Java" />}
            />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
