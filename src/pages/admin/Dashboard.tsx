import React from 'react';
import { BarChart, Users, ShoppingBag, DollarSign } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const stats = [
    { name: 'Total Sales', value: '$12,345', change: '+12%', icon: DollarSign },
    { name: 'Active Users', value: '1,234', change: '+8%', icon: Users },
    { name: 'Orders', value: '567', change: '+23%', icon: ShoppingBag },
    { name: 'Revenue', value: '$89,012', change: '+15%', icon: BarChart },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-primary-100 rounded-lg">
                <stat.icon className="h-6 w-6 text-primary-600" />
              </div>
              <span className={`text-sm font-medium ${
                stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.change}
              </span>
            </div>
            <h3 className="text-sm font-medium text-gray-500">{stat.name}</h3>
            <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>
      
      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-medium mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((_, index) => (
            <div key={index} className="flex items-center justify-between py-3 border-b last:border-0">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gray-100 rounded-full"></div>
                <div>
                  <p className="font-medium">New order #1234</p>
                  <p className="text-sm text-gray-500">2 minutes ago</p>
                </div>
              </div>
              <span className="text-sm font-medium text-primary-600">View</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;