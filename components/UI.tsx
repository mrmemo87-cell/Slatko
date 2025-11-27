import React, { ReactNode } from 'react';
import { X, Plus, Minus, Upload, Camera } from 'lucide-react';

// --- Card ---
export const Card: React.FC<{ children: ReactNode; className?: string; title?: string; action?: ReactNode }> = ({ children, className = '', title, action }) => (
  <div className={`bg-white rounded-3xl shadow-[0_2px_20px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden ${className}`}>
    {title && (
      <div className="px-6 py-5 border-b border-slate-50 flex justify-between items-center">
        <h3 className="font-bold text-slate-800 text-lg">{title}</h3>
        {action}
      </div>
    )}
    <div className="p-6">{children}</div>
  </div>
);

// --- Button ---
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  icon?: ReactNode;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', size = 'md', icon, className = '', fullWidth = false, ...props }) => {
  const baseStyle = "inline-flex items-center justify-center font-semibold transition-all duration-200 focus:outline-none focus:ring-4 disabled:opacity-50 disabled:cursor-not-allowed rounded-2xl active:scale-95";
  
  const variants = {
    primary: "bg-[#ff2d91] text-white hover:bg-[#d6257a] hover:shadow-lg hover:shadow-pink-200 focus:ring-pink-100",
    secondary: "bg-[#00d0e8] text-white hover:bg-[#00b5ca] hover:shadow-lg hover:shadow-cyan-200 focus:ring-cyan-100",
    danger: "bg-red-500 text-white hover:bg-red-600 focus:ring-red-100",
    outline: "border-2 border-slate-200 text-slate-600 hover:border-[#ff2d91] hover:text-[#ff2d91] bg-transparent focus:ring-slate-100",
    ghost: "text-slate-500 hover:bg-slate-50 hover:text-[#ff2d91] focus:ring-slate-100",
  };

  const sizes = {
    sm: "text-xs px-3 py-1.5 gap-1.5",
    md: "text-sm px-5 py-2.5 gap-2",
    lg: "text-base px-6 py-3 gap-2.5",
    xl: "text-lg px-6 py-4 gap-3", // Mobile optimized
  };

  return (
    <button className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`} {...props}>
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </button>
  );
};

// --- Input ---
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, className = '', ...props }) => (
  <div className="w-full">
    {label && <label className="block text-sm font-semibold text-slate-700 mb-2">{label}</label>}
    <input
      className={`w-full px-4 py-3 bg-slate-50 border rounded-2xl focus:outline-none focus:ring-4 focus:bg-white transition-all ${
        error 
          ? 'border-red-300 focus:ring-red-100 focus:border-red-500' 
          : 'border-slate-200 focus:ring-pink-100 focus:border-[#ff2d91]'
      } ${className}`}
      {...props}
    />
    {error && <p className="mt-1 text-xs text-red-500 font-medium">{error}</p>}
  </div>
);

// --- Stepper (New) ---
interface StepperProps {
  value: number;
  onChange: (val: number) => void;
  min?: number;
  max?: number;
}

export const Stepper: React.FC<StepperProps> = ({ value, onChange, min = 0, max = 9999 }) => {
  return (
    <div className="flex items-center gap-3">
      <button 
        onClick={() => value > min && onChange(value - 1)}
        className="w-10 h-10 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center hover:bg-[#ff2d91] hover:text-white transition-colors active:scale-90"
      >
        <Minus size={20} strokeWidth={3} />
      </button>
      <div className="w-12 text-center font-bold text-lg text-slate-800">{value}</div>
      <button 
        onClick={() => value < max && onChange(value + 1)}
        className="w-10 h-10 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center hover:bg-[#00d0e8] hover:text-white transition-colors active:scale-90"
      >
        <Plus size={20} strokeWidth={3} />
      </button>
    </div>
  );
};

// --- File Upload (New) ---
export const FileUpload: React.FC<{ label: string }> = ({ label }) => (
  <div className="w-full">
    <label className="block text-sm font-semibold text-slate-700 mb-2">{label}</label>
    <div className="border-2 border-dashed border-slate-200 rounded-2xl p-4 flex flex-col items-center justify-center text-slate-400 hover:border-[#00d0e8] hover:bg-cyan-50/50 transition-colors cursor-pointer bg-slate-50">
      <Camera size={24} className="mb-2" />
      <span className="text-xs font-medium">Tap to take photo</span>
    </div>
  </div>
);

// --- Badge ---
export const Badge: React.FC<{ children: ReactNode; color?: 'pink' | 'blue' | 'green' | 'yellow' | 'red' | 'gray' }> = ({ children, color = 'blue' }) => {
  const colors = {
    pink: 'bg-pink-100 text-[#ff2d91]',
    blue: 'bg-cyan-100 text-[#00a0b2]',
    green: 'bg-emerald-100 text-emerald-600',
    yellow: 'bg-amber-100 text-amber-700',
    red: 'bg-rose-100 text-rose-600',
    gray: 'bg-slate-100 text-slate-600',
  };
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${colors[color]}`}>
      {children}
    </span>
  );
};

// --- Modal ---
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center md:items-center items-end p-0 md:p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity">
      <div className="bg-white rounded-t-3xl md:rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-in slide-in-from-bottom duration-300 md:animate-in md:fade-in md:zoom-in">
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
          <h3 className="text-xl font-bold text-slate-900">{title}</h3>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-[#ff2d91] hover:bg-pink-50 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>
        <div className="p-6 max-h-[85vh] overflow-y-auto no-scrollbar pb-20 md:pb-6">
          {children}
        </div>
      </div>
    </div>
  );
};

// --- Table ---
interface Column<T> {
  header: string;
  accessor: (item: T) => ReactNode;
  className?: string;
}

interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  onRowClick?: (item: T) => void;
}

export const Table = <T,>({ data, columns, onRowClick }: TableProps<T>) => {
  return (
    <div className="overflow-x-auto no-scrollbar rounded-xl border border-slate-100">
      <table className="w-full text-left border-collapse">
        <thead className="bg-slate-50/50">
          <tr className="border-b border-slate-100">
            {columns.map((col, idx) => (
              <th key={idx} className={`py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider ${col.className || ''}`}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50 bg-white">
          {data.length > 0 ? (
            data.map((item, rowIdx) => (
              <tr 
                key={rowIdx} 
                onClick={() => onRowClick && onRowClick(item)}
                className={`group transition-colors ${onRowClick ? 'cursor-pointer hover:bg-pink-50/30' : ''}`}
              >
                {columns.map((col, colIdx) => (
                  <td key={colIdx} className="py-4 px-6 text-sm text-slate-700">
                    {col.accessor(item)}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="py-12 text-center text-slate-400 text-sm">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};