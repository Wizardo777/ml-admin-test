import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://hpbgcygbclvktckuigkr.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhwYmdjeWdiY2x2a3Rja3VpZ2tyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE5MjYzOTEsImV4cCI6MjA5NzUwMjM5MX0.F_PI6gZxLDRHluFVMYJYdnHcvv2McDdEBCoiXLklKrU'

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
)