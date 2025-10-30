import {Package} from "lucide-react";
import React, {useState} from "react";


function ProductsCard() {

    const [dashboardData, setDashboardData] = useState({
        totalProducts: 567,
        totalOrders: 1234,
        totalCustomers: 890,


    });

    return(
        <div className="flex flex-col space-y-4">
            <div className="bg-white p-6 rounded-lg shadow-md justify-center h-70 flex flex-col">
                <div className="flex items-center justify-center mb-6">
                    <Package className="text-gray-950 mr-3" size={32}/>
                    <h3 className="text-gray-950 font-extrabold">Total Products</h3>

                </div>
                <p className="text-4xl font-bold text-gray-800 text-center">{dashboardData.totalProducts}</p>
            </div>

            <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors">View Products</button>


        </div>

    )


}

export default ProductsCard;