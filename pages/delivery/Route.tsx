import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Navigation, CheckCircle, Clock, ChevronRight } from 'lucide-react';
import { Card, Badge, Button } from '../../components/UI';
import { MOCK_ROUTE } from '../../constants';

export const DeliveryRoutePage: React.FC = () => {
  const navigate = useNavigate();

  // Sort route: Pending first, then completed
  const sortedRoute = [...MOCK_ROUTE].sort((a, b) => 
    a.status === b.status ? 0 : a.status === 'PENDING' ? -1 : 1
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
         <div>
            <h1 className="text-2xl font-bold text-slate-900">Today's Route</h1>
            <p className="text-slate-500">3 stops remaining • Est. finish 4:30 PM</p>
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
