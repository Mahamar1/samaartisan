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
      categories: {
        Row: {
          id: string
          slug: string
          name: string
          description: string
          icon: string
          created_at: string
        }
        Insert: {
          id?: string
          slug: string
          name: string
          description: string
          icon: string
          created_at?: string
        }
        Update: {
          id?: string
          slug?: string
          name?: string
          description?: string
          icon?: string
          created_at?: string
        }
      }
      providers: {
        Row: {
          id: string
          slug: string
          name: string
          business_name: string
          avatar: string
          phone: string
          whatsapp: string
          category_slug: string
          category_name: string
          headline: string
          region_id: string
          neighborhood: string
          address: string
          average_rating: number
          review_count: number
          starting_price: number
          response_time_minutes: number
          is_available: boolean
          verification_level: 'UNVERIFIED' | 'ID_VERIFIED' | 'ID_AND_SKILLS'
          cni_number: string | null
          years_experience: number
          bio: string
          specialties: string[]
          created_at: string
        }
        Insert: {
          id?: string
          slug: string
          name: string
          business_name?: string
          avatar?: string
          phone: string
          whatsapp?: string
          category_slug: string
          category_name: string
          headline?: string
          region_id?: string
          neighborhood: string
          address?: string
          average_rating?: number
          review_count?: number
          starting_price?: number
          response_time_minutes?: number
          is_available?: boolean
          verification_level?: 'UNVERIFIED' | 'ID_VERIFIED' | 'ID_AND_SKILLS'
          cni_number?: string | null
          years_experience?: number
          bio?: string
          specialties?: string[]
          created_at?: string
        }
        Update: {
          id?: string
          slug?: string
          name?: string
          business_name?: string
          avatar?: string
          phone?: string
          whatsapp?: string
          category_slug?: string
          category_name?: string
          headline?: string
          region_id?: string
          neighborhood?: string
          address?: string
          average_rating?: number
          review_count?: number
          starting_price?: number
          response_time_minutes?: number
          is_available?: boolean
          verification_level?: 'UNVERIFIED' | 'ID_VERIFIED' | 'ID_AND_SKILLS'
          cni_number?: string | null
          years_experience?: number
          bio?: string
          specialties?: string[]
          created_at?: string
        }
      }
      service_requests: {
        Row: {
          id: string
          provider_id: string
          client_name: string
          client_phone: string
          service_type: string
          details: string | null
          channel: 'WHATSAPP' | 'CALL' | 'FORM'
          status: 'PENDING' | 'CONTACTED' | 'COMPLETED' | 'CANCELLED'
          created_at: string
        }
        Insert: {
          id?: string
          provider_id: string
          client_name: string
          client_phone: string
          service_type: string
          details?: string | null
          channel?: 'WHATSAPP' | 'CALL' | 'FORM'
          status?: 'PENDING' | 'CONTACTED' | 'COMPLETED' | 'CANCELLED'
          created_at?: string
        }
        Update: {
          id?: string
          provider_id?: string
          client_name?: string
          client_phone?: string
          service_type?: string
          details?: string | null
          channel?: 'WHATSAPP' | 'CALL' | 'FORM'
          status?: 'PENDING' | 'CONTACTED' | 'COMPLETED' | 'CANCELLED'
          created_at?: string
        }
      }
    }
  }
}
