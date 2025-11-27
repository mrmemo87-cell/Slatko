import { supabase } from './supabase';

export const seedDatabase = async () => {
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
