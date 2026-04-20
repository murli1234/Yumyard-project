import React, { useState, useEffect } from 'react';
import { storage } from '../services/storage';
import GlassCard from '../components/GlassCard';
import GlassButton from '../components/GlassButton';
import Sidebar from '../components/Sidebar';
import { PlusSquare, Trash2, Edit3, Save, X, ImageIcon, Upload, Check, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AdminPage = () => {
    const [items, setItems] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [newItem, setNewItem] = useState({ name: '', description: '', price: 0, category: '', imageUrl: '' });
    const [editItem, setEditItem] = useState({});
    const [filterCategory, setFilterCategory] = useState('ALL');

    useEffect(() => {
        setItems(storage.getMenu());
    }, []);

    const handleAdd = (e) => {
        e.preventDefault();
        const updated = storage.saveItem(newItem);
        setItems(updated);
        setNewItem({ name: '', description: '', price: 0, category: '', imageUrl: '' });
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
                    
                    <button 
                        onClick={handleReset}
                        className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-white/5 border border-white/5 text-slate-400 hover:bg-yellow-500/10 hover:text-yellow-500 transition-all text-[10px] font-black uppercase tracking-widest"
                    >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>Reset Defaults</span>
                    </button>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Add Item Form */}
                    <div className="lg:col-span-1">
                        <GlassCard className="lg:sticky lg:top-8 border-yellow-500/10 h-fit">
                            <h2 className="text-xl font-black mb-6 flex items-center space-x-2 italic text-yellow-500 underline decoration-yellow-500/30 underline-offset-8">
                                <PlusSquare className="w-5 h-5" />
                                <span className="uppercase tracking-tighter">New Entry</span>
                            </h2>
                            
                            {/* Image Preview Area */}
                            <div className="mb-6 aspect-video rounded-3xl bg-black/40 border border-white/5 overflow-hidden relative group">
                                {newItem.imageUrl ? (
                                    <img src={newItem.imageUrl} className="w-full h-full object-cover" alt="Preview" onError={(e) => e.target.src='https://placehold.co/600x400/111/FACC15?text=Invalid+URL'} />
                                ) : (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-700">
                                        <ImageIcon className="w-12 h-12 mb-2 opacity-20" />
                                        <p className="text-[10px] font-black uppercase tracking-widest opacity-20">No Image Specified</p>
                                    </div>
                                )}
                            </div>

                            <form onSubmit={handleAdd} className="space-y-4">
                                <div>
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] pl-1">Item Title</label>
                                    <input value={newItem.name} onChange={e => setNewItem({...newItem, name: e.target.value})} className="glass-input w-full p-4 rounded-2xl mt-1 font-bold" placeholder="e.g. Veg Noodles" required />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] pl-1">Price (₹)</label>
                                        <input type="number" step="0.01" value={newItem.price} onChange={e => setNewItem({...newItem, price: parseFloat(e.target.value)})} className="glass-input w-full p-4 rounded-2xl mt-1 font-black text-yellow-500" required />
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] pl-1">Category</label>
                                        <input list="cats" value={newItem.category} onChange={e => setNewItem({...newItem, category: e.target.value.toUpperCase()})} className="glass-input w-full p-4 rounded-2xl mt-1 font-bold" placeholder="PIZZA..." required />
                                        <datalist id="cats">{categories.map(c => <option key={c} value={c} />)}</datalist>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] px-2 block mb-2">Image Source</label>
                                        <div className="flex gap-2 p-1 bg-black/40 rounded-2xl border border-white/5">
                                            <label className="flex-1 cursor-pointer py-3 rounded-xl flex items-center justify-center space-x-2 text-[10px] font-black uppercase tracking-widest hover:bg-white/5 transition-all text-slate-400 hover:text-white">
                                                <Upload className="w-3.5 h-3.5" />
                                                <span>Local File</span>
                                                <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageFile(e)} />
                                            </label>
                                            <div className="w-[1px] bg-white/5 my-2"></div>
                                            <div className="flex-[2] relative group">
                                                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                                                    <ImageIcon className="w-3.5 h-3.5 text-slate-600 group-focus-within:text-yellow-500" />
                                                </div>
                                                <input 
                                                    value={newItem.imageUrl} 
                                                    onChange={e => setNewItem({...newItem, imageUrl: e.target.value})} 
                                                    className="w-full pl-9 pr-4 py-3 bg-transparent text-[10px] font-bold focus:outline-none placeholder:text-slate-700" 
                                                    placeholder="Or paste URL..." 
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <GlassButton type="submit" variant="solid" className="w-full !py-6 text-sm">
                                    PUBLISH TO CATALOG
                                </GlassButton>
                            </form>
                        </GlassCard>
                    </div>

                    {/* Items List */}
                    <div className="lg:col-span-2 space-y-6">
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
        </div>
    );
};

export default AdminPage;
