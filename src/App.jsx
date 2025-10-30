import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './views/Dashboard.jsx';
import Customer from './views/Customer.jsx';
import Orders from './views/Orders.jsx';
import Products from './views/Products.jsx';
import Employees from "./views/Employees.jsx";
import Payments from "./views/Payments.jsx";
import Offices from "./views/Offices.jsx";
import Login from "./views/Login.jsx";



function App() {

return(
    <Router>



            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/customers" element={<Customer />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/products" element={<Products />} />
                <Route path="/employees" element={<Employees />} />
                <Route path="payments" element={<Payments />} />
                <Route path="/offices" element={<Offices />} />
                <Route path="/dashboard" element={<Dashboard />} />
                {/* Add more routes as needed */}
            </Routes>


    </Router>


);


}

export default App
