import React from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, Users, Package, ShoppingCart, FileText, 
  CreditCard, Truck, Settings, LogOut, Boxes, ShoppingBag, Factory, Menu
} from 'lucide-react';
import { UserRole } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  userRole: UserRole;
  userName: string;
  onLogout: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, userRole, userName, onLogout }) => {
  const location = useLocation();

  const getMenuItems = (role: UserRole) => {
    switch (role) {
      case 'ADMIN':
        return [
          { icon: <LayoutDashboard size={20} />, label: 'Home', path: '/admin' },
          { icon: <Users size={20} />, label: 'Clients', path: '/admin/clients' },
          { icon: <Package size={20} />, label: 'Products', path: '/admin/products' },
          { icon: <Factory size={20} />, label: 'Prod', path: '/admin/production' },
          { icon: <Settings size={20} />, label: 'More', path: '/admin/users' },
        ];
      case 'WORKER':
        return [
          { icon: <Factory size={20} />, label: 'Make', path: '/worker/production' },
          { icon: <ShoppingCart size={20} />, label: 'Orders', path: '/worker/orders' },
          { icon: <Boxes size={20} />, label: 'Stock', path: '/worker/inventory' },
        ];
      case 'DELIVERY':
        return [
          { icon: <Truck size={20} />, label: 'Route', path: '/delivery' },
          { icon: <FileText size={20} />, label: 'History', path: '/delivery/history' },
        ];
      default:
        return [];
    }
  };

  const menuItems = getMenuItems(userRole);

  // Desktop Sidebar
  const Sidebar = () => (
    <aside className="hidden md:flex flex-col w-72 bg-white border-r border-slate-100 h-screen sticky top-0">
      <div className="p-8 pb-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#ff2d91] to-[#ff7ebf] flex items-center justify-center shadow-lg shadow-pink-200 text-white font-bold text-2xl">S</div>
        <span className="text-2xl font-extrabold tracking-tight text-slate-800">Slatko</span>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto no-scrollbar">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `
              flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-200 text-sm font-semibold
              ${isActive 
                ? 'bg-[#fff0f7] text-[#ff2d91] shadow-sm' 
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}
            `}
          >
            {item.icon}
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-50">
        <div className="flex items-center gap-3 px-4 py-4 rounded-2xl bg-slate-50">
          <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-sm font-bold text-[#ff2d91] shadow-sm">
            {userName.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-slate-800 truncate">{userName}</p>
            <p className="text-xs text-slate-500 truncate capitalize font-medium">{userRole.toLowerCase()}</p>
          </div>
          <button 
            onClick={onLogout}
            className="p-2 text-slate-400 hover:text-[#ff2d91] hover:bg-white rounded-full transition-all"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </aside>
  );

  // Mobile Bottom Nav
  const BottomNav = () => (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 flex justify-around items-center px-2 py-2 pb-safe z-40 shadow-[0_-5px_20px_rgb(0,0,0,0.05)]">
      {menuItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) => `
            flex flex-col items-center gap-1 p-2 rounded-xl transition-all min-w-[60px]
            ${isActive 
              ? 'text-[#ff2d91]' 
              : 'text-slate-400'}
          `}
        >
          {React.cloneElement(item.icon as React.ReactElement<any>, { size: 24, strokeWidth: location.pathname === item.path ? 2.5 : 2 })}
          <span className="text-[10px] font-bold tracking-wide">{item.label}</span>
        </NavLink>
      ))}
      <button 
        onClick={onLogout}
        className="flex flex-col items-center gap-1 p-2 rounded-xl text-slate-400 min-w-[60px]"
      >
        <LogOut size={24} />
        <span className="text-[10px] font-bold tracking-wide">Exit</span>
      </button>
    </nav>
  );

  return (
    <div className="flex h-screen bg-[#f8fafc] font-sans">
      <Sidebar />
      
      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 h-full overflow-hidden relative">
        {/* Mobile Header */}
        <header className="md:hidden bg-white/80 backdrop-blur-md border-b border-slate-100 h-16 flex items-center justify-between px-4 sticky top-0 z-30">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#ff2d91] to-[#ff7ebf] flex items-center justify-center text-white font-bold text-lg">S</div>
             <h1 className="text-lg font-bold text-slate-900 capitalize">
                {location.pathname === '/delivery' ? "Today's Route" : location.pathname.split('/').pop()?.replace('-', ' ')}
             </h1>
          </div>
          <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-[#ff2d91]">
            {userName.charAt(0)}
          </div>
        </header>

        {/* Desktop Header */}
        <header className="hidden md:flex bg-white border-b border-slate-100 h-20 items-center justify-between px-10">
            <h1 className="text-2xl font-bold text-slate-800 capitalize">
               {location.pathname.split('/').pop()?.replace('-', ' ') || 'Dashboard'}
            </h1>
        </header>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-8 pb-24 md:pb-8">
          <div className="max-w-5xl mx-auto w-full">
            {children}
          </div>
        </div>

        <BottomNav />
      </main>
    </div>
  );
};