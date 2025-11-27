import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area 
} from 'recharts';
import { DollarSign, Users, Package, TrendingUp, AlertCircle, RefreshCw, ChevronRight } from 'lucide-react';
import { Card, Badge } from '../../components/UI';
import { MONTHLY_SALES_DATA, MOCK_ORDERS, MOCK_PRODUCTS } from '../../constants';

const StatCard: React.FC<{ title: string; value: string; subValue?: string; icon: React.ReactNode; type: 'pink' | 'blue' | 'white' }> = ({ 
  title, value, subValue, icon, type 
}) => {
  const styles = {
    pink: 'bg-[#ff2d91] text-white',
    blue: 'bg-[#00d0e8] text-white',
    white: 'bg-white text-slate-900 border border-slate-100'
  };

  return (
    <div className={`rounded-3xl p-6 shadow-sm ${styles[type]} relative overflow-hidden group`}>
      <div className="absolute -right-4 -top-4 w-24 h-24 rounded-full bg-white opacity-10" />
      <div className="relative z-10 flex justify-between items-center">
        <div>
          <p className={`text-sm font-medium mb-1 ${type === 'white' ? 'text-slate-500' : 'text-white/80'}`}>{title}</p>
          <h3 className="text-3xl font-bold tracking-tight">{value}</h3>
          {subValue && (
            <p className={`text-xs font-medium mt-1 inline-flex items-center gap-1 ${type === 'white' ? 'text-emerald-500' : 'text-white/90'}`}>
              <TrendingUp size={12}/> {subValue}
            </p>
          )}
        </div>
        <div className={`p-3 rounded-2xl ${type === 'white' ? 'bg-pink-50 text-[#ff2d91]' : 'bg-white/20 text-white'}`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

export const AdminDashboard: React.FC = () => {
  const lowStockItems = MOCK_PRODUCTS.filter(p => p.stock < 20);

  return (
    <div className="space-y-6">
      <div className="md:hidden">
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-sm text-slate-500">Overview for today</p>
      </div>

      {/* Stats Grid - Stacked on Mobile */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Total Sales" 
          value="$12,450" 
          subValue="+12%"
          icon={<DollarSign size={24} />} 
          type="pink"
        />
        <StatCard 
          title="Payments" 
          value="$3,200" 
          subValue="Cash & Bank"
          icon={<DollarSign size={24} />} 
          type="blue"
        />
        <div className="grid grid-cols-2 gap-4 md:col-span-2 lg:col-span-2">
            <StatCard 
            title="Returns" 
            value="12" 
            icon={<RefreshCw size={24} />} 
            type="white"
            />
            <StatCard 
            title="Alerts" 
            value={`${lowStockItems.length}`} 
            icon={<AlertCircle size={24} />} 
            type="white"
            />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart - Hidden on very small screens if needed, or simplified */}
        <Card title="Sales Trend" className="lg:col-span-2 min-h-[300px]">
          <div className="h-64 w-full mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MONTHLY_SALES_DATA}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ff2d91" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#ff2d91" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} dx={-10} tickFormatter={(val) => `${val/1000}k`} />
                <Tooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}} />
                <Area type="monotone" dataKey="sales" stroke="#ff2d91" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Actionable List */}
        <div className="space-y-6">
            <Card title="Low Stock Alerts">
              <div className="space-y-3">
                {lowStockItems.map(item => (
                    <div key={item.id} className="flex items-center justify-between p-3 rounded-2xl bg-red-50 border border-red-100">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-red-500 shadow-sm">
                                <AlertCircle size={16}/>
                            </div>
                            <div>
                                <p className="text-sm font-bold text-slate-800">{item.name}</p>
                                <p className="text-xs text-red-500 font-medium">{item.stock} {item.unit} left</p>
                            </div>
                        </div>
                    </div>
                ))}
              </div>
            </Card>

            <Card title="Latest Orders">
              <div className="space-y-1">
                {MOCK_ORDERS.slice(0, 3).map(order => (
                  <div key={order.id} className="flex items-center justify-between p-3 border-b border-slate-50 last:border-0">
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-800 text-sm">{order.clientName}</span>
                      <span className="text-xs text-slate-400">${order.total} • {order.items.length} items</span>
                    </div>
                    <Badge color={order.status === 'DELIVERED' ? 'green' : 'yellow'}>
                      {order.status}
                    </Badge>
                  </div>
                ))}
                <button className="w-full py-2 text-xs font-bold text-[#ff2d91] uppercase tracking-wide flex items-center justify-center gap-1 mt-2">
                    View All Orders <ChevronRight size={14} />
                </button>
              </div>
            </Card>
        </div>
      </div>
    </div>
  );
};