import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, LogOut, UtensilsCrossed } from 'lucide-react';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('admin_auth');
    navigate('/login');
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="fixed left-0 top-0 bottom-0 w-64 bg-black/40 backdrop-blur-xl border-r border-white/5 p-6 hidden lg:flex flex-col z-50">
        <div className="mb-12">
            <h1 className="text-3xl font-black italic bg-gradient-to-r from-yellow-200 to-yellow-600 bg-clip-text text-transparent tracking-tighter">YUMYARD</h1>
            <p className="text-[10px] uppercase font-black tracking-[0.3em] text-yellow-500/50 mt-1">Admin Panel</p>
        </div>

        <nav className="flex-1 space-y-3">
          <NavLink 
            to="/admin" 
            className={({ isActive }) => `flex items-center space-x-3 px-6 py-4 rounded-2xl transition-all font-bold ${isActive ? 'bg-yellow-500 text-black shadow-lg shadow-yellow-900/40' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span>Menu Management</span>
          </NavLink>
          
          <NavLink 
            to="/" 
            className="flex items-center space-x-3 px-6 py-4 rounded-2xl text-slate-400 hover:bg-white/5 hover:text-white transition-all font-bold"
          >
            <UtensilsCrossed className="w-5 h-5" />
            <span>Public Menu</span>
          </NavLink>
        </nav>

        <button 
          onClick={handleLogout}
          className="flex items-center space-x-3 px-6 py-4 rounded-2xl text-red-400 hover:bg-red-500/10 transition-all font-bold mt-auto"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </aside>

      {/* Mobile Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 lg:hidden bg-black/80 backdrop-blur-2xl border-t border-white/10 px-6 py-3 flex justify-around items-center z-50">
        <NavLink to="/admin" className={({ isActive }) => `p-3 rounded-2xl transition-all ${isActive ? 'bg-yellow-500 text-black' : 'text-slate-400'}`}>
          <LayoutDashboard className="w-6 h-6" />
        </NavLink>
        <NavLink to="/" className="p-3 rounded-2xl text-slate-400">
          <UtensilsCrossed className="w-6 h-6" />
        </NavLink>
        <button onClick={handleLogout} className="p-3 rounded-2xl text-red-500">
          <LogOut className="w-6 h-6" />
        </button>
      </nav>
    </>
  );
};

export default Sidebar;
