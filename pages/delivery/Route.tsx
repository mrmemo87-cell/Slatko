import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Navigation, CheckCircle, Clock, ChevronRight } from 'lucide-react';
import { Card, Badge, Button } from '../../components/UI';
import { useResource } from '../../hooks/useResource';
import { Order, Client, RouteStop } from '../../types';

export const DeliveryRoutePage: React.FC = () => {
  const navigate = useNavigate();
  const { data: orders, loading: ordersLoading } = useResource<Order>('orders');
  const { data: clients, loading: clientsLoading } = useResource<Client>('clients');

  const routeStops = useMemo(() => {
    if (!orders || !clients) return [];

    // Filter for active orders (not delivered/cancelled)
    const activeOrders = orders.filter(o => o.status === 'PREPARED' || o.status === 'PENDING');

    return activeOrders.map(order => {
      const client = clients.find(c => c.id === order.clientId);
      return {
        id: order.id, // Use order ID as stop ID for now
        clientId: order.clientId,
        clientName: order.clientName,
        address: client?.address || 'Unknown Address',
        status: order.status === 'PREPARED' ? 'PENDING' : 'COMPLETED', // Map order status to route status (simplified)
        orderId: order.id
      } as RouteStop;
    });
  }, [orders, clients]);

  // Sort route: Pending first
  const sortedRoute = useMemo(() => {
    return [...routeStops].sort((a, b) =>
      a.status === b.status ? 0 : a.status === 'PENDING' ? -1 : 1
    );
  }, [routeStops]);

  if (ordersLoading || clientsLoading) {
    return <div className="p-8 text-center text-slate-500">Loading route...</div>;
  }

  if (sortedRoute.length === 0) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-bold text-slate-700">No active deliveries</h2>
        <p className="text-slate-500">All orders have been delivered or none are ready.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Today's Route</h1>
          <p className="text-slate-500">{sortedRoute.filter(s => s.status === 'PENDING').length} stops remaining</p>
        </div>
        <Button variant="secondary" icon={<Navigation size={18} />}>Optimize Route</Button>
      </div>

      <div className="space-y-4">
        {sortedRoute.map((stop, index) => {
          const isPending = stop.status === 'PENDING';
          return (
            <div
              key={stop.id}
              onClick={() => isPending && navigate(`/delivery/visit/${stop.clientId}`)}
              className={`
                relative bg-white border rounded-xl p-5 transition-all
                ${isPending
                  ? 'border-blue-200 shadow-sm hover:shadow-md cursor-pointer hover:border-blue-300'
                  : 'border-slate-100 opacity-75 bg-slate-50'}
              `}
            >
              <div className="flex items-start gap-4">
                <div className={`
                  w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-bold text-lg
                  ${isPending ? 'bg-blue-100 text-blue-600' : 'bg-slate-200 text-slate-500'}
                `}>
                  {index + 1}
                </div>

                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className={`font-bold ${isPending ? 'text-slate-900' : 'text-slate-600'}`}>
                        {stop.clientName}
                      </h3>
                      <p className="text-slate-500 flex items-center gap-1 mt-1 text-sm">
                        <MapPin size={14} /> {stop.address}
                      </p>
                    </div>
                    <Badge color={isPending ? 'yellow' : 'green'}>{stop.status}</Badge>
                  </div>

                  {stop.orderId && isPending && (
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-100 flex items-center justify-between">
                      <span className="text-sm text-blue-800 font-medium">Order #{stop.orderId} Ready for delivery</span>
                      <ChevronRight size={18} className="text-blue-400" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
