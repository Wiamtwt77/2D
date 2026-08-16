import { createClient } from '@supabase/supabase-js';

// الحصول على متغيرات البيئة من Vite
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('تحذير: مفاتيح سوبابايز غير موجودة في متغيرات البيئة!');
}

/**
 * عميل Supabase - للاتصال بخادم Supabase
 * تأكد من تعيين متغيرات البيئة:
 * - VITE_SUPABASE_URL: رابط مشروع Supabase
 * - VITE_SUPABASE_ANON_KEY: المفتاح المجهول (Anon Key)
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
