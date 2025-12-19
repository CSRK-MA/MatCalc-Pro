# Supabase Setup (MatCalc-Pro)

This project integrates Supabase for database, authentication, and real-time features.

## Install Client

For TypeScript/JavaScript:
```bash
npm install @supabase/supabase-js
```

Or with yarn:
```bash
yarn add @supabase/supabase-js
```

## Environment Configuration

1. Create a Supabase project at https://supabase.com
2. Copy `.env.example` to `.env.local` and fill in your project credentials:
   - **SUPABASE_URL** – from Supabase project Settings → API
   - **SUPABASE_ANON_KEY** – public client key
   - **SUPABASE_SERVICE_ROLE_KEY** – keep secret; server-only for admin operations

```bash
cp .env.example .env.local
# Edit .env.local with your Supabase credentials
```

## Local Development

### Using Supabase CLI (Optional)

```bash
npm install -g supabase
supabase start          # Run local DB and API
supabase db push        # Apply migrations from migrations/ folder
```

### Apply Initial Schema

Run the SQL migration against your Supabase project:

**Via Supabase Dashboard:**
1. Go to SQL Editor → New Query
2. Copy contents of `migrations/init.sql` and execute

**Via CLI:**
```bash
supabase db push
```

## Usage

### Import the Client

```typescript
import { supabase } from './supabaseClient';
```

### Example: Fetch User's Notes

```typescript
const { data, error } = await supabase
  .from('notes')
  .select('*');

if (error) console.error(error);
else console.log(data);
```

### Example: Insert a Note

```typescript
const { data, error } = await supabase
  .from('notes')
  .insert([{ user_id: userId, content: 'My note' }]);
```

### Real-time Subscriptions

```typescript
supabase
  .channel('public:notes')
  .on('postgres_changes', { event: '*', schema: 'public', table: 'notes' }, payload => {
    console.log('Change received!', payload);
  })
  .subscribe();
```

## Security Notes

- **Row Level Security (RLS)** is enabled on the `notes` table. Users can only access their own rows.
- Keep `SUPABASE_SERVICE_ROLE_KEY` secret; use it only in server-side code.
- Validate all client requests; RLS policies are the last line of defense.
- Add additional policies as needed for your business logic.

## Next Steps

- Extend the schema in `migrations/` with additional tables
- Add RLS policies for your specific use cases
- Enable additional auth providers (Google, GitHub, etc.) in Supabase Dashboard
- Set up edge functions for custom backend logic

## Resources

- [Supabase Docs](https://supabase.com/docs)
- [supabase-js Client Library](https://supabase.com/docs/reference/javascript/introduction)
- [Supabase CLI](https://supabase.com/docs/guides/cli)