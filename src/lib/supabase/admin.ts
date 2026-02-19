import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { Database } from '@/types/database.types'
import { logger } from '@/lib/logger'

export function createAdminClient(): SupabaseClient<Database> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseServiceKey) {
    if (!supabaseServiceKey && process.env.NODE_ENV === 'production') {
        logger.error('Supabase Service Role Key is missing in production!')
    }
  }

  const key = supabaseServiceKey || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

  if (!supabaseUrl || !key) {
      throw new Error('Supabase credentials missing')
  }

  // Cast to unknown then to SupabaseClient<Database> to bypass complex type inference issues
  // while maintaining type safety for consumers of this function.
  return createClient<Database>(supabaseUrl, key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }) as unknown as SupabaseClient<Database>
}
