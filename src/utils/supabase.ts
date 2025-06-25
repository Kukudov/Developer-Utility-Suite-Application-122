import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      tool_usage_logs: {
        Row: {
          id: string
          user_id: string
          tool_id: string
          timestamp: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          tool_id: string
          timestamp?: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          tool_id?: string
          timestamp?: string
          created_at?: string
        }
      }
      feedback: {
        Row: {
          id: string
          tool_id: string
          user_id: string
          comment: string
          created_at: string
        }
        Insert: {
          id?: string
          tool_id: string
          user_id: string
          comment: string
          created_at?: string
        }
        Update: {
          id?: string
          tool_id?: string
          user_id?: string
          comment?: string
          created_at?: string
        }
      }
      ai_requests: {
        Row: {
          id: string
          user_id: string
          prompt: string
          model_used: string
          response_time: number
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          prompt: string
          model_used: string
          response_time: number
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          prompt?: string
          model_used?: string
          response_time?: number
          created_at?: string
        }
      }
    }
  }
}