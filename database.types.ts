export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            clients: {
                Row: {
                    id: string
                    name: string
                    address: string
                    phone: string
                    balance: number
                    last_visit: string | null
                    created_at: string
                }
                Insert: {
                    id?: string
                    name: string
                    address: string
                    phone: string
                    balance?: number
                    last_visit?: string | null
                    created_at?: string
                }
                Update: {
                    id?: string
                    name?: string
                    address?: string
                    phone?: string
                    balance?: number
                    last_visit?: string | null
                    created_at?: string
                }
            }
            products: {
                Row: {
                    id: string
                    name: string
                    sku: string
                    price: number
                    stock: number
                    category: string
                    unit: string
                    created_at: string
                }
                Insert: {
                    id?: string
                    name: string
                    sku: string
                    price: number
                    stock?: number
                    category: string
                    unit: string
                    created_at?: string
                }
                Update: {
                    id?: string
                    name?: string
                    sku?: string
                    price?: number
                    stock?: number
                    category?: string
                    unit?: string
                    created_at?: string
                }
            }
            orders: {
                Row: {
                    id: string
                    client_id: string
                    date: string
                    status: 'PENDING' | 'PREPARED' | 'DELIVERED' | 'CANCELLED'
                    total: number
                    created_at: string
                }
                Insert: {
                    id?: string
                    client_id: string
                    date?: string
                    status?: 'PENDING' | 'PREPARED' | 'DELIVERED' | 'CANCELLED'
                    total: number
                    created_at?: string
                }
                Update: {
                    id?: string
                    client_id?: string
                    date?: string
                    status?: 'PENDING' | 'PREPARED' | 'DELIVERED' | 'CANCELLED'
                    total?: number
                    created_at?: string
                }
            }
            order_items: {
                Row: {
                    id: string
                    order_id: string
                    product_id: string
                    quantity: number
                    price: number
                    created_at: string
                }
                Insert: {
                    id?: string
                    order_id: string
                    product_id: string
                    quantity: number
                    price: number
                    created_at?: string
                }
                Update: {
                    id?: string
                    order_id?: string
                    product_id?: string
                    quantity?: number
                    price?: number
                    created_at?: string
                }
            }
        }
        Views: {
            [_: string]: {
                Row: {
                    [key: string]: any
                }
            }
        }
        Functions: {
            [_: string]: {
                Args: {
                    [key: string]: any
                }
                Returns: {
                    [key: string]: any
                }
            }
        }
        Enums: {
            [_: string]: any
        }
    }
}
