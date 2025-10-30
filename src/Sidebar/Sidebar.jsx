import React from 'react';
import {Link, NavLink} from 'react-router-dom';
import { Package, Users, ShoppingCart, CreditCard, UserCheck, Building, Home } from 'lucide-react';

function Sidebar() {
    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="w-80 bg-slate-800 text-white p-4">
                <nav className="h-full flex flex-col justify-evenly">
                    <NavLink exact to="/" className="flex items-center space-x-3 text-cyan-400 p-3 rounded-lg bg-slate-700">
                        <Home size={20} />
                        <span>Home</span>
                    </NavLink>
                    <NavLink exact to="/products" className="flex items-center space-x-3 text-cyan-400 p-3 rounded-lg hover:bg-slate-700 transition-colors">
                        <Package size={20} />
                        <span>Products</span>
                    </NavLink>
                    <NavLink exact to="/customers" className="flex items-center space-x-3 text-cyan-400 p-3 rounded-lg hover:bg-slate-700 transition-colors">
                        <Users size={20} />
                        <span>Customers</span>
                    </NavLink>
                    <NavLink exact to="/orders" className="flex items-center space-x-3 text-cyan-400 p-3 rounded-lg hover:bg-slate-700 transition-colors">
                        <ShoppingCart size={20} />
                        <span>Orders</span>
                    </NavLink>
                    <NavLink exact to="/payments" className="flex items-center space-x-3 text-cyan-400 p-3 rounded-lg hover:bg-slate-700 transition-colors">
                        <CreditCard size={20} />
                        <span>Payments</span>
                    </NavLink>
                    <NavLink exact to="/employees" className="flex items-center space-x-3 text-cyan-400 p-3 rounded-lg hover:bg-slate-700 transition-colors">
                        <UserCheck size={20} />
                        <span>Employees</span>
                    </NavLink>
                    <NavLink exact to="/offices" className="flex items-center space-x-3 text-cyan-400 p-3 rounded-lg hover:bg-slate-700 transition-colors">
                        <Building size={20} />
                        <span>Offices</span>
                    </NavLink>
                </nav>
            </div>
        </div>
    );

}

export default Sidebar;