import { supabase } from './supabase';

export const seedDatabase = async () => {
    if (!supabase) {
        console.error('Supabase client not initialized');
        return;
    }

    const MOCK_USERS = [
        { name: 'Admin User', role: 'ADMIN', email: 'admin@slatko.com' },
        { name: 'New Admin', role: 'ADMIN', email: 'newadmin@slatko.com' },
        { name: 'John Worker', role: 'WORKER', email: 'worker@slatko.com' },
        { name: 'Mike Delivery', role: 'DELIVERY', email: 'delivery@slatko.com' },
    ];

    const MOCK_PRODUCTS = [
        { name: 'Premium Coffee Beans', sku: 'CB-001', price: 15.00, stock: 150, category: 'Raw Material', unit: 'kg' },
        { name: 'Caramel Syrup', sku: 'SY-CAR', price: 8.50, stock: 45, category: 'Syrup', unit: 'bottle' },
        { name: 'Vanilla Syrup', sku: 'SY-VAN', price: 8.50, stock: 30, category: 'Syrup', unit: 'bottle' },
        { name: 'Paper Cups (12oz)', sku: 'PC-12', price: 0.15, stock: 1000, category: 'Packaging', unit: 'pcs' },
        { name: 'Plastic Lids', sku: 'PL-01', price: 0.05, stock: 1200, category: 'Packaging', unit: 'pcs' },
    ];

    const MOCK_CLIENTS = [
        { name: 'Cafe Aroma', address: '123 Main St, Cityville', phone: '555-0123', balance: 0 },
        { name: 'Daily Brews', address: '456 Oak Ave, Townsburg', phone: '555-0456', balance: 155.00 },
        { name: 'Espresso Express', address: '789 Pine Ln, Villageton', phone: '555-0789', balance: -320.00 },
    ];

    console.log('Seeding Users...');
    const { error: usersError } = await supabase.from('users').insert(MOCK_USERS);
    if (usersError) console.error('Error seeding users:', usersError);

    console.log('Seeding Products...');
    const { error: productsError } = await supabase.from('products').insert(MOCK_PRODUCTS);
    if (productsError) console.error('Error seeding products:', productsError);

    console.log('Seeding Clients...');
    const { error: clientsError } = await supabase.from('clients').insert(MOCK_CLIENTS);
    if (clientsError) console.error('Error seeding clients:', clientsError);

    alert('Database seeded! Please refresh the page.');
};
