import {Users} from "lucide-react";
import React, {useState} from "react";


function CustomersCard() {

    const [dashboardData, setDashboardData] = useState({
        totalProducts: 567,
        totalOrders: 1234,
        totalCustomers: 890,


    });

    return (
        <div className="flex flex-col space-y-4">
            <div className="bg-white p-6 rounded-lg shadow-md justify-center h-70 flex flex-col">
                <div className="flex items-center justify-center mb-6">
                    <Users className="text-gray-950 mr-3" size={32} />
                    <h3 className="text-gray-950 font-extrabold">Total Customers</h3>
                </div>
                <p className="text-4xl font-extrabold text-center">{dashboardData.totalCustomers}</p>
            </div>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors">View Customers</button>
        </div>
    )


}

export default CustomersCard;