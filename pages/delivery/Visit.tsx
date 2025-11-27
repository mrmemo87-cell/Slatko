import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, PackageMinus, PackagePlus, DollarSign, FileText, Check, Plus, Minus, Camera } from 'lucide-react';
import { Card, Button, Input, Modal, Stepper, FileUpload } from '../../components/UI';
import { MOCK_CLIENTS, MOCK_PRODUCTS, MOCK_ORDERS } from '../../constants';

export const VisitPage: React.FC = () => {
  const { clientId } = useParams();
  const navigate = useNavigate();
  const client = MOCK_CLIENTS.find(c => c.id === clientId);
  
  // Tab State
  const [activeTab, setActiveTab] = useState<'returns' | 'delivery' | 'payment' | 'summary'>('returns');
  
  // Data State
  const [returns, setReturns] = useState<{id: string, qty: number}[]>([]);
  const [deliveryItems, setDeliveryItems] = useState<{id: string, qty: number}[]>(
    MOCK_ORDERS.find(o => o.clientId === clientId && o.status === 'PREPARED')?.items.map(i => ({id: i.productId, qty: i.quantity})) || []
  );
  const [paymentAmount, setPaymentAmount] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState('CASH');
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'return' | 'deliver'>('return');

  if (!client) return <div>Client not found</div>;

  // Calculations
  const returnsTotal = useMemo(() => {
    return returns.reduce((acc, item) => {
      const product = MOCK_PRODUCTS.find(p => p.id === item.id);
      return acc + (product ? product.price * item.qty : 0);
    }, 0);
  }, [returns]);

  const deliveryTotal = useMemo(() => {
    return deliveryItems.reduce((acc, item) => {
      const product = MOCK_PRODUCTS.find(p => p.id === item.id);
      return acc + (product ? product.price * item.qty : 0);
    }, 0);
  }, [deliveryItems]);

  const previousBalance = client.balance;
  const grandTotal = previousBalance + deliveryTotal - returnsTotal;
  const remainingBalance = grandTotal - (parseFloat(paymentAmount) || 0);

  // Helper to update quantity directly from list
  const updateQty = (id: string, newQty: number, mode: 'return' | 'deliver') => {
    const list = mode === 'return' ? returns : deliveryItems;
    const setList = mode === 'return' ? setReturns : setDeliveryItems;
    
    if (newQty === 0) {
      setList(list.filter(i => i.id !== id));
    } else {
      setList(list.map(i => i.id === id ? {...i, qty: newQty} : i));
    }
  };

  const addItem = (productId: string) => {
    const list = modalMode === 'return' ? returns : deliveryItems;
    const setList = modalMode === 'return' ? setReturns : setDeliveryItems;
    
    const existing = list.find(i => i.id === productId);
    if (!existing) {
      setList([...list, {id: productId, qty: 1}]);
    }
    setIsProductModalOpen(false);
  };

  const TabButton = ({ id, label, icon }: { id: typeof activeTab, label: string, icon: React.ReactNode }) => (
    <button 
      onClick={() => setActiveTab(id)}
      className={`flex-1 py-3 flex flex-col items-center gap-1 border-b-2 transition-all ${
        activeTab === id 
          ? 'border-[#ff2d91] text-[#ff2d91] bg-pink-50/50' 
          : 'border-transparent text-slate-400'
      }`}
    >
      <div className={`p-1.5 rounded-full ${activeTab === id ? 'bg-[#ff2d91] text-white' : ''}`}>
        {React.cloneElement(icon as React.ReactElement<any>, { size: 16 })}
      </div>
      <span className="text-[10px] font-bold uppercase tracking-wide">{label}</span>
    </button>
  );

  return (
    <div className="flex flex-col h-full">
      {/* Sticky Header */}
      <div className="sticky top-0 z-20 bg-white border-b border-slate-100 px-4 py-3 flex items-center gap-3 shadow-sm">
        <button onClick={() => navigate('/delivery')} className="p-2 bg-slate-50 rounded-full text-slate-600">
          <ArrowLeft size={20} />
        </button>
        <div className="flex-1 min-w-0">
          <h1 className="text-lg font-bold text-slate-900 truncate">{client.name}</h1>
          <p className="text-xs text-slate-500 truncate">{client.address}</p>
        </div>
        <div className="text-right">
           <p className="text-[10px] text-slate-400 font-bold uppercase">Balance</p>
           <p className={`font-bold ${client.balance > 0 ? 'text-red-500' : 'text-emerald-500'}`}>${client.balance.toFixed(2)}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-slate-100 flex sticky top-[60px] z-10">
        <TabButton id="returns" label="Returns" icon={<PackageMinus />} />
        <TabButton id="delivery" label="Order" icon={<PackagePlus />} />
        <TabButton id="payment" label="Pay" icon={<DollarSign />} />
        <TabButton id="summary" label="Invoice" icon={<FileText />} />
      </div>

      {/* Content Area */}
      <div className="flex-1 p-4 pb-32">
        {/* RETURNS TAB */}
        {activeTab === 'returns' && (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
             <div className="bg-pink-50 border border-pink-100 rounded-2xl p-4 flex items-center gap-3">
                 <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#ff2d91] shadow-sm"><PackageMinus size={20}/></div>
                 <div>
                    <h3 className="text-[#ff2d91] font-bold text-sm">Return Items</h3>
                    <p className="text-slate-500 text-xs">Tap + to add damaged/unsold goods</p>
                 </div>
             </div>

             {returns.map(item => {
                const product = MOCK_PRODUCTS.find(p => p.id === item.id);
                return (
                  <div key={item.id} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                         <p className="font-bold text-slate-800">{product?.name}</p>
                         <p className="text-xs text-slate-500">${product?.price} / unit</p>
                      </div>
                      <span className="font-bold text-red-500">-${(product!.price * item.qty).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center bg-slate-50 rounded-xl p-2">
                       <span className="text-xs font-bold text-slate-400 uppercase ml-2">Quantity</span>
                       <Stepper value={item.qty} onChange={(val) => updateQty(item.id, val, 'return')} />
                    </div>
                  </div>
                );
              })}
             
             <div className="pt-2">
                <FileUpload label="Add Photo of Returns (Optional)" />
             </div>

             <Button 
                variant="outline" 
                size="xl" 
                fullWidth
                className="border-dashed border-2 py-4"
                onClick={() => { setModalMode('return'); setIsProductModalOpen(true); }}
                icon={<Plus size={20}/>}
             >
                Select Item to Return
             </Button>
          </div>
        )}

        {/* DELIVERY TAB */}
        {activeTab === 'delivery' && (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
             <div className="bg-cyan-50 border border-cyan-100 rounded-2xl p-4 flex items-center gap-3">
                 <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#00d0e8] shadow-sm"><PackagePlus size={20}/></div>
                 <div>
                    <h3 className="text-[#00a0b2] font-bold text-sm">New Delivery</h3>
                    <p className="text-slate-500 text-xs">Confirm quantities being left today</p>
                 </div>
             </div>

             {deliveryItems.map(item => {
                const product = MOCK_PRODUCTS.find(p => p.id === item.id);
                return (
                  <div key={item.id} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                         <p className="font-bold text-slate-800">{product?.name}</p>
                         <p className="text-xs text-slate-500">${product?.price} / unit</p>
                      </div>
                      <span className="font-bold text-slate-800">${(product!.price * item.qty).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center bg-slate-50 rounded-xl p-2">
                       <span className="text-xs font-bold text-slate-400 uppercase ml-2">Quantity</span>
                       <Stepper value={item.qty} onChange={(val) => updateQty(item.id, val, 'deliver')} />
                    </div>
                  </div>
                );
              })}

             <Button 
                variant="outline" 
                size="xl" 
                fullWidth
                className="border-dashed border-2 py-4"
                onClick={() => { setModalMode('deliver'); setIsProductModalOpen(true); }}
                icon={<Plus size={20}/>}
             >
                Add Extra Item
             </Button>
          </div>
        )}

        {/* PAYMENT TAB */}
        {activeTab === 'payment' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
             <Card>
                 <div className="text-center py-2">
                     <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Net Amount Due</p>
                     <p className="text-5xl font-extrabold text-slate-900 mt-2 tracking-tight">${grandTotal.toFixed(2)}</p>
                 </div>
             </Card>
                 
             <div className="grid grid-cols-3 gap-2">
                  {['CASH', 'BANK_TRANSFER', 'CHECK'].map(m => (
                    <button 
                      key={m}
                      onClick={() => setPaymentMethod(m)}
                      className={`py-3 px-1 text-[10px] md:text-xs font-bold uppercase rounded-xl border-2 transition-all ${
                        paymentMethod === m 
                          ? 'border-[#ff2d91] bg-pink-50 text-[#ff2d91] shadow-sm' 
                          : 'border-slate-100 bg-white text-slate-400'
                      }`}
                    >
                      {m.replace('_', ' ')}
                    </button>
                  ))}
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                <label className="text-xs font-bold text-slate-400 uppercase mb-2 block">Payment Amount</label>
                <div className="relative">
                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input 
                      type="number" 
                      value={paymentAmount} 
                      onChange={(e) => setPaymentAmount(e.target.value)}
                      placeholder="0.00"
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 rounded-xl text-3xl font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#ff2d91] placeholder:text-slate-300"
                    />
                </div>
            </div>

            <FileUpload label="Attach Bank Transfer Proof (Optional)" />
          </div>
        )}

        {/* SUMMARY TAB */}
        {activeTab === 'summary' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
             <div className="bg-white border-2 border-slate-100 rounded-3xl p-6 relative overflow-hidden">
                 <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#ff2d91] to-[#00d0e8]" />
                 
                 <div className="text-center pb-6 border-b border-slate-100 border-dashed">
                     <h2 className="text-2xl font-bold text-slate-900">Invoice Summary</h2>
                     <p className="text-slate-400 text-sm">#INV-{Math.floor(Math.random() * 10000)}</p>
                 </div>
                 
                 <div className="space-y-4 py-6 text-sm">
                    <div className="flex justify-between text-slate-500">
                        <span>Previous Balance</span>
                        <span className="font-medium">${previousBalance.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-slate-800">
                        <span>Delivery Items ({deliveryItems.reduce((a,b)=>a+b.qty,0)})</span>
                        <span className="font-bold">+${deliveryTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-red-500">
                        <span>Returns ({returns.reduce((a,b)=>a+b.qty,0)})</span>
                        <span className="font-bold">-${returnsTotal.toFixed(2)}</span>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-lg flex justify-between font-bold text-lg text-slate-900">
                        <span>Net Total</span>
                        <span>${grandTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-emerald-600 font-medium pt-2">
                        <span>Payment ({paymentMethod})</span>
                        <span>-${parseFloat(paymentAmount || '0').toFixed(2)}</span>
                    </div>
                 </div>

                 <div className="mt-2 bg-slate-900 p-4 rounded-2xl text-center text-white">
                     <p className="text-xs opacity-50 uppercase font-bold tracking-wider">Remaining Balance</p>
                     <p className="text-2xl font-bold mt-1">${remainingBalance.toFixed(2)}</p>
                 </div>
             </div>
          </div>
        )}
      </div>

      {/* Sticky Bottom Action Button */}
      <div className="fixed bottom-[70px] md:bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-md border-t border-slate-100 z-30 md:static md:bg-transparent md:border-0">
        {activeTab === 'returns' && (
             <Button size="xl" fullWidth className="shadow-xl shadow-pink-200" onClick={() => setActiveTab('delivery')}>Next: Delivery Order</Button>
        )}
        {activeTab === 'delivery' && (
             <Button size="xl" fullWidth variant="secondary" className="shadow-xl shadow-cyan-200" onClick={() => setActiveTab('payment')}>Next: Collect Payment</Button>
        )}
        {activeTab === 'payment' && (
             <Button size="xl" fullWidth className="shadow-xl shadow-pink-200" onClick={() => setActiveTab('summary')}>Review Invoice</Button>
        )}
        {activeTab === 'summary' && (
             <Button size="xl" fullWidth className="bg-emerald-500 hover:bg-emerald-600 shadow-xl shadow-emerald-200" onClick={() => alert('Invoice Finalized!')} icon={<Check />}>Finalize Visit</Button>
        )}
      </div>

      {/* Product Selection Modal (Bottom Sheet style on Mobile) */}
      <Modal 
        isOpen={isProductModalOpen} 
        onClose={() => setIsProductModalOpen(false)} 
        title={modalMode === 'return' ? "Select Item to Return" : "Add Item to Delivery"}
      >
        <div className="space-y-3">
          {MOCK_PRODUCTS.filter(p => p.category !== 'Raw Material').map(p => (
            <button 
              key={p.id}
              onClick={() => addItem(p.id)}
              className="w-full text-left p-4 hover:bg-pink-50 rounded-2xl border border-slate-100 hover:border-pink-200 flex justify-between items-center transition-all active:scale-[0.98]"
            >
              <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg ${modalMode === 'return' ? 'bg-pink-100 text-pink-500' : 'bg-cyan-100 text-cyan-600'}`}>
                      {p.name.charAt(0)}
                  </div>
                  <div>
                    <span className="font-bold text-slate-800 block">{p.name}</span>
                    <span className="text-xs text-slate-400">{p.sku}</span>
                  </div>
              </div>
              <span className="text-sm font-bold bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">${p.price}</span>
            </button>
          ))}
        </div>
      </Modal>
    </div>
  );
};