import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Database } from '../database.types';

type TableName = keyof Database['public']['Tables'];

export function useResource<T>(resource: string) {
    const [data, setData] = useState<T[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchData() {
            if (!supabase) {
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                // Map resource names to table names if they differ
                let tableName = resource;
                if (resource === 'inventory') tableName = 'products'; // Inventory is just products view

                // Check if table exists in our types (runtime check would need a different approach)
                // For now, we assume the resource name maps to a table or we handle specific cases

                const { data: result, error: supabaseError } = await supabase
                    .from(tableName as TableName)
                    .select('*');

                if (supabaseError) {
                    throw supabaseError;
                }

                setData(result as unknown as T[]);
            } catch (err: any) {
                console.error(`Error fetching ${resource}:`, err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [resource]);

    return { data, loading, error };
}
