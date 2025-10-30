import {Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import React from "react";

function Sales() {


    const salesData = [
        {name: 'Jan', current: 50 , users: 60},
        {name: 'Feb', current: 50 ,users: 70},
        {name: 'Mar', current: 50 ,users: 80},
        {name: 'Apr', current: 50 ,users: 90},
        {name: 'May', current: 50 ,users: 150}
    ];

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg w-full">
            <div className="mb-6">
                <h3 className="text-lg font-bold mb-4">Sales Overview</h3>
                <p className="text-green-400 text-sm font-medium">+23% than lastweek</p>
            </div>
            <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={salesData} >
                    <defs>
                        <linearGradient id="colorCurrent" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#06d6a0" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#06d6a0" stopOpacity={0.1}/>
                        </linearGradient>
                        <linearGradient id="colorPrevious" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#64748b" stopOpacity={0.2}/>
                            <stop offset="95%" stopColor="#64748b" stopOpacity={0.1}/>
                        </linearGradient>
                    </defs>
                    <XAxis
                        dataKey="name"
                        axisLine={false}
                        tickLine={false}
                        tick={{fill: '#94a3b8',fontSize: 12}}
                    />
                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{fill: '#94a3b8',fontSize: 12}}
                    />

                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0"/>
                    <Tooltip
                        contentStyle={{
                            backgroundColor: '#1e293b',
                            border: 'none',
                            borderRadius: '8px',
                            color:'white'
                        }}
                    />

                    <Area
                        type="monotone"
                        dataKey="users"
                        stroke="#64748b"
                        strokeWidth={2}
                        fill="url(#colorPrevious)"
                    />
                    <Area
                        type="monotone"
                        dataKey="current"
                        stroke="#06d6a0"
                        strokeWidth={3}
                        fill="url(#colorCurrent)"
                    />
                </AreaChart>

            </ResponsiveContainer>
            <p className="mt-4 text-green-600 font-bold">5% more in 2025 </p>
        </div>





)

}

export default Sales;