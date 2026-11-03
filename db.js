(function(){
'use strict';
const cfg=window.SHOP_CONFIG||{};let client;
const escape=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function configured(){return Boolean(cfg.supabaseUrl&&cfg.publishableKey)}
function db(){
 if(client)return client;
 if(!configured())throw Error('Холболт тохируулагдаагүй. config.js файлыг бөглөнө үү.');
 if(!/^https:\/\/[^/]+\.supabase\.co$/.test(cfg.supabaseUrl))throw Error('Supabase Project URL буруу байна.');
 if(cfg.publishableKey.startsWith('sb_secret_'))throw Error('Нууц key ашиглаж болохгүй. Publishable key оруулна уу.');
 if(cfg.publishableKey.startsWith('eyJ')){try{const role=JSON.parse(atob(cfg.publishableKey.split('.')[1].replace(/-/g,'+').replace(/_/g,'/'))).role;if(role!=='anon')throw Error('unsafe')}catch{throw Error('Зөвхөн publishable эсвэл anon key ашиглана уу.')}}
 if(!window.supabase)throw Error('Холболтын сан ачаалагдсангүй. Интернэт холболтоо шалгана уу.');
 client=window.supabase.createClient(cfg.supabaseUrl,cfg.publishableKey,{auth:{storageKey:'coba-admin-auth',persistSession:true,autoRefreshToken:true,detectSessionInUrl:false}});return client;
}
async function products(all=false){let q=db().from('products').select('*').order('created_at',{ascending:false});if(!all)q=q.eq('active',true);const {data,error}=await q;if(error)throw error;return data}
async function settings(){const {data,error}=await db().from('shop_settings').select('*').eq('id',1).single();if(error)throw error;return data}
async function admin(){const {data:{user},error}=await db().auth.getUser();if(error||!user)return false;const r=await db().from('admin_users').select('id').eq('id',user.id).maybeSingle();if(r.error)throw r.error;return Boolean(r.data)}
function imageUrl(value){const url=new URL(value);if(url.protocol!=='https:')throw Error('Зургийн холбоос https:// гэж эхлэх ёстой.');return url.href}
window.ShopDB={configured,db,products,settings,admin,escape,imageUrl};
})();
