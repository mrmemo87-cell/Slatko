import React, { useState, useEffect } from 'react';
import { UserRole } from '../types';
import { Button } from '../components/UI';
import { useResource } from '../hooks/useResource';

interface LoginProps {
  onLogin: (role: UserRole, name: string) => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const { data: users, loading, error } = useResource<any>('users');
  const [selectedUser, setSelectedUser] = useState<any>(null);

  useEffect(() => {
    if (users && users.length > 0 && !selectedUser) {
      setSelectedUser(users[0]);
    }
  }, [users]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f0f4f8] p-4 font-sans relative overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#ff2d91] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#00d0e8] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

      <div className="bg-white rounded-[2rem] shadow-2xl p-8 md:p-12 w-full max-w-md relative z-10 border border-white/50 backdrop-blur-sm">
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-gradient-to-br from-[#ff2d91] to-[#d6257a] rounded-2xl mx-auto flex items-center justify-center text-white text-4xl font-extrabold mb-6 shadow-xl shadow-pink-200 transform rotate-3">S</div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Slatko</h1>
          <p className="text-slate-400 font-medium">Wholesale Supply System</p>
        </div>

        <div className="space-y-8">
          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Select Role Demo</label>
            <div className="space-y-3">
              {loading && <div className="text-center text-slate-400 py-4">Loading users...</div>}
              {error && <div className="text-center text-red-400 py-4">Error loading users</div>}
              {!loading && users.length === 0 && <div className="text-center text-slate-400 py-4">No users found</div>}

              {users.map((user: any) => (
                <div
                  key={user.id}
                  onClick={() => setSelectedUser(user)}
                  className={`
                    p-4 rounded-2xl border-2 cursor-pointer flex items-center justify-between transition-all duration-200 group
                    ${selectedUser?.id === user.id
                      ? 'border-[#ff2d91] bg-pink-50 shadow-md transform scale-[1.02]'
                      : 'border-slate-100 hover:border-pink-200 bg-white hover:bg-slate-50'}
                  `}
                >
                  <div className="flex items-center gap-4">
                    <div className={`
                        w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg
                        ${selectedUser?.id === user.id ? 'bg-[#ff2d91] text-white' : 'bg-slate-100 text-slate-400'}
                    `}>
                      {user.name?.charAt(0) || 'U'}
                    </div>
                    <div>
                      <p className={`font-bold ${selectedUser?.id === user.id ? 'text-slate-900' : 'text-slate-600'}`}>{user.name}</p>
                      <p className="text-xs text-slate-400 capitalize font-semibold tracking-wide">{user.role?.toLowerCase()}</p>
                    </div>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedUser?.id === user.id ? 'border-[#ff2d91]' : 'border-slate-200'}`}>
                    {selectedUser?.id === user.id && <div className="w-2.5 h-2.5 rounded-full bg-[#ff2d91]" />}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Button
            className="w-full shadow-xl shadow-pink-200 hover:shadow-pink-300 py-4 text-lg"
            size="lg"
            onClick={() => selectedUser && onLogin(selectedUser.role, selectedUser.name)}
            disabled={!selectedUser}
          >
            Enter Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};