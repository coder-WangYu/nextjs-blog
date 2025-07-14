import { supabase } from '../lib/supabaseClient';

// 获取首页文章
export async function fetchArticlesForHome() {
  const { data, error } = await supabase.from('articles').select('*').limit(6);
  if (error) throw error;
  return data;
}

// 获取所有文章
export async function fetchArticles() {
  const { data, error } = await supabase.from('articles').select('*');
  if (error) throw error;
  return data;
}

// 根据ID获取单篇文章
export async function fetchArticleById(id) {
  const { data, error } = await supabase.from('articles').select('*').eq('id', id).single();
  if (error) throw error;
  return data;
}

// 根据类型获取单篇文章
export async function fetchArticleByCategory(value) {
  const { data, error } = await supabase.from('articles').select('*').eq('category', value);
  if (error) throw error;
  return data;
}

// 新增文章
export async function createArticle(article) {
  const { data, error } = await supabase.from('articles').insert([article]).select().single();
  if (error) throw error;
  return data;
}

// 更新文章
export async function updateArticle(id, updates) {
  const { data, error } = await supabase.from('articles').update(updates).eq('id', id).select().single();
  if (error) throw error;
  return data;
}

// 删除文章
export async function deleteArticle(id) {
  const { error } = await supabase.from('articles').delete().eq('id', id);
  if (error) throw error;
  return true;
}