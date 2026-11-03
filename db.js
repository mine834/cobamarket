(function(){'use strict';
const cfg=window.SHOP_CONFIG||{};let client;
const escape=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function configured(){return Boolean(cfg.supabaseUrl&&cfg.publishableKey)}
function db(){if(client)return client;if(!configured())throw Error('Мэдээллийн сан холбогдоогүй.');if(cfg.publishableKey.startsWith('sb_secret_'))throw Error('Нууц key-г хэрэглэгчийн кодод ашиглаж болохгүй.');if(!window.supabase)throw Error('Холболтын сан ачаалсангүй. Интернэтээ шалгана уу.');client=window.supabase.createClient(cfg.supabaseUrl,cfg.publishableKey,{auth:{storageKey:'coba-admin-auth',persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}});return client}
async function products(all=false){const page=1000;let query=db().from('products').select('*',{count:'exact'}).order('created_at',{ascending:false}).order('id');if(!all)query=query.eq('active',true);const first=await query.range(0,page-1);if(first.error)throw first.error;const result=first.data||[];const count=first.count??result.length;for(let start=page;start<count;start+=page*3){const ranges=[];for(let n=start;n<Math.min(start+page*3,count);n+=page){let q=db().from('products').select('*').order('created_at',{ascending:false}).order('id');if(!all)q=q.eq('active',true);ranges.push(q.range(n,n+page-1))}const batches=await Promise.all(ranges);for(const batch of batches){if(batch.error)throw batch.error;result.push(...batch.data)}}return result}
async function settings(){const {data,error}=await db().from('shop_settings').select('*').eq('id',1).single();if(error)throw error;return data}
async function admin(){const {data:{user},error}=await db().auth.getUser();if(error||!user)return false;const r=await db().from('admin_users').select('id').eq('id',user.id).maybeSingle();if(r.error)throw r.error;return Boolean(r.data)}
function imageUrl(s,allowEmpty=false){s=String(s||'').trim();if(!s&&allowEmpty)return '';if(s.startsWith('./assets/'))return s;const u=new URL(s);if(u.protocol!=='https:')throw Error('Зургийн холбоос HTTPS байна.');return u.href}
function linkUrl(s){if(!s)return '';try{const u=new URL(s);return ['https:','http:'].includes(u.protocol)?u.href:''}catch{return ''}}
window.ShopDB={configured,db,products,settings,admin,escape,imageUrl,linkUrl};
})();
