export const settings = {
  // Backend API URL – uses Vite proxy in development (empty string = same origin),
  // falls back to explicit URL for production builds.
  API_URL: import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000',

  // Supabase Configuration
  SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL || 'https://kwowpxvcrorhrkilhkli.supabase.co',
  SUPABASE_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt3b3dweHZjcm9yaHJraWxoa2xpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NjMyNTE2MSwiZXhwIjoyMDkxOTAxMTYxfQ.zvYni1_KBgSItevjZkWXCBZTYF3nuU31ZT0Eid_2QHA',
};
