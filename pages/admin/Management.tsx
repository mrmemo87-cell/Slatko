import React, { useState } from 'react';
import { Plus, Search, Filter, Edit, Eye, Trash2 } from 'lucide-react';
import { Card, Button, Input, Table, Modal, Badge } from '../../components/UI';
import { useResource } from '../../hooks/useResource';

type ResourceType = 'clients' | 'products' | 'users' | 'inventory' | 'purchases' | 'invoices' | 'production';

interface ManagementPageProps {
  type: ResourceType;
}

export const ManagementPage: React.FC<ManagementPageProps> = ({ type }) => {
  const { data: resourceData, loading, error } = useResource(type);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  // Client Detail View (Simulated)
  const renderClientDetails = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-start bg-slate-50 p-6 rounded-2xl border border-slate-100">
        <div>
          <h4 className="text-2xl font-bold text-slate-900">{selectedItem?.name}</h4>
          <p className="text-slate-500 mt-1">{selectedItem?.address}</p>
          <div className="mt-4 flex gap-3">
            <Badge color="blue">Active Client</Badge>
            <Badge color={selectedItem?.balance > 0 ? 'red' : 'green'}>Balance: ${selectedItem?.balance?.toFixed(2)}</Badge>
          </div>
        </div>
        <Button variant="outline" size="sm" icon={<Edit size={14} />}>Edit Profile</Button>
      </div>

      <h4 className="font-bold text-lg mt-4">Recent History</h4>
      <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              <th className="p-4">Date</th>
              <th className="p-4">Type</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            <tr>
              <td className="p-4">Oct 26, 2023</td>
              <td className="p-4">Invoice #INV-2023-001</td>
              <td className="p-4">$155.00</td>
              <td className="p-4"><Badge color="yellow">Pending</Badge></td>
            </tr>
            <tr>
              <td className="p-4">Oct 20, 2023</td>
              <td className="p-4">Payment (Cash)</td>
              <td className="p-4 text-green-600 font-bold">+$320.00</td>
              <td className="p-4"><Badge color="green">Completed</Badge></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  const config = {
    clients: {
      title: 'Clients Directory',
      data: resourceData || [],
      columns: [
        { header: 'Client Name', accessor: (item: any) => <span className="font-bold text-slate-800">{item.name}</span> },
        { header: 'Contact', accessor: (item: any) => <div className="text-xs text-slate-500"><p>{item.phone}</p><p>{item.address}</p></div> },
        {
          header: 'Balance', accessor: (item: any) => (
            <span className={`font-bold ${item.balance > 0 ? 'text-rose-500' : 'text-emerald-500'}`}>
              ${item.balance?.toFixed(2) || '0.00'}
            </span>
          )
        },
        {
          header: 'Actions', accessor: (item: any) => (
            <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); setSelectedItem(item); setIsModalOpen(true); }} icon={<Eye size={16} />}>View</Button>
          )
        }
      ]
    },
    products: {
      title: 'Product Catalog',
      data: (resourceData || []).filter((p: any) => p.category !== 'Raw Material'),
      columns: [
        { header: 'Product', accessor: (item: any) => <span className="font-bold">{item.name}</span> },
        { header: 'SKU', accessor: (item: any) => <Badge color="gray">{item.sku}</Badge> },
        { header: 'Price', accessor: (item: any) => `$${item.price?.toFixed(2) || '0.00'}` },
        {
          header: 'Stock', accessor: (item: any) => (
            <Badge color={item.stock < 50 ? 'red' : 'green'}>{item.stock} {item.unit}</Badge>
          )
        },
      ]
    },
    inventory: {
      title: 'Full Inventory',
      data: resourceData || [],
      columns: [
        { header: 'Item', accessor: (item: any) => <span className="font-medium">{item.name}</span> },
        { header: 'Category', accessor: (item: any) => <Badge color={item.category === 'Raw Material' ? 'blue' : 'pink'}>{item.category}</Badge> },
        {
          header: 'In Stock', accessor: (item: any) => (
            <Badge color={item.stock < 20 ? 'red' : 'green'}>{item.stock} {item.unit}</Badge>
          )
        },
        { header: 'Value', accessor: (item: any) => `$${((item.price || 0) * (item.stock || 0)).toFixed(2)}` },
      ]
    },
    users: {
      title: 'System Users',
      data: resourceData || [],
      columns: [
        { header: 'User', accessor: (item: any) => <div className="flex items-center gap-2"><div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-xs">{item.name?.[0] || 'U'}</div><span className="font-bold">{item.name}</span></div> },
        { header: 'Email', accessor: (item: any) => item.email },
        {
          header: 'Role', accessor: (item: any) => (
            <Badge color={item.role === 'ADMIN' ? 'pink' : item.role === 'WORKER' ? 'blue' : 'yellow'}>
              {item.role}
            </Badge>
          )
        },
      ]
    },
    purchases: {
      title: 'Raw Material Purchases',
      data: resourceData || [],
      columns: [
        { header: 'Supplier', accessor: (item: any) => <span className="font-bold">{item.supplier}</span> },
        { header: 'Date', accessor: (item: any) => item.date },
        { header: 'Items', accessor: (item: any) => <span className="text-xs text-slate-500 max-w-xs truncate block">{item.items}</span> },
        { header: 'Total', accessor: (item: any) => <span className="font-bold">${item.total?.toFixed(2) || '0.00'}</span> },
        { header: 'Status', accessor: (item: any) => <Badge color={item.status === 'RECEIVED' ? 'green' : 'yellow'}>{item.status}</Badge> }
      ]
    }
  };

  // Fallback for types not fully implemented in mock
  const currentConfig = config[type as keyof typeof config] || config.clients;

  const filteredData = currentConfig.data.filter((item: any) =>
    JSON.stringify(item).toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="p-8 text-center text-slate-500">Loading resources...</div>;
  }

  if (error) {
    return <div className="p-8 text-center text-red-500">Error loading resources: {error}</div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">{currentConfig.title}</h1>
          <p className="text-slate-500 mt-1">Manage and view your {type.replace('_', ' ')}.</p>
        </div>
        <Button onClick={() => { setSelectedItem(null); setIsModalOpen(true); }} icon={<Plus size={20} />} className="shadow-lg shadow-pink-200">
          Add New {type === 'purchases' ? 'Purchase' : 'Record'}
        </Button>
      </div>

      <Card className="p-0 border-0 shadow-none bg-transparent">
        <div className="bg-white p-4 rounded-2xl border border-slate-100 mb-6 flex gap-4 shadow-sm">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Search by name, ID, or details..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-pink-100 focus:border-[#ff2d91] transition-all"
            />
          </div>
          <Button variant="outline" icon={<Filter size={18} />}>Filters</Button>
        </div>

        <Table
          data={filteredData}
          columns={currentConfig.columns}
          onRowClick={type === 'clients' ? (item) => { setSelectedItem(item); setIsModalOpen(true); } : undefined}
        />
      </Card>

      {/* Dynamic Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedItem && type === 'clients' ? 'Client Profile' : `Add New ${type.slice(0, -1)}`}
      >
        {selectedItem && type === 'clients' ? (
          renderClientDetails()
        ) : (
          <div className="space-y-5">
            <Input label="Name / Reference" placeholder="Enter name" />

            {(type === 'products' || type === 'inventory' || type === 'purchases') && (
              <div className="grid grid-cols-2 gap-5">
                <Input label={type === 'purchases' ? 'Total Cost' : 'SKU Code'} placeholder="..." />
                <Input label="Quantity / Price" type="number" placeholder="0.00" />
              </div>
            )}

            <div className="pt-6 flex justify-end gap-3">
              <Button variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
              <Button onClick={() => setIsModalOpen(false)}>Save Changes</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};