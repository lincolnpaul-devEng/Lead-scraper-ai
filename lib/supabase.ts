import { createClient } from '@supabase/supabase-js';

// NOTE: These are placeholder values. In a real environment, these would be
// securely stored in environment variables and should not be hardcoded.
const supabaseUrl = 'https://your-project-id.supabase.co';
const supabaseAnonKey = 'your-public-anon-key';

let supabaseClient;

// Check if the placeholder values are still being used.
if (supabaseUrl === 'https://your-project-id.supabase.co' || !supabaseUrl || !supabaseAnonKey) {
    console.warn(
        'Supabase URL/Key is not set. Using mock authentication to prevent network errors. ' +
        'Please replace placeholder values in `lib/supabase.ts` for full functionality.'
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
                error: { message: "Supabase not configured. Please add your credentials in lib/supabase.ts" }
            }),
            signUp: async () => ({
                 data: { session: null },
                error: { message: "Supabase not configured. Please add your credentials in lib/supabase.ts" }
            }),
            signOut: async () => ({ error: null }),
        },
    };
} else {
    // If credentials are provided, create the real client.
    supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
}

export const supabase = supabaseClient;
