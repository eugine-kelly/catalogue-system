import React, {useEffect, useState} from 'react';
import Sidebar from '../Sidebar/Sidebar';
import ActiveUsers from "../charts/ActiveUsers.jsx";


import Sales from "../charts/Sales.jsx";
import CustomersCard from "../Cards/CustomersCard.jsx";
import ProductsCard from "../Cards/ProductsCard.jsx";
import OrdersCard from "../Cards/OrdersCard.jsx";
import {useNavigate} from "react-router-dom";
import sanitizeHtml from "sanitize-html";

function Dashboard({greeting = "Welcome to the Dashboard"}) {

    const [dashboardData, setDashboardData] = useState({
        totalProducts: 567,
        totalOrders: 1234,
        totalCustomers: 890,


    });

    const navigate = useNavigate();

    const handleLogout = () => {

        navigate('/');
    };

    const safeGreeting = sanitizeHtml(greeting, {
        allowedTags: [], // No HTML tags allowed
        allowedAttributes: {}
    });


//     // fetching data from an API
//     useEffect(() => {
//
//     }, []);
//
//     // Simulate fetching data from an API
//     const [productsRes, customerRes, ordersRes] = await Promise.all([
//         fetch('/api/products').then(res => res.json()),
//         fetch('/api/customers').then(res => res.json()),
//         fetch('/api/orders').then(res => res.json())
//     ]);
//
//     // Update state with fetched data
//     const products = await productsRes.json();
//     const customers = await customerRes.json();
//     const orders = await ordersRes.json();
//
//     setDashboardData({
//         totalProducts: products.count || 0,
//         totalOrders: orders.count || 0,
//         totalCustomers: customers.count || 0
//     });
// } catch (err) {
//     console.error('Error fetching dashboard data:', err);
//     setDashboardData({
//         totalProducts: 0,
//         totalOrders: 0,
//         totalCustomers: 0
//     });
// }

    return (

        <div className="flex min-h-screen">
            <Sidebar />


            {/*content*/}
            <div className="flex-1 p-8 flex flex-col justify-center">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-950 mb-4 text-center">Dashboard</h1>
                    <p className="text-xl text-gray-950 text-center font-extrabold">{safeGreeting}</p>
                </div>
                <div className="mb-8 text-right">
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
                    >
                        Sign Out
                    </button>
                </div>

                {/*cards*/}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8 w-full">


                    <ProductsCard />
                    <CustomersCard />
                    <OrdersCard />

                </div>

                    {/*charts section*/}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
                    <ActiveUsers />
                    < Sales />
                    </div>
                {/*malicious inline script*/}
                {/*<script>alert('Malicious Script');</script>*/}


                </div>
            </div>





    );

}

export default Dashboard;