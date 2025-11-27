-- WARNING: This will delete all existing data in these tables!
-- We are dropping tables to ensure they are recreated with the correct columns.

drop table if exists public.order_items cascade;
drop table if exists public.orders cascade;
drop table if exists public.products cascade;
drop table if exists public.clients cascade;
drop table if exists public.users cascade;

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Users Table
create table public.users (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  role text not null check (role in ('ADMIN', 'WORKER', 'DELIVERY')),
  email text unique not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Clients Table
create table public.clients (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  address text not null,
  phone text,
  balance decimal(10,2) default 0.00,
  last_visit timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Products Table
create table public.products (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  sku text unique not null,
  price decimal(10,2) not null,
  stock integer default 0,
  category text not null,
  unit text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Orders Table
create table public.orders (
  id uuid default uuid_generate_v4() primary key,
  client_id uuid references public.clients(id) on delete set null,
  date timestamp with time zone default timezone('utc'::text, now()) not null,
  status text not null check (status in ('PENDING', 'PREPARED', 'DELIVERED', 'CANCELLED')),
  total decimal(10,2) default 0.00,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Order Items Table
create table public.order_items (
  id uuid default uuid_generate_v4() primary key,
  order_id uuid references public.orders(id) on delete cascade,
  product_id uuid references public.products(id) on delete set null,
  quantity integer not null,
  price decimal(10,2) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table public.users enable row level security;
alter table public.clients enable row level security;
alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;

-- Create policies to allow all access
create policy "Enable all access for all users" on public.users for all using (true) with check (true);
create policy "Enable all access for all users" on public.clients for all using (true) with check (true);
create policy "Enable all access for all users" on public.products for all using (true) with check (true);
create policy "Enable all access for all users" on public.orders for all using (true) with check (true);
create policy "Enable all access for all users" on public.order_items for all using (true) with check (true);
