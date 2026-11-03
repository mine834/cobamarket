(function(){
'use strict';
const D={
 brand:{name:'Coba Market',tagline:'ӨДӨР БҮР, ТАНТАЙ',logo:'',search_placeholder:'Өнөөдөр танд юу хэрэгтэй вэ?'},
 announcement:{visible:true,messages:[{text:'Хүнсний бүтээгдэхүүнүүдтэй танилцаарай',target:'Бүгд'},{text:'Хүргэлтийн нөхцөлтэй танилцаарай',target:'Хүргэлт'},{text:'Шинээр ирсэн бүтээгдэхүүнүүд',target:'Шинэ'}]},
 navigation:{items:[{label:'Бүх ангилал',target:'Бүгд'},{label:'Хүнс',target:'Хүнс'},{label:'Шинээр ирсэн',target:'Шинэ'},{label:'Хямдрал',target:'Хямдрал'}],right_text:'Таны сонголтыг, таны үүдэнд'},
 hero:{visible:true,slides:[{eyebrow:'ӨДӨР БҮРИЙГ ИЛҮҮ ХЯЛБАР',title:'Танд хэрэгтэй бүхэн.',accent:'Нэг дор.',description:'Хүнсний бүтээгдэхүүнээ нэр, ангилал, үнээр нь хялбархан сонгоорой.',button:'Бүтээгдэхүүн үзэх',target:'Бүгд',image1:'',image2:'',label1:'Өдөр бүрийн сонголт',caption1:'Хэрэгтэй бүхнийг нэг дороос',label2:'Хүнсний бүтээгдэхүүнүүд',caption2:'Өөрт тохирох сонголтоо олоорой',background:'#f0edfb'}]},
 benefits:{visible:true,items:[{icon:'truck',title:'Хүргэлтийн мэдээлэл',subtitle:'Бүс, нөхцөлтэй танилцаарай',target:'Хүргэлт'},{icon:'leaf',title:'Хүнсний олон сонголт',subtitle:'Ангиллаар нь хялбархан хай',target:'Бүгд'},{icon:'shield',title:'Бүтээгдэхүүний мэдээлэл',subtitle:'Нэр, савлагаа, үнийг харьцуул',target:'Бүгд'},{icon:'bag',title:'Танд зориулсан сагс',subtitle:'Сонголтоо хадгалаад үргэлжлүүл',target:'Сагс'}]},
 categories:{visible:true,title:'Юу хайж байна вэ?',subtitle:'Хэрэгцээгээ ангиллаар нь сонгоорой.',link_text:'Бүх бүтээгдэхүүн',items:[{title:'Жимс, хүнсний ногоо',subtitle:'Өдөр тутмын хүнс',image:'',target:'Жимс, хүнсний ногоо',background:'#f3f0e8',visible:true},{title:'Өдөр тутмын шинэ хүнс',subtitle:'Сүү, сүүн бүтээгдэхүүн болон бусад',image:'',target:'Өдөр тутмын шинэ хүнс',background:'#edf1f6',visible:true},{title:'Амттан',subtitle:'Амтат сонголтууд',image:'',target:'Амттан',background:'#f8edef',visible:true}]},
 catalog:{visible:true,title:'Хүнсний бүтээгдэхүүнүүд',subtitle:'Нэр, ангилал, үнээр нь сонгоорой.',new_title:'Шинээр ирсэн',sale_title:'Хямдралтай бүтээгдэхүүн',page_size:24,show_source:false},
 promotion:{visible:true,title:'Таны сонголт. Таны үүдэнд.',description:'Хүргэлтийн бүс болон захиалгын нөхцөлтэй танилцаарай.',button:'Хүргэлтийн мэдээлэл',target:'Хүргэлт',background:'#f0edfb'},
 footer:{description:'Өдөр бүрийн хэрэгцээ, нэг дор.',copyright:'© Coba Market',contact_label:'Холбоо барих',phone:'',email:'',address:'',hours:'',facebook:'',instagram:'',notice:''},
 policies:{delivery_title:'Хүргэлтийн мэдээлэл',delivery_text:'Хүргэлтийн нөхцөл ороогүй байна.',about_title:'Бидний тухай',about_text:'',returns_title:'Буцаалтын нөхцөл',returns_text:'Буцаалтын нөхцөл ороогүй байна.'},
 checkout:{enabled:false,title:'Захиалга илгээх',message:'Захиалга хүлээн авах тохиргоо одоогоор хийгдээгүй байна. Холбоо барих мэдээллээр лавлаарай.',delivery_fee:0},
 theme:{primary:'#5433eb',ink:'#242328',background:'#ffffff',card_radius:22}
};
const text=(key,label,type='text')=>({key,label,type});
const list=(key,label,fields)=>({key,label,type:'list',fields});
const actions='action',photo='image',toggle='checkbox';
window.ContentSections=[
{key:'brand',label:'Лого, дэлгүүрийн нэр',fields:[text('name','Дэлгүүрийн нэр'),text('tagline','Логоны доорх тайлбар'),text('logo','Лого зураг',photo),text('search_placeholder','Хайлтын талбарын тайлбар')]},
{key:'announcement',label:'Дээд гүйдэг мэдээлэл',fields:[text('visible','Харуулах',toggle),list('messages','Гүйдэг мэдээллүүд',[text('text','Текст'),text('target','Дарахад нээгдэх хэсэг',actions)])]},
{key:'navigation',label:'Үндсэн цэс',fields:[list('items','Цэсний товчнууд',[text('label','Товчны нэр'),text('target','Нээгдэх хэсэг',actions)]),text('right_text','Баруун талын тайлбар')]},
{key:'hero',label:'Нүүрний баннер',fields:[text('visible','Харуулах',toggle),list('slides','Баннерууд',[text('eyebrow','Жижиг гарчиг'),text('title','Үндсэн гарчиг'),text('accent','Өнгөт гарчиг'),text('description','Тайлбар','textarea'),text('button','Товчны текст'),text('target','Товчны үйлдэл',actions),text('image1','Эхний зураг',photo),text('image2','Хоёр дахь зураг',photo),text('label1','Эхний жижиг картын гарчиг'),text('caption1','Эхний жижиг картын тайлбар'),text('label2','Хоёр дахь жижиг картын гарчиг'),text('caption2','Хоёр дахь жижиг картын тайлбар'),text('background','Арын өнгө','color')])]},
{key:'benefits',label:'Давуу талын картууд',fields:[text('visible','Харуулах',toggle),list('items','Картууд',[text('icon','Дүрс','icon'),text('title','Гарчиг'),text('subtitle','Тайлбар'),text('target','Үйлдэл',actions)])]},
{key:'categories',label:'Ангиллын картууд',fields:[text('visible','Харуулах',toggle),text('title','Гарчиг'),text('subtitle','Тайлбар'),text('link_text','Бүх бараа товчны текст'),list('items','Ангиллууд',[text('title','Ангиллын нэр'),text('subtitle','Тайлбар'),text('image','Зураг',photo),text('target','Шүүлтүүр',actions),text('background','Арын өнгө','color'),text('visible','Харуулах',toggle)])]},
{key:'catalog',label:'Бүтээгдэхүүний хэсэг',fields:[text('visible','Харуулах',toggle),text('title','Гарчиг'),text('subtitle','Тайлбар'),text('new_title','Шинэ барааны гарчиг'),text('sale_title','Хямдралын гарчиг'),text('page_size','Нэг удаа харагдах тоо','number'),text('show_source','Барааны эх сурвалжийн холбоос харуулах',toggle)]},
{key:'promotion',label:'Доод баннер',fields:[text('visible','Харуулах',toggle),text('title','Гарчиг'),text('description','Тайлбар'),text('button','Товчны текст'),text('target','Үйлдэл',actions),text('background','Арын өнгө','color')]},
{key:'footer',label:'Footer, холбоо барих',fields:[text('description','Дэлгүүрийн танилцуулга','textarea'),text('copyright','Доод мөр'),text('contact_label','Холбоо барих товчны нэр'),text('phone','Утас'),text('email','И-мэйл','email'),text('address','Хаяг','textarea'),text('hours','Ажиллах цаг'),text('facebook','Facebook холбоос','url'),text('instagram','Instagram холбоос','url'),text('notice','Нэмэлт тайлбар','textarea')]},
{key:'policies',label:'Хүргэлт, буцаалт, тухай',fields:[text('delivery_title','Хүргэлтийн гарчиг'),text('delivery_text','Хүргэлтийн нөхцөл','textarea'),text('about_title','Бидний тухай гарчиг'),text('about_text','Бидний тухай','textarea'),text('returns_title','Буцаалтын гарчиг'),text('returns_text','Буцаалтын нөхцөл','textarea')]},
{key:'checkout',label:'Захиалгын тохиргоо',fields:[text('enabled','Бодит захиалга хүлээн авах',toggle),text('title','Захиалгын гарчиг'),text('message','Захиалга хаалттай үеийн тайлбар','textarea'),text('delivery_fee','Хүргэлтийн төлбөр, ₮','number')]},
{key:'theme',label:'Өнгө, харагдац',fields:[text('primary','Үндсэн өнгө','color'),text('ink','Текстийн өнгө','color'),text('background','Хуудасны дэвсгэр','color'),text('card_radius','Картын булан, px','number')]}
];
function clone(v){return JSON.parse(JSON.stringify(v))}
function merge(a,b){if(Array.isArray(a))return Array.isArray(b)?clone(b):clone(a);if(a&&typeof a==='object'){const result={};for(const k of Object.keys(a))result[k]=merge(a[k],b?.[k]);return result}return b===undefined||b===null?a:b}
function fromSettings(s={}){const value=merge(D,s.site_content);if(!s.site_content){value.brand.name=s.store_name||value.brand.name;value.policies.delivery_text=s.delivery_text||value.policies.delivery_text;if(s.ticker_text)value.announcement.messages[0].text=s.ticker_text}return value}
window.ShopContent={defaults:D,clone,merge,fromSettings};
})();
