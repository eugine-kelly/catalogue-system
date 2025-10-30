import {Bar, BarChart, ResponsiveContainer} from "recharts";
import React, {useState} from "react";


function ActiveUsers() {

    const [dashboardData, setDashboardData] = useState({
        totalProducts: 567,
        totalOrders: 1234,
        totalCustomers: 890,
        activeUsers: 1234,
        clicks: '2.42m',
        sales: '12.42k',
        items: 320

    });

    //data for charts
    const activityData = [
        {name: 'Jan', users: 10},
        {name: 'Feb', users: 20},
        {name: 'Mar', users: 30},
        {name: 'Apr', users: 40},
        {name: 'May', users: 50}
    ];

    return (
<div>

            {/*active users charts*/}
            <div className="bg-slate-800 p-6 rounded-lg shadow-md w-190">
                <div className="mb-6">
                    <h3 className="text-xl text-white font-bold mb-2">Active Users</h3>
                    <p className="text-green-400 text-sm font-medium">+23% than lastweek</p>
                </div>
                <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={activityData} barCategoryGap="20%">

                        <Bar dataKey="users" fill="#10b981" radius={[4, 4, 0, 0]} />

                    </BarChart>
                </ResponsiveContainer>


                <div className="grid  sm:grid-cols-4 grid-cols-2 gap-6 mt-6 pt-6 border-t border-slate-700">
                    {[
                        { label: "Users", value: dashboardData.activeUsers, progress: 75 },
                        { label: "Clicks", value: dashboardData.clicks, progress: 90 },
                        { label: "Sales", value: dashboardData.sales, progress: 60 },
                        { label: "Items", value: dashboardData.items, progress: 45 },
                    ].map((stat, index) => (
                        <div key={index} className="text-center">
                            <p className="text-slate-400 text-sm">{stat.label}</p>
                            <p className="text-white text-lg font-bold">{stat.value}</p>
                            <div className="w-full bg-slate-700 rounded-full h-1 mt-2">
                                <div
                                    className="bg-teal-400 h-1 rounded-full"
                                    style={{ width: `${stat.progress}%` }}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
</div>


                );

}

export default ActiveUsers;