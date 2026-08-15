import { supabase } from './supabase.js';

/**
 * حفظ أو تحديث المشروع في سوبابايز
 * @param {string} title - عنوان المشروع
 * @param {Array} scenesData - مصفوفة المشاهد الحالية
 * @param {string|null} projectId - معرف المشروع (إذا كان موجوداً مسبقاً للتحديث)
 */
export async function saveProject(title, scenesData, projectId = null) {
  const payload = {
    title: title || 'مشروع كرتوني جديد',
    data: { scenes: scenesData },
    updated_at: new Date().toISOString()
  };

  if (projectId) {
    // تحديث مشروع حالي
    const { data, error } = await supabase
      .from('projects')
      .update(payload)
      .eq('id', projectId)
      .select();
    
    if (error) {
      console.error('خطأ أثناء تحديث المشروع:', error.message);
      throw error;
    }
    return data[0];
  } else {
    // إنشاء مشروع جديد كلياً
    const { data, error } = await supabase
      .from('projects')
      .insert([payload])
      .select();
    
    if (error) {
      console.error('خطأ أثناء حفظ مشروع جديد:', error.message);
      throw error;
    }
    return data[0];
  }
}

/**
 * تحميل مشروع من سوبابايز عبر معرفه (ID)
 * @param {string} projectId 
 */
export async function loadProject(projectId) {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', projectId)
    .single();

  if (error) {
    console.error('خطأ أثناء تحميل المشروع:', error.message);
    throw error;
  }
  return data;
}
