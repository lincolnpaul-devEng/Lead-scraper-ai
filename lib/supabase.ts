
import { createClient } from '@supabase/supabase-js';

// Use Vite's standard for environment variables: VITE_ prefix
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

let supabaseClient;

// Check if the environment variables are set.
if (!supabaseUrl || !supabaseAnonKey) {
    console.warn(
        'Supabase URL/Key is not set. Using mock authentication to prevent network errors. ' +
        'Please create a .env file and add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.'
    );

    // Create a mock Supabase client. This allows the app to run without network errors.
    supabaseClient = {
        auth: {
            // This mock allows the app to load into a stable, logged-out state.
            getSession: async () => ({ data: { session: null }, error: null }),
            onAuthStateChange: () => ({
                data: { subscription: { unsubscribe: () => {} } },
            }),
            // These mocks provide clear developer feedback on the UI if used.
            signInWithPassword: async () => ({
                data: { session: null },
                error: { message: "Supabase not configured. Please add your credentials in a .env file." }
            }),
            signUp: async () => ({
                 data: { session: null },
                error: { message: "Supabase not configured. Please add your credentials in a .env file." }
            }),
            signOut: async () => ({ error: null }),
        },
    };
} else {
    // If credentials are provided, create the real client.
    supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
}

export const supabase = supabaseClient;
