import React, { useState, useEffect } from 'react';
import { storage } from '../services/storage';
import { 
    Zap, Soup, Utensils, ConciergeBell, Pizza, 
    Sandwich, IceCream, GlassWater, Coffee, Star, Plus, X, ChevronRight,
    Settings
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassButton from '../components/GlassButton';

const MenuPage = () => {
    const [items, setItems] = useState([]);
    const [category, setCategory] = useState('ALL');
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        setItems(storage.getMenu());
    }, []);

    const menuCategories = [
        { id: 'ALL', name: 'All', icon: <Zap className="w-4 h-4" /> },
        ...Array.from(new Set(items.map(item => item.category))).map(cat => ({
            id: cat,
            name: cat,
            icon: getCategoryIcon(cat)
        }))
    ];

    function getCategoryIcon(catName) {
        const name = (catName || '').toUpperCase();
        if (name.includes('CHINESE')) return <Soup className="w-4 h-4" />;
        if (name.includes('PASTA')) return <Utensils className="w-4 h-4" />;
        if (name.includes('SOUTH INDIAN')) return <ConciergeBell className="w-4 h-4" />;
        if (name.includes('PIZZA')) return <Pizza className="w-4 h-4" />;
        if (name.includes('SANDWICH')) return <Sandwich className="w-4 h-4" />;
        if (name.includes('SHAKES')) return <IceCream className="w-4 h-4" />;
        if (name.includes('DRINK') || name.includes('COOLER')) return <GlassWater className="w-4 h-4" />;
        if (name.includes('COFFEE')) return <Coffee className="w-4 h-4" />;
        return <Star className="w-4 h-4" />;
    }

    const filteredItems = category === 'ALL' 
        ? items 
        : items.filter(item => item.category === category);

    return (
        <div className="max-w-4xl mx-auto px-4 pb-32 pt-10 min-h-screen bg-[#0A0A0A] text-white">
            <header className="mb-10 text-center">
                <motion.h1 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-6xl font-black bg-gradient-to-b from-yellow-200 to-yellow-500 bg-clip-text text-transparent italic tracking-tighter"
                >
                    YUMYARD
                </motion.h1>
                <div className="flex items-center justify-center space-x-2 mt-2">
                    <span className="w-12 h-[1px] bg-yellow-500/30"></span>
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-yellow-500/80">FINE DINING • STATIC CATALOG</span>
                    <span className="w-12 h-[1px] bg-yellow-500/30"></span>
                </div>
            </header>

            {/* Categories */}
            <div className="flex space-x-3 overflow-x-auto pb-8 no-scrollbar px-2 sticky top-0 z-30 pt-4 bg-[#0A0A0A]">
                {menuCategories.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => setCategory(cat.id)}
                        className={`flex items-center space-x-2 px-6 py-3 rounded-full whitespace-nowrap transition-all duration-300 border ${
                            category === cat.id 
                            ? 'bg-yellow-500 text-black font-black shadow-[0_10px_30px_rgba(250,204,21,0.4)] border-yellow-500' 
                            : 'bg-white/5 text-slate-400 hover:bg-white/10 border-white/5'
                        }`}
                    >
                        {cat.icon}
                        <span className="uppercase text-[10px] tracking-widest font-black">{cat.name}</span>
                    </button>
                ))}
            </div>

            {/* Menu Items Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence mode='popLayout'>
                    {filteredItems.map((item) => (
                        <motion.div
                            key={item.id}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setSelectedItem(item)}
                            className="cursor-pointer group"
                        >
                            <div className="relative aspect-square rounded-[2.5rem] overflow-hidden glass-card border-white/10 group-hover:border-yellow-500/30 transition-all shadow-2xl">
                                {item.imageUrl ? (
                                    <img src={item.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={item.name} />
                                ) : (
                                    <div className="w-full h-full bg-slate-900 flex items-center justify-center text-slate-700 font-bold italic uppercase tracking-tighter text-2xl opacity-50">Yum</div>
                                )}
                                
                                <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 shadow-xl">
                                    <span className="text-yellow-500 font-black text-sm italic">₹{item.price}</span>
                                </div>

                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-100 group-hover:from-yellow-950/80 transition-all flex flex-col justify-end p-6">
                                     <h3 className="font-black text-lg text-white mb-1 drop-shadow-lg italic">{item.name}</h3>
                                     <div className="flex items-center justify-between mt-1">
                                         <span className="text-[10px] uppercase font-black tracking-widest text-yellow-500/50">{item.category}</span>
                                         <Plus className="w-5 h-5 text-yellow-500 bg-black/50 p-1 rounded-lg" />
                                     </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Detail Modal */}
            <AnimatePresence>
                {selectedItem && (
                    <div className="fixed inset-0 z-[60] flex items-end md:items-center justify-center p-0 md:p-4">
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedItem(null)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        />
                        <motion.div 
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "100%" }}
                            className="bg-neutral-900 w-full max-w-2xl h-[85vh] md:h-auto rounded-t-[3rem] md:rounded-[3rem] overflow-hidden flex flex-col md:flex-row shadow-2xl relative border border-white/5"
                        >
                            <button onClick={() => setSelectedItem(null)} className="absolute top-6 right-6 z-10 p-3 bg-black/40 backdrop-blur-md rounded-full border border-white/10 hover:bg-yellow-500 hover:text-black transition-all">
                                <X className="w-5 h-5" />
                            </button>

                            <div className="w-full md:w-1/2 h-64 md:h-full relative flex-shrink-0">
                                {selectedItem.imageUrl ? (
                                    <img src={selectedItem.imageUrl} className="w-full h-full object-cover" alt={selectedItem.name} />
                                ) : (
                                    <div className="w-full h-full bg-slate-900 flex items-center justify-center text-slate-800 text-5xl font-black">YUM</div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent" />
                            </div>

                            <div className="flex-1 p-8 flex flex-col">
                                <span className="text-[10px] font-black tracking-[0.4em] uppercase text-yellow-500 mb-2">{selectedItem.category}</span>
                                <h1 className="text-4xl font-black italic mb-4 leading-tight">{selectedItem.name}</h1>
                                <p className="text-slate-400 text-sm leading-relaxed mb-8 flex-1">
                                    {selectedItem.description || "Our signature culinary creation, prepared with the finest ingredients and a dash of YumYard secret spices."}
                                </p>

                                <div className="flex items-center justify-between mb-8 bg-black/40 p-5 rounded-[2.5rem] border border-white/10">
                                    <div className="text-left w-full flex justify-between items-end px-2">
                                        <span className="text-[10px] text-slate-500 block uppercase font-black tracking-widest mb-1 opacity-50">Base Price</span>
                                        <span className="text-4xl font-black text-yellow-500 italic tracking-tighter">₹{selectedItem.price.toFixed(2)}</span>
                                    </div>
                                </div>

                                <GlassButton onClick={() => setSelectedItem(null)} variant="solid" className="w-full !py-6">
                                    <div className="flex items-center justify-center space-x-3 text-xl font-black uppercase tracking-widest">
                                        <span>Back to Menu</span>
                                        <ChevronRight className="w-5 h-5" />
                                    </div>
                                </GlassButton>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Footer Admin Link */}
            <footer className="mt-20 pb-10 flex flex-col items-center justify-center space-y-4 opacity-30 hover:opacity-100 transition-opacity duration-500">
                <div className="h-[1px] w-20 bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent mb-4"></div>
                <button 
                    onClick={() => window.location.href = '/login'}
                    className="flex items-center space-x-2 px-4 py-2 rounded-full border border-white/5 hover:border-yellow-500/30 hover:bg-yellow-500/5 transition-all group"
                >
                    <Settings className="w-3 h-3 text-slate-500 group-hover:text-yellow-500 transition-colors" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 group-hover:text-yellow-500 transition-colors">Admin Dashboard</span>
                </button>
                <div className="text-[9px] font-black uppercase tracking-[0.5em] text-slate-600">
                    © 2026 YUMYARD STATIC
                </div>
            </footer>
        </div>
    );
};

export default MenuPage;
