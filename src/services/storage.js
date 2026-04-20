const MENU_KEY = 'yumyard_static_menu';

const DEFAULT_ITEMS = [
    // 🍜 CHINESE CORNER
    { id: '1', name: "Veg Noodles", description: "Wok-tossed noodles with crisp seasonal vegetables and aromatic soy.", price: 99.0, category: "CHINESE CORNER", imageUrl: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&q=80&w=800" },
    { id: '2', name: "Hakka Noodles", description: "Authentic Calcutta-style hakka noodles with a smoky finish.", price: 89.0, category: "CHINESE CORNER", imageUrl: "https://images.unsplash.com/photo-1617093727343-374698b1b08d?auto=format&fit=crop&q=80&w=800" },
    { id: '3', name: "Schezwan Noodles", description: "Spicy, bold noodles tossed in our house-made fiery schezwan sauce.", price: 109.0, category: "CHINESE CORNER", imageUrl: "https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&q=80&w=800" },
    { id: '4', name: "Fried Rice", description: "Classic, fluffy long-grain rice wok-tossed with finely diced veggies.", price: 99.0, category: "CHINESE CORNER", imageUrl: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&q=80&w=800" },
    { id: '5', name: "Paneer Fried Rice", description: "Wok-tossed rice with marinated golden paneer cubes and scallions.", price: 129.0, category: "CHINESE CORNER", imageUrl: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&q=80&w=800" },
    { id: '6', name: "Manchurian (Gravy/Dry)", description: "Garden fresh vegetable dumplings in a tangy, spicy ginger-garlic sauce.", price: 109.0, category: "CHINESE CORNER", imageUrl: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&q=80&w=800" },
    { id: '7', name: "Chilli Paneer", description: "Crispy paneer cubes tossed with bell peppers and green chillies.", price: 159.0, category: "CHINESE CORNER", imageUrl: "https://images.unsplash.com/photo-1567188040759-fbcd1803c14d?auto=format&fit=crop&q=80&w=800" },
    { id: '8', name: "Paneer 65", description: "Spicy, deep-fried paneer bites tempered with curry leaves and mustard.", price: 169.0, category: "CHINESE CORNER", imageUrl: "https://images.unsplash.com/photo-1599487488170-d11ec9c175f0?auto=format&fit=crop&q=80&w=800" },
    { id: '9', name: "Veg Kothe", description: "Fried veg dumplings tossed in a chef's special garlic-coriander sauce.", price: 139.0, category: "CHINESE CORNER", imageUrl: "https://images.unsplash.com/photo-1582169542910-448e88e1df43?auto=format&fit=crop&q=80&w=800" },
    { id: '9a', name: "Corn Masala Chaat", description: "Sweet golden corn tossed with chatpata spices and fresh lime juice.", price: 119.0, category: "CHINESE CORNER", imageUrl: "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&q=80&w=800" },
    { id: '9b', name: "Manchurian Noodles", description: "Street-style combo of noodles topped with manchurian gravy.", price: 119.0, category: "CHINESE CORNER", imageUrl: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&q=80&w=800" },

    // 🍱 CHINESE COMBOS
    { id: '10c', name: "Hakka Noodles + Gravy Manchurian", description: "A perfectly balanced meal featuring soft noodles and spicy manchurian.", price: 169.0, category: "CHINESE COMBOS", imageUrl: "https://images.unsplash.com/photo-1617093727343-374698b1b08d?auto=format&fit=crop&q=80&w=800" },
    { id: '11c', name: "Fried Rice + Gravy Manchurian", description: "Classic fried rice served with a side of hearty manchurian gravy.", price: 159.0, category: "CHINESE COMBOS", imageUrl: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&q=80&w=800" },

    // 🍝 PASTA PARADISE
    { id: '10', name: "White Sauce Pasta", description: "Penne tossed in a velvety, buttery alfredo cream sauce.", price: 129.0, category: "PASTA PARADISE", imageUrl: "https://images.unsplash.com/photo-1645112481338-3314486ec85c?auto=format&fit=crop&q=80&w=800" },
    { id: '11', name: "Red Sauce Pasta", description: "Spicy arabiata sauce made from hand-picked tomatoes and fresh basil.", price: 129.0, category: "PASTA PARADISE", imageUrl: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&q=80&w=800" },
    { id: '12', name: "Hot Garlic Pasta", description: "Garlic-infused oil with red pepper flakes and perfectly cooked penne.", price: 129.0, category: "PASTA PARADISE", imageUrl: "https://images.unsplash.com/photo-1473093226795-af9932fe5856?auto=format&fit=crop&q=80&w=800" },
    { id: '12a', name: "White Sauce Cheese Pasta", description: "Ultimate cheesy white sauce pasta for the true indulgence.", price: 159.0, category: "PASTA PARADISE", imageUrl: "https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?auto=format&fit=crop&q=80&w=800" },

    // 🇮🇳 DESI FAVOURITES
    { id: '13', name: "Pav Bhaji", description: "The iconic Mumbai street food experience with buttery pavs.", price: 109.0, category: "DESI FAVOURITES", imageUrl: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&q=80&w=800" },
    { id: '14', name: "Chole + Kulcha", description: "Amritsari style spicy chickpeas served with two buttered kulchas.", price: 129.0, category: "DESI FAVOURITES", imageUrl: "https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&q=80&w=800" },
    { id: '14a', name: "Butter Paneer Masala + Kulcha", description: "Silky butter paneer masala served with soft, warm kulchas.", price: 159.0, category: "DESI FAVOURITES", imageUrl: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80&w=800" },

    // 🍕 PIZZA
    { id: '15', name: "Classic Margherita", description: "Double mozzarella and aromatic fresh basil on a crisp crust.", price: 129.0, category: "PIZZA", imageUrl: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?auto=format&fit=crop&q=80&w=800" },
    { id: '16', name: "Veggie Loaded", description: "A colorful garden party of olives, peppers, onions, and mushrooms.", price: 159.0, category: "PIZZA", imageUrl: "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?auto=format&fit=crop&q=80&w=800" },
    { id: '17', name: "Tandoori Paneer Pizza", description: "Smoky tandoori paneer bites on a spicy, thin-crust pizza base.", price: 189.0, category: "PIZZA", imageUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=800" },

    // 🍔 BURGER BHUKKAD
    { id: '18', name: "Veg Burger", description: "Crispy potato paddy with spicy mayonaise and garden fresh salads.", price: 79.0, category: "BURGER BHUKKAD", imageUrl: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&q=80&w=800" },
    { id: '19', name: "Paneer Cheese Burger", description: "A massive paneer steak with melting cheese and artisan buns.", price: 119.0, category: "BURGER BHUKKAD", imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=800" },

    // 🍟 QUICK BITES
    { id: 'b1', name: "Salted French Fries", description: "Golden, crispy Russet potato fries with a light sea-salt dusting.", price: 79.0, category: "QUICK BITES", imageUrl: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&q=80&w=800" },
    { id: 'b2', name: "Peri Peri French Fries", description: "Our signature fries tossed in spicy African Peri Peri spice mix.", price: 89.0, category: "QUICK BITES", imageUrl: "https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?auto=format&fit=crop&q=80&w=800" },

    // 🥤 SHAKES
    { id: '20', name: "Oreo Shake", description: "Rich vanilla cream blended with crunchy Oreo cookies and choco drizzle.", price: 109.0, category: "SHAKES", imageUrl: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&q=80&w=800" },
    { id: '21', name: "Classic Cold Coffee", description: "Double-shot espresso blended with chilled milk and premium foam.", price: 79.0, category: "SHAKES", imageUrl: "https://images.unsplash.com/photo-1541167760496-162955ed8a9f?auto=format&fit=crop&q=80&w=800" },

    // 🍹 COOLERS
    { id: 'c1', name: "Classic Mint Mojito", description: "A refreshing thirst-quencher with fresh mint, lime, and fizz.", price: 79.0, category: "COOLERS", imageUrl: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=800" },
    { id: 'c2', name: "Lemon Soda", description: "Zesty, salty, and sweet: the iconic Indian summer refresher.", price: 49.0, category: "COOLERS", imageUrl: "https://images.unsplash.com/photo-1621263764496-749ffb260387?auto=format&fit=crop&q=80&w=800" }
];

export const storage = {
    getMenu: () => {
        const stored = localStorage.getItem(MENU_KEY);
        if (!stored) {
            localStorage.setItem(MENU_KEY, JSON.stringify(DEFAULT_ITEMS));
            return DEFAULT_ITEMS;
        }
        return JSON.parse(stored);
    },

    saveItem: (item) => {
        const menu = storage.getMenu();
        let newMenu;
        
        if (item.id) {
            newMenu = menu.map(i => i.id === item.id ? item : i);
        } else {
            const newItem = {
                ...item,
                id: Date.now().toString(),
            };
            newMenu = [...menu, newItem];
        }
        
        localStorage.setItem(MENU_KEY, JSON.stringify(newMenu));
        return newMenu;
    },

    deleteItem: (id) => {
        const menu = storage.getMenu();
        const newMenu = menu.filter(i => i.id !== id);
        localStorage.setItem(MENU_KEY, JSON.stringify(newMenu));
        return newMenu;
    },

    resetMenu: () => {
        localStorage.setItem(MENU_KEY, JSON.stringify(DEFAULT_ITEMS));
        return DEFAULT_ITEMS;
    }
};
