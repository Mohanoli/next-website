"use client";

import {
    Users,
    TrendingUp,
    ShoppingBag,
    DollarSign,
    ArrowUpRight,
    ArrowDownRight
} from "lucide-react";

const stats = [
    {
        name: "Total Users",
        value: "2,543",
        change: "+12.5%",
        trend: "up",
        icon: Users,
        color: "blue",
        gradient: "from-blue-500 to-indigo-600",
    },
    {
        name: "Total Revenue",
        value: "$45,231",
        change: "+8.2%",
        trend: "up",
        icon: DollarSign,
        color: "teal",
        gradient: "from-teal-500 to-emerald-600",
    },
    {
        name: "Active Orders",
        value: "142",
        change: "+4.1%",
        trend: "up",
        icon: ShoppingBag,
        color: "purple",
        gradient: "from-purple-500 to-violet-600",
    },
    {
        name: "Conversion Rate",
        value: "3.24%",
        change: "-1.5%",
        trend: "down",
        icon: TrendingUp,
        color: "rose",
        gradient: "from-rose-500 to-pink-600",
    },
];

const Dashboard = () => {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold text-slate-900 mb-6">Dashboard</h1>
            <DashboardStats />
        </div>
    );
};

export default Dashboard;

export const DashboardStats = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
                <div
                    key={stat.name}
                    className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-300 group"
                >
                    <div className="flex items-center justify-between mb-4">
                        <div className={`p-3 rounded-xl bg-linear-to-br ${stat.gradient} text-white shadow-lg shadow-${stat.color}-500/20 group-hover:scale-110 transition-transform duration-300`}>
                            <stat.icon size={24} />
                        </div>
                        <div className={`flex items-center gap-1 text-sm font-medium ${stat.trend === 'up' ? 'text-emerald-600' : 'text-rose-600'
                            }`}>
                            {stat.trend === 'up' ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                            <span>{stat.change}</span>
                        </div>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-slate-500">{stat.name}</p>
                        <h3 className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</h3>
                    </div>
                </div>
            ))}
        </div>
    );
};
