import React, { useState, useEffect } from 'react';
import { storage } from '../services/storage';
import GlassCard from '../components/GlassCard';
import GlassButton from '../components/GlassButton';
import Sidebar from '../components/Sidebar';
import { PlusSquare, Trash2, Edit3, Save, X, ImageIcon, Upload, Check, RefreshCw, UserCog, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AdminPage = () => {
    const [items, setItems] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [newItem, setNewItem] = useState({ name: '', description: '', price: 0, category: '', imageUrl: '' });
    const [editItem, setEditItem] = useState({});
    const [filterCategory, setFilterCategory] = useState('ALL');
    const [showSettings, setShowSettings] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [adminCreds, setAdminCreds] = useState({ username: '', password: '' });

    useEffect(() => {
        setItems(storage.getMenu());
        setAdminCreds(storage.getCredentials());
    }, []);

    const handleAdd = (e) => {
        e.preventDefault();
        const updated = storage.saveItem(newItem);
        setItems(updated);
        setNewItem({ name: '', description: '', price: 0, category: '', imageUrl: '' });
        setShowAddModal(false);
    };

    const handleImageFile = (e, isEditing = false) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (isEditing) {
                    setEditItem(prev => ({ ...prev, imageUrl: reader.result }));
                } else {
                    setNewItem(prev => ({ ...prev, imageUrl: reader.result }));
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUpdate = (id) => {
        const updated = storage.saveItem(editItem);
        setItems(updated);
        setEditingId(null);
    };

    const handleDelete = (id) => {
        if (!window.confirm("Delete this item?")) return;
        const updated = storage.deleteItem(id);
        setItems(updated);
    };

    const handleReset = () => {
        if (!window.confirm("Reset menu to defaults? This will erase all your custom changes.")) return;
        const updated = storage.resetMenu();
        setItems(updated);
    };

    const handleUpdateProfile = (e) => {
        e.preventDefault();
        storage.saveCredentials(adminCreds.username, adminCreds.password);
        setShowSettings(false);
        alert("Admin profile updated successfully!");
    };

    const categories = Array.from(new Set(items.map(item => item.category))).filter(Boolean).sort();
    const filteredItems = items.filter(item => filterCategory === 'ALL' || item.category === filterCategory);

    return (
        <div className="flex min-h-screen bg-black text-white">
            <Sidebar />

            <main className="flex-1 lg:ml-64 p-4 md:p-8 pb-24 lg:pb-8">
                <header className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                    <div>
                        <h1 className="text-4xl font-black italic bg-gradient-to-r from-white to-yellow-500 bg-clip-text text-transparent tracking-tighter">
                            MASTER CATALOG
                        </h1>
                        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1 opacity-60">Control your digital menu statically</p>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                        <button 
                            onClick={handleReset}
                            className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-white/5 border border-white/5 text-slate-400 hover:bg-yellow-500/10 hover:text-yellow-500 transition-all text-[10px] font-black uppercase tracking-widest"
                        >
                            <RefreshCw className="w-3.5 h-3.5" />
                            <span>Reset Defaults</span>
                        </button>
                        
                        <button 
                            onClick={() => setShowSettings(true)}
                            className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 hover:bg-yellow-500 hover:text-black transition-all text-[10px] font-black uppercase tracking-widest"
                        >
                            <UserCog className="w-3.5 h-3.5" />
                            <span>Profile Settings</span>
                        </button>
                    </div>
                </header>

                <div className="max-w-5xl mx-auto space-y-6">
                        <div className="flex items-center space-x-2 overflow-x-auto pb-4 no-scrollbar -mx-2 px-2">
                           {['ALL', ...categories].map(cat => (
                               <button 
                                key={cat} 
                                onClick={() => setFilterCategory(cat)}
                                className={`px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest border transition-all shrink-0 ${filterCategory === cat ? 'bg-yellow-500 text-black border-yellow-500 shadow-xl shadow-yellow-900/20' : 'bg-white/5 text-slate-400 border-white/5 hover:border-white/20'}`}
                               >
                                {cat}
                               </button>
                           ))}
                        </div>

                        <AnimatePresence mode="popLayout">
                            {filteredItems.map(item => (
                                <motion.div 
                                    key={item.id}
                                    layout
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.4, ease: "circOut" }}
                                >
                                    <GlassCard className={`border-white/5 transition-all duration-500 ${editingId === item.id ? 'border-yellow-500/40 ring-1 ring-yellow-500/20 shadow-[0_0_50px_rgba(250,204,21,0.1)]' : 'hover:border-white/20'}`}>
                                        {editingId === item.id ? (
                                            <div className="space-y-6">
                                                <div className="flex flex-col space-y-4 mb-4">
                                                    <div className="flex items-center space-x-4">
                                                        <div className="w-32 h-32 rounded-3xl bg-black overflow-hidden border border-white/10 shrink-0 relative group">
                                                            <img src={editItem.imageUrl} className="w-full h-full object-cover" onError={(e) => e.target.src='https://placehold.co/200x200/000/FACC15?text=ERR'} />
                                                            <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center cursor-pointer transition-opacity">
                                                                <Upload className="w-5 h-5 text-yellow-500 mb-1" />
                                                                <span className="text-[8px] font-black uppercase text-yellow-500">Local</span>
                                                                <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageFile(e, true)} />
                                                            </label>
                                                        </div>
                                                        <div className="flex-1 space-y-3">
                                                            <div>
                                                                <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest pl-1">Image Identity (URL)</label>
                                                                <input value={editItem.imageUrl} onChange={e => setEditItem({...editItem, imageUrl: e.target.value})} className="glass-input w-full p-3 text-[10px] font-bold bg-white/5 rounded-xl border-white/5" placeholder="Image URL..." />
                                                            </div>
                                                            <div>
                                                                <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest pl-1">Item Title</label>
                                                                <input value={editItem.name} onChange={e => setEditItem({...editItem, name: e.target.value})} className="glass-input w-full p-3 text-lg font-black italic bg-white/5 rounded-xl border-white/5" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="space-y-1">
                                                        <label className="text-[9px] font-black text-slate-500 uppercase pl-1">Price (₹)</label>
                                                        <input type="number" step="0.01" value={editItem.price} onChange={e => setEditItem({...editItem, price: parseFloat(e.target.value)})} className="glass-input w-full p-4 font-black text-yellow-500 bg-white/5 rounded-2xl border-white/5" />
                                                    </div>
                                                    <div className="space-y-1">
                                                        <label className="text-[9px] font-black text-slate-500 uppercase pl-1">Category</label>
                                                        <input list="cats" value={editItem.category} onChange={e => setEditItem({...editItem, category: e.target.value.toUpperCase()})} className="glass-input w-full p-4 font-black bg-white/5 rounded-2xl border-white/5" />
                                                    </div>
                                                </div>
                                                
                                                <div>
                                                    <label className="text-[9px] font-black text-slate-500 uppercase pl-1">Product Description</label>
                                                    <textarea value={editItem.description} onChange={e => setEditItem({...editItem, description: e.target.value})} className="glass-input w-full p-4 rounded-2xl h-24 resize-none text-xs leading-relaxed bg-white/5 border-white/5" />
                                                </div>

                                                <div className="flex space-x-3 pt-2">
                                                    <GlassButton onClick={() => handleUpdate(item.id)} variant="solid" className="flex-1 !py-5 shadow-lg shadow-yellow-900/40">
                                                        <div className="flex items-center justify-center space-x-2">
                                                            <Check className="w-5 h-5" />
                                                            <span>Confirm Changes</span>
                                                        </div>
                                                    </GlassButton>
                                                    <GlassButton onClick={() => setEditingId(null)} variant="secondary" className="flex-1 !py-5">
                                                        <div className="flex items-center justify-center space-x-2">
                                                            <X className="w-5 h-5" />
                                                            <span>Discard</span>
                                                        </div>
                                                    </GlassButton>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6 py-2">
                                                <div className="w-full md:w-28 h-28 rounded-[2rem] bg-neutral-950 overflow-hidden border border-white/5 flex-shrink-0 relative group">
                                                    <img src={item.imageUrl} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" onError={(e) => e.target.src='https://placehold.co/400x400/000/FACC15?text=YumYard'} />
                                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity pointer-events-none">
                                                        <ImageIcon className="w-6 h-6 text-yellow-500" />
                                                    </div>
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center space-x-3 mb-2">
                                                        <h3 className="font-black text-2xl italic truncate drop-shadow-md">{item.name}</h3>
                                                        <span className="text-[9px] font-black bg-yellow-500/10 text-yellow-500 py-1.5 px-3 rounded-xl border border-yellow-500/20 uppercase tracking-[0.2em] whitespace-nowrap shadow-sm">{item.category}</span>
                                                    </div>
                                                    <p className="text-slate-500 text-xs line-clamp-2 leading-relaxed font-bold uppercase tracking-tight opacity-70 italic">{item.description}</p>
                                                </div>
                                                <div className="flex items-center justify-between md:flex-col md:items-end md:space-y-3 pt-4 md:pt-0 border-t md:border-0 border-white/5">
                                                    <div className="text-3xl font-black text-yellow-500 italic tracking-tighter drop-shadow-xl px-2">₹{item.price.toFixed(0)}</div>
                                                    <div className="flex space-x-3">
                                                        <button 
                                                            onClick={() => { setEditingId(item.id); setEditItem(item); }} 
                                                            className="p-4 bg-white/5 hover:bg-yellow-500 hover:text-black text-yellow-500 rounded-2xl border border-white/5 transition-all shadow-xl hover:scale-110 active:scale-95"
                                                            title="Edit Visuals & Details"
                                                        >
                                                            <Edit3 className="w-5 h-5" />
                                                        </button>
                                                        <button 
                                                            onClick={() => handleDelete(item.id)} 
                                                            className="p-4 bg-red-500/5 hover:bg-red-500 hover:text-white text-red-500 rounded-2xl border border-red-500/10 transition-all shadow-xl hover:scale-110 active:scale-95"
                                                            title="Remove Entry"
                                                        >
                                                            <Trash2 className="w-5 h-5" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </GlassCard>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
            </main>

            {/* Floating Action Button */}
            <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowAddModal(true)}
                className="fixed bottom-8 right-8 z-50 p-6 bg-yellow-500 text-black rounded-full shadow-[0_20px_50px_rgba(250,204,21,0.4)] flex items-center justify-center group"
            >
                <PlusSquare className="w-8 h-8" />
                <span className="w-0 overflow-hidden group-hover:w-32 group-hover:ml-3 transition-all duration-300 whitespace-nowrap text-sm font-black uppercase tracking-widest">New Entry</span>
            </motion.button>

            {/* New Entry Modal */}
            <AnimatePresence>
                {showAddModal && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowAddModal(false)}
                            className="absolute inset-0 bg-black/90 backdrop-blur-md"
                        />
                        <motion.div 
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 50, opacity: 0 }}
                            className="relative w-full max-w-2xl"
                        >
                            <GlassCard className="border-yellow-500/20 overflow-hidden">
                                <div className="flex items-center justify-between mb-8">
                                    <h2 className="text-3xl font-black italic text-yellow-500 flex items-center space-x-3 tracking-tighter">
                                        <PlusSquare className="w-8 h-8" />
                                        <span>ADD NEW ENTRY</span>
                                    </h2>
                                    <button onClick={() => setShowAddModal(false)} className="p-3 hover:bg-white/5 rounded-full transition-all">
                                        <X className="w-8 h-8" />
                                    </button>
                                </div>

                                <div className="flex flex-col md:flex-row gap-8">
                                    {/* Preview Side */}
                                    <div className="w-full md:w-56 shrink-0 space-y-4">
                                        <div className="aspect-square rounded-[2.5rem] bg-black/40 border border-white/5 overflow-hidden relative">
                                            {newItem.imageUrl ? (
                                                <img src={newItem.imageUrl} className="w-full h-full object-cover" alt="Preview" onError={(e) => e.target.src='https://placehold.co/600x400/111/FACC15?text=Invalid+URL'} />
                                            ) : (
                                                <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-700">
                                                    <ImageIcon className="w-12 h-12 mb-2 opacity-20" />
                                                    <p className="text-[10px] font-black uppercase tracking-widest opacity-20">Preview</p>
                                                </div>
                                            )}
                                        </div>
                                        <div className="bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-2xl text-center">
                                             <span className="text-yellow-500 font-black text-2xl italic tracking-tighter">₹{newItem.price || 0}</span>
                                        </div>
                                    </div>

                                    {/* Form Side */}
                                    <form onSubmit={handleAdd} className="flex-1 space-y-5">
                                        <div>
                                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1 mb-2 block">Item Title</label>
                                            <input value={newItem.name} onChange={e => setNewItem({...newItem, name: e.target.value})} className="glass-input w-full p-4 rounded-2xl font-bold" placeholder="e.g. Veg Noodles" required />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="flex-1">
                                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1 mb-2 block">Category</label>
                                                <input list="cats-modal" value={newItem.category} onChange={e => setNewItem({...newItem, category: e.target.value.toUpperCase()})} className="glass-input w-full p-4 rounded-2xl font-bold uppercase" placeholder="PIZZA..." required />
                                                <datalist id="cats-modal">{categories.map(c => <option key={c} value={c} />)}</datalist>
                                            </div>
                                            <div className="flex-1">
                                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1 mb-2 block">Price (₹)</label>
                                                <input type="number" step="0.01" value={newItem.price} onChange={e => setNewItem({...newItem, price: parseFloat(e.target.value)})} className="glass-input w-full p-4 rounded-2xl font-black text-yellow-500" required />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1 mb-2 block">Image Identity</label>
                                            <div className="flex gap-2 p-1 bg-black/40 rounded-2xl border border-white/5">
                                                <label className="flex-1 cursor-pointer py-3.5 rounded-xl flex items-center justify-center space-x-2 text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all text-slate-400 hover:text-white">
                                                    <Upload className="w-4 h-4" />
                                                    <span>Upload</span>
                                                    <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageFile(e)} />
                                                </label>
                                                <div className="w-[1px] bg-white/5 my-2"></div>
                                                <input 
                                                    value={newItem.imageUrl} 
                                                    onChange={e => setNewItem({...newItem, imageUrl: e.target.value})} 
                                                    className="flex-[2] pl-4 py-3 bg-transparent text-[10px] font-bold focus:outline-none placeholder:text-slate-700" 
                                                    placeholder="Or paste URL..." 
                                                />
                                            </div>
                                        </div>
                                        <GlassButton type="submit" variant="solid" className="w-full !py-6 text-sm">
                                            PUBLISH TO CATALOG
                                        </GlassButton>
                                    </form>
                                </div>
                            </GlassCard>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Profile Settings Modal */}
            <AnimatePresence>
                {showSettings && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowSettings(false)}
                            className="absolute inset-0 bg-black/90 backdrop-blur-md"
                        />
                        <motion.div 
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative w-full max-w-md"
                        >
                            <GlassCard className="border-yellow-500/30 overflow-hidden">
                                <div className="flex items-center justify-between mb-8">
                                    <div className="flex items-center space-x-3">
                                        <div className="p-3 bg-yellow-500 rounded-2xl text-black">
                                            <UserCog className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-black italic tracking-tighter">ADMIN PROFILE</h2>
                                            <p className="text-[10px] uppercase font-black tracking-widest text-slate-500">Security & Credentials</p>
                                        </div>
                                    </div>
                                    <button onClick={() => setShowSettings(false)} className="p-2 hover:bg-white/5 rounded-full transition-all">
                                        <X className="w-6 h-6" />
                                    </button>
                                </div>

                                <form onSubmit={handleUpdateProfile} className="space-y-6">
                                    <div className="space-y-4">
                                        <div>
                                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1 mb-2 block">Admin Display Name</label>
                                            <div className="relative group">
                                                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                                                    <UserCog className="w-5 h-5 text-slate-600 group-focus-within:text-yellow-500" />
                                                </div>
                                                <input 
                                                    value={adminCreds.username}
                                                    onChange={e => setAdminCreds({...adminCreds, username: e.target.value})}
                                                    className="glass-input w-full pl-12 pr-4 py-4 rounded-2xl font-bold"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1 mb-2 block">New Password</label>
                                            <div className="relative group">
                                                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                                                    <Lock className="w-5 h-5 text-slate-600 group-focus-within:text-yellow-500" />
                                                </div>
                                                <input 
                                                    type="text"
                                                    value={adminCreds.password}
                                                    onChange={e => setAdminCreds({...adminCreds, password: e.target.value})}
                                                    className="glass-input w-full pl-12 pr-4 py-4 rounded-2xl font-bold"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <GlassButton type="submit" variant="solid" className="w-full !py-6 text-sm">
                                        UPDATE CREDENTIALS
                                    </GlassButton>
                                    
                                    <p className="text-center text-[10px] font-bold text-slate-500 uppercase tracking-widest opacity-50 px-4">
                                        Warning: Changing your password will affect the login on your next session.
                                    </p>
                                </form>
                            </GlassCard>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AdminPage;
