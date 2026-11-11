'use strict';
/** Maestro Salon — responsive, zero-dependency interactive demonstration. */
const CONFIG = {
  // Enter an official, confirmed WhatsApp number in international format, e.g. '91XXXXXXXXXX'.
  whatsappNumber: '',
  demoMode: true,
};
const $=(s,root=document)=>root.querySelector(s);
const $$=(s,root=document)=>[...root.querySelectorAll(s)];
const paths={
  calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/>',
  menu:'<path d="M4 7h16M4 12h16M4 17h16"/>',
  pause:'<rect x="5" y="4" width="5" height="16" rx="1"/><rect x="14" y="4" width="5" height="16" rx="1"/>',
  play:'<path d="m8 5 11 7-11 7z"/>',
  scissors:'<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="m8.1 8.1 12 12M14 10 20 4M14 14l6 6"/>',
  leaf:'<path d="M20 4C9 4 4 10 4 17a3 3 0 0 0 3 3c7 0 13-5 13-16Z"/><path d="M6 18c4-5 7-8 12-11"/>',
  crown:'<path d="m2 7 5 5 5-8 5 8 5-5-2 13H4L2 7Z"/><path d="M4 20h16"/>',
  coffee:'<path d="M4 8h14v6a7 7 0 0 1-14 0V8Zm14 1h2a3 3 0 0 1 0 6h-2M2 22h20M8 2v3M13 2v3"/>',
  gem:'<path d="m6 3-4 6 10 12L22 9l-4-6H6ZM2 9h20M8 3l4 18L16 3"/>',
  heart:'<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0l-1 1-1-1a5.5 5.5 0 0 0-7.8 7.8L12 22l8.8-9.6a5.5 5.5 0 0 0 0-7.8Z"/>',
  shield:'<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/>',
  sparkles:'<path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3ZM19 17l.7 2.3L22 20l-2.3.7L19 23l-.7-2.3L16 20l2.3-.7L19 17Z"/>',
  navigation:'<path d="m3 11 19-9-9 19-2-8-8-2Z"/>',
  'message-circle':'<path d="M21 11.5a8.4 8.4 0 0 1-1.5 4.8A9 9 0 0 1 12 20a8.4 8.4 0 0 1-4.8-1.5L2 20l1.5-5.2A8.4 8.4 0 0 1 2 10a9 9 0 0 1 3.7-7.5A8.4 8.4 0 0 1 10.5 1H12a9 9 0 0 1 9 9v1.5Z"/>',
  whatsapp:'<path d="M20.5 3.5A11.4 11.4 0 0 0 2.6 17.2l-1.1 5.3 5.4-1.4A11.4 11.4 0 1 0 20.5 3.5Z"/><path d="M8 7.2c-.3-.4-.7-.4-1-.4h-.8c-.3 0-.7.2-1 .6-.4.4-1.2 1.3-1.2 3s1.2 3.2 1.4 3.4c.2.2 2.4 3.8 6 5.1 3 .9 3.6.7 4.3.6.7-.1 2-.9 2.3-1.7.3-.8.3-1.5.2-1.7-.1-.2-.3-.3-.7-.5l-2-.9c-.3-.1-.5-.2-.7.2-.2.4-.8 1-1 1.2-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.2-.7.2-.2.4-.4.5-.6.2-.2.2-.3.3-.5.1-.2 0-.4 0-.5L8.5 7.7c-.2-.3-.3-.4-.5-.5Z"/>',
};
function icon(name){return `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${paths[name]||paths.sparkles}</svg>`}
$$('[data-icon]').forEach(el=>el.innerHTML=icon(el.dataset.icon));
const services=[{id:'hair-spa',name:'Hair Treatment',category:'Hair & Styling',duration:'60–90 minutes',price:'From ₹1,899'},{id:'hair-colour',name:"Women's Styling",category:'Hair & Styling',duration:'90–150 minutes',price:'From ₹2,499'},{id:'mens-cut',name:"Men's Haircut",category:'Men’s Grooming',duration:'40–50 minutes',price:'From ₹699'},{id:'facial',name:'Facial Care',category:'Skin & Facials',duration:'60 minutes',price:'From ₹1,499'},{id:'bridal',name:'Bridal Services',category:'Bridal',duration:'2–4 hours',price:'From ₹9,999'}];
// Coordinates for supplied map links are exact places; other entries use approximate area centres.
const branches=[
 {id:'gtb',name:'GTB Nagar',area:'North Delhi',query:'Maestro Salon GTB Nagar Delhi',coords:[28.6988,77.2090],image:'salon-interior'},
 {id:'punjabi-bagh',name:'Punjabi Bagh - East Avenue Market',area:'East Punjabi Bagh',query:'Maestro Unisex Salon, Plot No. 8, near Syndicate Bank, East Avenue Market, Punjabi Bagh Cooperative Housing Society, East Punjabi Bagh, Punjabi Bagh, New Delhi, Delhi 110026',coords:[28.6693934,77.1427945],mapUrl:'https://maps.app.goo.gl/2JPhBau1UNoACQxT6',address:'Plot No. 8, near Syndicate Bank, East Avenue Market, Punjabi Bagh Cooperative Housing Society, East Punjabi Bagh, New Delhi, Delhi 110026',image:'salon-interior'},
 {id:'west-patel',name:'Maestro Unisex Salon',area:'West Patel Nagar',query:'Maestro Unisex Salon, B-81/83, near Gopal Dawakhana, West Patel Nagar, New Delhi, Delhi 110008',coords:[28.6509726,77.1649374],mapUrl:'https://maps.app.goo.gl/7eLfVtXocV2C6aBV6',address:'B-81/83, near Gopal Dawakhana, West Patel Nagar, New Delhi, Delhi 110008',image:'salon-interior'},
 {id:'pitampura',name:'Pitampura',area:'North West Delhi',query:'Maestro Salon Pitampura Delhi',coords:[28.7041,77.1317],image:'ref-interior'},
 {id:'moti',name:'New Moti Nagar',area:'West Delhi',query:'Maestro Salon New Moti Nagar Delhi',coords:[28.6569,77.1360],image:'salon-interior'},
 {id:'saraswati',name:'Saraswati Garden',area:'West Delhi',query:'Maestro Unisex Salon in Saraswati Garden, E-10, Block E, Saraswati Garden, Kirti Nagar, New Delhi, Delhi 110015',coords:[28.6446556,77.1363821],mapUrl:'https://maps.app.goo.gl/jpJiB7Z2rauWizG98',address:'E-10, Block E, Saraswati Garden, Kirti Nagar, New Delhi, Delhi 110015',image:'ref-interior'},
];
const safe=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let toastTimeout;
function toast(message){const box=$('#toast');box.textContent=message;box.classList.add('show');clearTimeout(toastTimeout);toastTimeout=setTimeout(()=>box.classList.remove('show'),4100)}
// Responsive navigation
$('#menuToggle').addEventListener('click',()=>{
 const nav=$('#mobileMenu'),open=nav.hidden;nav.hidden=!open;$('#menuToggle').setAttribute('aria-expanded',String(open));$('#menuToggle').setAttribute('aria-label',open?'Close navigation':'Open navigation');
});
// Modal management, escape and backdrop clicks.
let lastFocused=null;
function openModal(id){lastFocused=document.activeElement;const el=document.getElementById(id);el.hidden=false;document.body.style.overflow='hidden';setTimeout(()=>{(el.querySelector('.dialog-close')||el).focus()},25)}
function closeModal(id){const el=document.getElementById(id);if(!el)return;el.hidden=true;if(id==='mapModal')$('#mapFrame').src='about:blank';if(!$$('.modal-backdrop:not([hidden])').length)document.body.style.overflow='';lastFocused?.focus?.()}
$$('[data-close]').forEach(b=>b.addEventListener('click',()=>closeModal(b.dataset.close)));
$$('.modal-backdrop').forEach(back=>back.addEventListener('click',e=>{if(e.target===back)closeModal(back.id)}));
document.addEventListener('keydown',e=>{
 if(e.key==='Escape')$$('.modal-backdrop:not([hidden])').forEach(el=>closeModal(el.id));
 if(e.key==='Tab'){
   const modal=$('.modal-backdrop:not([hidden])');if(!modal)return;
   const fields=$$('button:not(:disabled),a[href],input:not(:disabled),select:not(:disabled),textarea:not(:disabled),[tabindex="0"]',modal).filter(el=>el.getClientRects().length);
   if(!fields.length)return;const first=fields[0],last=fields[fields.length-1];
   if(e.shiftKey && document.activeElement===first){last.focus();e.preventDefault()}
   if(!e.shiftKey && document.activeElement===last){first.focus();e.preventDefault()}
 }
});
// Category cards: filter rituals and jump to results
function filterRituals(category){
 $$('#serviceTabs [data-filter]').forEach(b=>{const yes=b.dataset.filter===category;b.classList.toggle('active',yes);b.setAttribute('aria-pressed',String(yes))});
 $$('.ritual-card').forEach(c=>c.hidden=category!=='all'&&c.dataset.type!==category);
}
$$('#serviceTabs [data-filter]').forEach(b=>b.addEventListener('click',()=>filterRituals(b.dataset.filter)));
$$('[data-category]').forEach(b=>b.addEventListener('click',()=>{filterRituals(b.dataset.category);$('#rituals').scrollIntoView({behavior:'smooth',block:'start'});toast('Showing '+b.querySelector('.cat-label strong').textContent.replace(/\s+/g,' ').trim()+' rituals')}));
// Before/after compare
const compare=$('#comparison'),before=$('#compareBefore'),line=$('#compareLine');
let pointerActive=false;
function setComparison(percent){percent=Math.max(0,Math.min(100,percent));before.style.width=percent+'%';line.style.left=percent+'%';const photo=$('.compare-before',compare);if(photo)photo.style.width=compare.clientWidth+'px';compare.setAttribute('aria-valuenow',String(Math.round(percent)))}
window.addEventListener('resize',()=>setComparison(Number(compare.getAttribute('aria-valuenow')||50)));
setComparison(50);
function slideFromEvent(e){const r=compare.getBoundingClientRect();setComparison((e.clientX-r.left)/r.width*100)}
compare.addEventListener('pointerdown',e=>{pointerActive=true;compare.setPointerCapture(e.pointerId);slideFromEvent(e)});
compare.addEventListener('pointermove',e=>{if(pointerActive)slideFromEvent(e)});
compare.addEventListener('pointerup',()=>pointerActive=false);
compare.addEventListener('pointercancel',()=>pointerActive=false);
compare.addEventListener('keydown',e=>{let n=Number(compare.getAttribute('aria-valuenow'));if(e.key==='ArrowLeft')n-=5;else if(e.key==='ArrowRight')n+=5;else if(e.key==='Home')n=0;else if(e.key==='End')n=100;else return;e.preventDefault();setComparison(n)});
// Gallery lightbox
$$('.gallery-item').forEach(item=>item.addEventListener('click',()=>{const img=$('img',item);$('#galleryLarge').src=img.src;$('#galleryLarge').alt=img.alt;openModal('galleryModal')}));
const galleryItems=$$('.gallery-item',$('#galleryGrid'));
const galleryToggle=$('#galleryToggle');
galleryToggle.addEventListener('click',()=>{
 const expanded=galleryToggle.getAttribute('aria-expanded')==='true';
 galleryItems.slice(5).forEach(item=>{item.hidden=expanded});
 galleryToggle.setAttribute('aria-expanded',String(!expanded));
 galleryToggle.innerHTML=expanded?'Explore Looks <span aria-hidden="true">↓</span>':'Show Fewer Looks <span aria-hidden="true">↑</span>';
});
// Reviews — quotations are clearly marked design examples, not customer reviews.
const quotes=[
 {text:'A great salon visit feels personal—someone listens, understands your style and helps you leave feeling like yourself.',author:'The Maestro Feeling',photo:'hair-model'},
 {text:'Good hair days begin with thoughtful care, the right consultation and a moment of calm.',author:'The Hair Ritual',photo:'hero-styling'},
 {text:'Your beauty ritual is about you: your comfort, your confidence and your individual style.',author:'Your Signature Style',photo:'stylist-anika'}
];let quoteIndex=0;
function showQuote(){const q=quotes[quoteIndex];$('#quoteText').textContent=q.text;$('#quoteAuthor').textContent=q.author;$('#quoteAvatar').src='assets/images/'+q.photo+'.webp'}
$('#nextQuote').addEventListener('click',()=>{quoteIndex=(quoteIndex+1)%quotes.length;showQuote()});
$('#prevQuote').addEventListener('click',()=>{quoteIndex=(quoteIndex+quotes.length-1)%quotes.length;showQuote()});
// Location data and accurate behaviour: area searches only (not official business claims).
let sortedBranches=[...branches];
let showAllSalonAreas=false;
function branchCard(b,approx){return `<article class="location-card"><div class="location-photo"><img src="assets/images/${b.image}.webp" alt="Illustrative salon interior for ${safe(b.name)} area" loading="lazy"></div><div class="location-details"><h3>${safe(b.name)}</h3><p class="locality">⌖ ${safe(b.area)}, Delhi</p><p class="verification">${approx?'Approx. area distance: '+approx.toFixed(1)+' km · ':''}${b.address?safe(b.address):'Exact address &amp; ownership to verify'}</p><div class="location-actions"><button type="button" data-map="${b.id}" aria-label="View area on map"><span class="location-map-label">View area on map</span><span class="location-map-label-short" aria-hidden="true">View map</span><span class="location-map-icon" aria-hidden="true">↗</span></button><button type="button" class="js-book" data-branch="${b.id}">Enquire / Book</button></div></div></article>`}
function renderBranches(distances){$('#locationGrid').innerHTML=(showAllSalonAreas?sortedBranches:sortedBranches.slice(0,3)).map(b=>branchCard(b,distances?.[b.id])).join('');$('#showAllLocations').setAttribute('aria-expanded',String(showAllSalonAreas));$('#showAllLocations').innerHTML=showAllSalonAreas?'Show featured areas <span aria-hidden="true">↑</span>':'Explore all salon areas <span aria-hidden="true">→</span>'}
renderBranches();
$('#showAllLocations').addEventListener('click',()=>{showAllSalonAreas=!showAllSalonAreas;renderBranches()});
function showMap(id){const b=branches.find(x=>x.id===id);if(!b)return;
 $('#mapTitle').innerHTML='Explore <em>'+safe(b.name)+'</em>';
 $('#mapAddress').textContent=b.address||b.area+', Delhi · Search for matching salon listings; exact official location is not confirmed.';
 $('#mapFrame').src=b.mapUrl?'https://www.google.com/maps?q='+encodeURIComponent(b.coords.join(','))+'&z=16&output=embed':'https://www.google.com/maps?q='+encodeURIComponent(b.query)+'&output=embed';
 $('#mapOpen').href=b.mapUrl||'https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(b.query);
 $('#mapOpen').textContent=b.mapUrl?'Open exact location ↗':'Search on Google Maps ↗';
 $('#mapNotice').textContent=b.mapUrl?'Google Maps pin provided for this listing; confirm current business details before visiting.':'Area search only; the exact salon address has not been confirmed.';
 $('#mapBook').dataset.branch=b.id;openModal('mapModal');
}
$('#locationGrid').addEventListener('click',e=>{const map=e.target.closest('[data-map]');if(map)showMap(map.dataset.map)});
const haversine=(lat1,lon1,lat2,lon2)=>{const R=6371,rad=Math.PI/180,dlat=(lat2-lat1)*rad,dlon=(lon2-lon1)*rad;const a=Math.sin(dlat/2)**2+Math.cos(lat1*rad)*Math.cos(lat2*rad)*Math.sin(dlon/2)**2;return 2*R*Math.asin(Math.sqrt(a))};
$('#nearestBtn').addEventListener('click',()=>{
 if(!navigator.geolocation){toast('Location is unavailable; explore the area listings below.');return}
 $('#nearestBtn').disabled=true;toast('Checking your location permission…');
 navigator.geolocation.getCurrentPosition(pos=>{
   const distances={};for(const b of branches)distances[b.id]=haversine(pos.coords.latitude,pos.coords.longitude,...b.coords);
   sortedBranches=[...branches].sort((a,b)=>distances[a.id]-distances[b.id]);showAllSalonAreas=true;renderBranches(distances);
   $('#locationNotice').textContent='Sorted by approximate locality-centre straight-line distance—not actual salon distance or travel time. Verify official locations before visiting.';
   toast('Areas sorted by approximate distance.');$('#nearestBtn').disabled=false;
 },()=>{toast('Location not shared. You can still explore all listed areas.');$('#nearestBtn').disabled=false},{enableHighAccuracy:false,timeout:9000,maximumAge:60000});
});
// Multi-step, local-only booking demo. Never fake actual appointment confirmation.
let bookingStep=1;
let booking={service:'',stylist:'Any available stylist',branch:'',date:'',time:'',name:'',phone:'',email:'',notes:''};
function indiaToday(){return new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Kolkata',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date())}
const timeSlots=['10:00 AM','11:00 AM','12:00 PM','01:00 PM','02:00 PM','03:00 PM','04:00 PM','05:00 PM','06:00 PM'];
function openBooking({service='',branch='',stylist=''}={}){
 const b=branches.find(x=>x.id===branch);if(service)booking.service=service;if(b)booking.branch=branch;if(stylist)booking.stylist=stylist;
 bookingStep=1;renderBooking();if(!$('#mapModal').hidden)closeModal('mapModal');openModal('bookingModal');
}
document.addEventListener('click',e=>{const b=e.target.closest('.js-book');if(b && !b.closest('#bookingModal')){e.preventDefault();openBooking({service:b.dataset.service,branch:b.dataset.branch,stylist:b.dataset.stylist})}});
function opts(items,value){return items.map(i=>`<option value="${safe(i.value)}"${i.value===value?' selected':''}>${safe(i.label)}</option>`).join('')}
function renderBooking(){const dots=$$('#stepDots span');dots.forEach((d,i)=>{d.classList.toggle('active',i===bookingStep-1);d.classList.toggle('completed',i<bookingStep-1)});
 const body=$('#bookingBody');$('#bookingBack').style.visibility=bookingStep===1||bookingStep===5?'hidden':'visible';$('#bookingNext').style.display=bookingStep===5?'none':'inline-flex';$('#bookingNext').textContent=bookingStep===4?'Save Demo Request':'Continue →';
 if(bookingStep===1){body.innerHTML=`<h3>Choose Your Ritual</h3><div class="form-grid"><label class="field full">Service <select id="bookService"><option value="">Select a service</option>${opts(services.map(s=>({value:s.id,label:s.name+' · '+s.price})),booking.service)}</select></label><label class="field">Preferred salon area <select id="bookBranch"><option value="">Select an area</option>${opts(branches.map(b=>({value:b.id,label:b.name+', Delhi'})),booking.branch)}</select></label><label class="field">Preferred stylist <select id="bookStylist">${opts([{value:'Any available stylist',label:'Any available stylist'},...['Aarav','Anika','Riya','Kabir'].map(x=>({value:x,label:x+' (demo profile)'}))],booking.stylist)}</select></label></div><p class="fineprint">Branch areas, stylist profiles and prices are illustrative. This form saves locally; it does not contact a salon.</p>`;}
 else if(bookingStep===2){body.innerHTML=`<h3>Pick a Date &amp; Time</h3><div class="form-grid"><label class="field full">Preferred date <input id="bookDate" type="date" min="${indiaToday()}" value="${safe(booking.date)}"></label></div><p class="fineprint">Time slots are preference options only, not live availability.</p><div class="slot-grid">${timeSlots.map(t=>`<button type="button" class="slot${booking.time===t?' active':''}" data-slot="${t}">${t}</button>`).join('')}</div>`;$$('[data-slot]',body).forEach(b=>b.addEventListener('click',()=>{booking.time=b.dataset.slot;$$('[data-slot]',body).forEach(x=>x.classList.toggle('active',x===b))}));}
 else if(bookingStep===3){body.innerHTML=`<h3>Your Details</h3><div class="form-grid"><label class="field">Full name <input id="bookName" maxlength="80" autocomplete="name" placeholder="Your name" value="${safe(booking.name)}"></label><label class="field">Mobile number <input id="bookPhone" inputmode="tel" autocomplete="tel" maxlength="15" placeholder="10-digit mobile number" value="${safe(booking.phone)}"></label><label class="field full">Email (optional) <input id="bookEmail" type="email" maxlength="150" autocomplete="email" placeholder="you@example.com" value="${safe(booking.email)}"></label><label class="field full">Notes (optional) <textarea id="bookNotes" maxlength="500" placeholder="Anything you'd like the salon to know">${safe(booking.notes)}</textarea></label></div>`;}
 else if(bookingStep===4){const s=services.find(s=>s.id===booking.service),b=branches.find(b=>b.id===booking.branch);body.innerHTML=`<h3>Review Your Request</h3><div class="summary-list">${[['Service',s?.name||'—'],['Price indication',s?.price||'—'],['Salon area',b?.name||'—'],['Stylist preference',booking.stylist],['Preferred date',booking.date],['Preferred time',booking.time],['Name',booking.name],['Phone',booking.phone]].map(a=>`<div class="summary-row"><small>${safe(a[0])}</small><b>${safe(a[1])}</b></div>`).join('')}</div><p class="fineprint">Submitting only saves a demo request on this device. No salon receives this information; no appointment is confirmed.</p>`;}
 else if(bookingStep===5){body.innerHTML=`<div class="success-state"><span class="success-icon">✓</span><h3>Demo Request Saved</h3><p>Your preferences were stored in this browser. This is <strong>not a confirmed salon booking</strong>; please contact the salon directly when verified contact details are available.</p><p>Local reference: <code>${safe(booking.reference||'DEMO')}</code></p><button type="button" class="btn btn-outline-wine" id="finishBooking">Close &amp; Explore</button></div>`;$('#finishBooking').addEventListener('click',()=>closeModal('bookingModal'))}
}
function readStep(){if(bookingStep===1){booking.service=$('#bookService').value;booking.branch=$('#bookBranch').value;booking.stylist=$('#bookStylist').value}
 else if(bookingStep===2)booking.date=$('#bookDate').value;
 else if(bookingStep===3){booking.name=$('#bookName').value.trim();booking.phone=$('#bookPhone').value.trim();booking.email=$('#bookEmail').value.trim();booking.notes=$('#bookNotes').value.trim()}}
function validStep(){if(bookingStep===1){if(!booking.service||!booking.branch){toast('Please select both a service and a salon area.');return false}}
 if(bookingStep===2){if(!booking.date||!booking.time){toast('Choose your preferred date and time.');return false}if(booking.date<indiaToday()){toast('Please select today or a future date.');return false}}
 if(bookingStep===3){if(booking.name.length<2){toast('Please enter your full name.');return false}if(!/^[6-9]\d{9}$/.test((()=>{const digits=booking.phone.replace(/\D/g,'');return digits.length===12 && digits.startsWith('91')?digits.slice(2):digits})())){toast('Please enter a valid 10-digit Indian mobile number.');return false}if(booking.email&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(booking.email)){toast('Please enter a valid email address.');return false}}
 return true}
$('#bookingNext').addEventListener('click',()=>{readStep();if(!validStep())return;if(bookingStep===4){const ref='DEMO-'+Date.now().toString(36).toUpperCase();booking.reference=ref;const existing=JSON.parse(localStorage.getItem('maestro_demo_requests')||'[]');existing.push({...booking,createdAt:new Date().toISOString(),status:'local_demo_only'});localStorage.setItem('maestro_demo_requests',JSON.stringify(existing));bookingStep=5;renderBooking();toast('Demo request stored on this device only.');return}bookingStep++;renderBooking()});
$('#bookingBack').addEventListener('click',()=>{readStep();bookingStep=Math.max(1,bookingStep-1);renderBooking()});
// WhatsApp: real share flow, no invented WhatsApp number.
$('#whatsappFloat').addEventListener('click',()=>openModal('whatsappModal'));
$('#copyWhatsapp').addEventListener('click',async()=>{const msg=$('#whatsMessage').value;try{await navigator.clipboard.writeText(msg);toast('Message copied.')}catch{const t=$('#whatsMessage');t.select();document.execCommand('copy');toast('Message selected for copying.')}});
$('#shareWhatsapp').addEventListener('click',()=>{const msg=$('#whatsMessage').value.trim();if(!msg){toast('Please enter a message.');return}const url=CONFIG.whatsappNumber?'https://wa.me/'+CONFIG.whatsappNumber.replace(/\D/g,'')+'?text='+encodeURIComponent(msg):'https://api.whatsapp.com/send?text='+encodeURIComponent(msg);window.open(url,'_blank','noopener,noreferrer');if(!CONFIG.whatsappNumber)toast('WhatsApp share opened; no salon number configured.')});
$$('[data-social]').forEach(b=>b.addEventListener('click',()=>toast(b.dataset.social+' profile link is not configured in this demo.')));
// Guard accidental navigation to nonexistent pages when opening through static-file mode.
// server.js already redirects non-asset routes to the homepage.
console.info('Maestro Salon: interactive demo loaded. Bookings are saved locally only.');
