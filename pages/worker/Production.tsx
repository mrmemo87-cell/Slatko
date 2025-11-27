import React, { useState } from 'react';
import { Package, Clock, CheckCircle } from 'lucide-react';
import { Card, Button, Input, Table, Badge } from '../../components/UI';
import { MOCK_ORDERS } from '../../constants';

export const ProductionPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'create' | 'orders'>('create');
  
  // Pending orders for Worker to see
  const pendingOrders = MOCK_ORDERS.filter(o => o.status === 'PENDING');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Production & Orders</h1>
        <p className="text-slate-500">Manage daily production batches and prepare orders.</p>
      </div>

      <div className="flex gap-4 border-b border-slate-200">
        <button 
          onClick={() => setActiveTab('create')}
          className={`pb-3 px-1 font-medium text-sm transition-colors relative ${activeTab === 'create' ? 'text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
        >
          Create Batch
          {activeTab === 'create' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-t-full" />}
        </button>
        <button 
          onClick={() => setActiveTab('orders')}
          className={`pb-3 px-1 font-medium text-sm transition-colors relative ${activeTab === 'orders' ? 'text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
        >
          Orders Queue <Badge color="yellow" >{pendingOrders.length}</Badge>
          {activeTab === 'orders' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-t-full" />}
        </button>
      </div>

      {activeTab === 'create' ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card title="New Production Batch">
            <form className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Product Produced</label>
                <select className="w-full border border-slate-300 rounded-lg p-2.5 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none">
                  <option>Premium Coffee Beans (1kg)</option>
                  <option>Caramel Syrup</option>
                  <option>Vanilla Syrup</option>
                </select>
              </div>
              <Input label="Batch Number" placeholder="Auto-generated e.g. B-20231026-01" />
              <Input label="Quantity Produced" type="number" placeholder="0" />
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Notes</label>
                <textarea className="w-full border border-slate-300 rounded-lg p-2.5 h-24 resize-none focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="Quality check notes..."></textarea>
              </div>
              <Button className="w-full" size="lg" icon={<Package size={18} />}>Record Production</Button>
            </form>
          </Card>

          <Card title="Recent Batches">
            <div className="space-y-4">
              {[1,2,3].map(i => (
                <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                   <div>
                     <p className="font-medium text-slate-800">Batch #B-20231025-0{i}</p>
                     <p className="text-xs text-slate-500">Premium Coffee Beans • 50kg</p>
                   </div>
                   <div className="text-right">
                     <p className="text-xs text-slate-500">Today, 10:30 AM</p>
                     <span className="text-xs font-medium text-emerald-600">Verified</span>
                   </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      ) : (
        <Card className="p-0">
          <Table 
            data={pendingOrders}
            columns={[
              { header: 'Order ID', accessor: (o) => <span className="font-mono text-xs">{o.id}</span> },
              { header: 'Client', accessor: (o) => o.clientName },
              { header: 'Items', accessor: (o) => (
                <div className="flex flex-col gap-1">
                  {o.items.map((i, idx) => (
                    <span key={idx} className="text-xs text-slate-600 bg-slate-100 px-2 py-0.5 rounded w-fit">
                      {i.quantity}x {i.productName}
                    </span>
                  ))}
                </div>
              )},
              { header: 'Action', accessor: (o) => (
                <Button size="sm" variant="outline" className="text-blue-600 border-blue-200 bg-blue-50 hover:bg-blue-100">
                  Mark Prepared
                </Button>
              )}
            ]}
          />
        </Card>
      )}
    </div>
  );
};
