const $=id=>document.getElementById(id);
const STORE="world_command_save_v1";
const nations=[
 {id:"USA",name:"ایالات متحده",flag:"🇺🇸",lat:39.5,lng:-98.35,region:"آمریکای شمالی",power:96,pop:"334M"},
 {id:"CAN",name:"کانادا",flag:"🇨🇦",lat:56.1,lng:-106.3,region:"آمریکای شمالی",power:77,pop:"40M"},
 {id:"MEX",name:"مکزیک",flag:"🇲🇽",lat:23.6,lng:-102.5,region:"آمریکای شمالی",power:61,pop:"129M"},
 {id:"BRA",name:"برزیل",flag:"🇧🇷",lat:-10.8,lng:-52.9,region:"آمریکای جنوبی",power:70,pop:"216M"},
 {id:"ARG",name:"آرژانتین",flag:"🇦🇷",lat:-38.4,lng:-63.6,region:"آمریکای جنوبی",power:54,pop:"46M"},
 {id:"GBR",name:"بریتانیا",flag:"🇬🇧",lat:55.3,lng:-3.4,region:"اروپا",power:78,pop:"68M"},
 {id:"FRA",name:"فرانسه",flag:"🇫🇷",lat:46.2,lng:2.2,region:"اروپا",power:79,pop:"68M"},
 {id:"DEU",name:"آلمان",flag:"🇩🇪",lat:51.1,lng:10.4,region:"اروپا",power:84,pop:"84M"},
 {id:"RUS",name:"روسیه",flag:"🇷🇺",lat:61.5,lng:105.3,region:"اوراسیا",power:88,pop:"144M"},
 {id:"TUR",name:"ترکیه",flag:"🇹🇷",lat:39,lng:35,region:"اوراسیا",power:69,pop:"85M"},
 {id:"IRN",name:"ایران",flag:"🇮🇷",lat:32.4,lng:53.7,region:"خاورمیانه",power:67,pop:"89M"},
 {id:"SAU",name:"عربستان سعودی",flag:"🇸🇦",lat:23.9,lng:45.1,region:"خاورمیانه",power:64,pop:"37M"},
 {id:"EGY",name:"مصر",flag:"🇪🇬",lat:26.8,lng:30.8,region:"آفریقا",power:58,pop:"112M"},
 {id:"ZAF",name:"آفریقای جنوبی",flag:"🇿🇦",lat:-29,lng:24,region:"آفریقا",power:54,pop:"60M"},
 {id:"IND",name:"هند",flag:"🇮🇳",lat:21,lng:78,region:"آسیا",power:86,pop:"1.43B"},
 {id:"CHN",name:"چین",flag:"🇨🇳",lat:35.8,lng:103,region:"آسیا",power:98,pop:"1.41B"},
 {id:"JPN",name:"ژاپن",flag:"🇯🇵",lat:36.2,lng:138.2,region:"آسیا",power:82,pop:"124M"},
 {id:"KOR",name:"کره جنوبی",flag:"🇰🇷",lat:36.3,lng:127.8,region:"آسیا",power:76,pop:"52M"},
 {id:"IDN",name:"اندونزی",flag:"🇮🇩",lat:-2,lng:118,region:"آسیا",power:62,pop:"277M"},
 {id:"AUS",name:"استرالیا",flag:"🇦🇺",lat:-25,lng:133,region:"اقیانوسیه",power:74,pop:"27M"}
];
const buildings=[
 {id:"factory",name:"کارخانه صنعتی",icon:"🏭",cost:3200,days:2,desc:"درآمد و ظرفیت تولید را افزایش می‌دهد.",effect:"industry",value:2},
 {id:"port",name:"بندر تجاری",icon:"⚓",cost:2600,days:2,desc:"سود مسیرهای دریایی و تجارت را بیشتر می‌کند.",effect:"trade",value:1},
 {id:"airport",name:"فرودگاه بین‌المللی",icon:"🛫",cost:4100,days:3,desc:"مسیرهای هوایی و جابه‌جایی را تقویت می‌کند.",effect:"air",value:1},
 {id:"missile",name:"مرکز دفاع موشکی",icon:"🛡️",cost:5200,days:4,desc:"شاخص دفاع و احتمال رهگیری در شبیه‌سازی را بالا می‌برد.",effect:"defense",value:5},
 {id:"research",name:"مرکز پژوهش",icon:"🔬",cost:3600,days:3,desc:"تولید امتیاز پژوهش روزانه را افزایش می‌دهد.",effect:"research",value:2},
 {id:"shipyard",name:"کارخانه کشتی‌سازی",icon:"🚢",cost:4700,days:4,desc:"ظرفیت ناوگان و تجارت دریایی را افزایش می‌دهد.",effect:"navy",value:1},
 {id:"radar",name:"شبکه راداری",icon:"📡",cost:2900,days:2,desc:"آگاهی موقعیتی و هشدار رویدادهای هوایی را تقویت می‌کند.",effect:"intel",value:3},
 {id:"housing",name:"شهرک مسکونی",icon:"🏙️",cost:2200,days:2,desc:"ثبات و رشد جمعیت را بهبود می‌دهد.",effect:"stability",value:3}
];
const techs=[
 {id:"logistics",name:"لجستیک پیشرفته",icon:"📦",cost:80,desc:"هزینه حرکت و پشتیبانی را کاهش می‌دهد.",done:false},
 {id:"autonomy",name:"سامانه‌های خودکار",icon:"🧠",cost:120,desc:"کارایی تولید و واکنش هوش مصنوعی را بهبود می‌دهد.",done:false},
 {id:"clean",name:"انرژی نسل جدید",icon:"⚡",cost:90,desc:"درآمد انرژی و تاب‌آوری اقتصادی را بالا می‌برد.",done:false},
 {id:"aegis",name:"چتر دفاعی یکپارچه",icon:"🛡️",cost:150,desc:"شاخص دفاع انتزاعی در برابر رویدادهای تهدید را افزایش می‌دهد.",done:false},
 {id:"tradeAI",name:"بازار هوشمند",icon:"📈",cost:100,desc:"درآمد مسیرهای تجاری را افزایش می‌دهد.",done:false},
 {id:"satellite",name:"شبکه ماهواره‌ای",icon:"🛰️",cost:130,desc:"دید نقشه و اطلاعات راهبردی را تقویت می‌کند.",done:false}
];
const tradeKinds=[
 {id:"sea",name:"مسیر دریایی",icon:"🚢",cost:900,profit:520,desc:"مسیر تجاری بین بندرها؛ درآمد پایدار و ظرفیت بالا."},
 {id:"air",name:"مسیر هوایی",icon:"✈️",cost:1300,profit:680,desc:"محموله سریع و ارزشمند؛ هزینه بیشتر و سود بالاتر."},
 {id:"land",name:"کریدور زمینی",icon:"🚚",cost:700,profit:390,desc:"پیوند صنعتی منطقه‌ای با هزینه نگهداری کمتر."}
];
let state, map, nationLayer, unitLayer, selectedNation=null, target=null, selectedUnitId=null, paused=false, borderLayer=null, countryGeoLayer=null, realtimeTimer=null, lastIncomeAt=0;
const COUNTRY_COLORS=["#e76f51","#2a9d8f","#e9c46a","#457b9d","#9b5de5","#f15bb5","#00bbf9","#80b918","#ff7b00","#6c757d","#c77dff","#0081a7","#f4a261","#588157","#bc6c25","#4361ee","#b56576","#219ebc","#8ac926"];
function featureCode(p){return [p.ISO_A3,p.ADM0_A3,p.iso_a3,p.SOV_A3].find(x=>x&&x!=="-99")||p.name||p.ADMIN||p.NAME;}
function colorForCode(code){if(state?.owned?.includes(code))return state.player===code?(nations.find(n=>n.id===code)?.color||"#35d5ff"):"#f7b801";let h=0;for(const c of String(code||"??"))h=(h*31+c.charCodeAt(0))>>>0;return COUNTRY_COLORS[h%COUNTRY_COLORS.length]}
function freshState(country){
 return {day:1,year:2026,player:country.id,money:25000,oil:1200,industry:12,research:40,stability:78,buildings:[],units:[
 {id:"u1",name:"گروه زمینی آلفا",kind:"land",icon:"🪖",strength:70,lat:country.lat,lng:country.lng,ready:true},
 {id:"u2",name:"اسکادران هوایی",kind:"air",icon:"✈️",strength:62,lat:country.lat+2,lng:country.lng+2,ready:true},
 {id:"u3",name:"گروه دریایی",kind:"navy",icon:"🚢",strength:65,lat:country.lat-2,lng:country.lng-3,ready:true}
 ],routes:[],relations:Object.fromEntries(nations.filter(n=>n.id!==country.id).map(n=>[n.id,0])),techs:techs.map(t=>({...t})),events:[],selectedUnit:"u1",market:101.4,owned:[country.id],finishedBuilds:[],aiTurn:0};
}
function saveState(){if(!state)return toast("هنوز بازی شروع نشده است");state.selectedUnit=selectedUnitId;localStorage.setItem(STORE,JSON.stringify(state));toast("بازی ذخیره شد")}
function loadState(){try{return JSON.parse(localStorage.getItem(STORE)||"null")}catch{return null}}
function startMenu(){ $("mainMenu").classList.remove("hidden");$("game").classList.add("hidden");$("countryPick").classList.add("hidden");}
function chooseCountry(){
 const picker=$("countryPick"), choices=$("countryChoices");
 if(!picker||!choices){alert("صفحه انتخاب کشور پیدا نشد. لطفاً فایل کامل بازی را دوباره بارگذاری کن.");return}
 choices.innerHTML=nations.map(n=>`<button class="country-choice" data-id="${n.id}"><span>${n.flag}</span><b>${n.name}</b><small>${n.region} · قدرت ${n.power}</small></button>`).join("");
 picker.classList.remove("hidden"); picker.style.display="grid"; selectedNation=null; $("beginNation").disabled=true;
 choices.querySelectorAll("button").forEach(b=>b.onclick=()=>{selectedNation=nations.find(n=>n.id===b.dataset.id);$("countryChoices").querySelectorAll("button").forEach(x=>x.classList.toggle("selected",x===b));$("beginNation").disabled=false});
}
function beginGame(s){
 state=s; selectedUnitId=state.selectedUnit||state.units[0]?.id||null;
 $("mainMenu").classList.add("hidden");$("countryPick").classList.add("hidden");$("game").classList.remove("hidden");
 paused=false;$("pauseBtn").textContent="Ⅱ";
 if(realtimeTimer)clearInterval(realtimeTimer); lastIncomeAt=Date.now(); state.lastDayAt=Date.now(); realtimeTimer=setInterval(realtimeTick,1000);
 try { initMap(); renderAll(); logEvent("فرماندهی آغاز شد؛ زمان و اقتصاد از این لحظه به‌صورت زنده پیش می‌روند."); setTimeout(()=>{if(map)map.invalidateSize()},250); }
 catch(err){ console.error(err); toast("نقشه بارگذاری نشد؛ اینترنت و دسترسی به Leaflet را بررسی کن."); }
}
function initMap(){
 if(map){map.remove();map=null}
 map=L.map("map",{zoomControl:false,worldCopyJump:true,minZoom:2,maxZoom:12,zoomSnap:0.5,preferCanvas:true}).setView([18,8],2.5);
 L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,attribution:'© OpenStreetMap contributors'}).addTo(map);
 nationLayer=L.layerGroup().addTo(map);unitLayer=L.layerGroup().addTo(map);drawNations();drawUnits();
 // Country polygons: every country receives its own stable color; conquered countries take the player's color.
 fetch("https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson").then(r=>{if(!r.ok)throw Error("GeoJSON unavailable");return r.json()}).then(data=>{
   if(!map)return;
   if(countryGeoLayer)countryGeoLayer.remove();
   countryGeoLayer=L.geoJSON(data,{style:f=>{const p=f.properties||{},code=featureCode(p);const isOwned=state.owned.includes(code);return {color:isOwned?(nations.find(n=>n.id===code)?.color||"#35d5ff"):"#283c54",weight:isOwned?2.5:1,opacity:.95,fillColor:colorForCode(code),fillOpacity:isOwned?.62:.25}},onEachFeature:(f,layer)=>{const p=f.properties||{},code=featureCode(p);const label=p.ADMIN||p.name||p.NAME||code||"کشور";layer.bindTooltip(label,{sticky:true});layer.on("click",e=>{const n=nations.find(x=>x.id===code||x.name===label);if(n)selectNation(n);else{target={lat:e.latlng.lat,lng:e.latlng.lng};$("selectedTitle").textContent=label;$("selectedSub").textContent="منطقه انتخاب شد · برای حرکت یا عملیات از دکمه‌های پایین استفاده کن";$("selectedFlag").textContent="🌍";if(window.targetMarker)map.removeLayer(window.targetMarker);window.targetMarker=L.circleMarker(e.latlng,{radius:7,color:"#fff",fillColor:"#ffb703",fillOpacity:1,weight:2}).addTo(map)}})}}).addTo(map);
 }).catch(err=>console.warn("World borders not loaded; using map tiles.",err));
 map.on("click",e=>{target={lat:e.latlng.lat,lng:e.latlng.lng};$("selectedTitle").textContent="مقصد انتخاب شد";$("selectedSub").textContent=`${target.lat.toFixed(2)}, ${target.lng.toFixed(2)} · حرکت یا عملیات را انتخاب کن`;$ ("selectedFlag").textContent="📍";if(window.targetMarker)map.removeLayer(window.targetMarker);window.targetMarker=L.circleMarker(e.latlng,{radius:7,color:"#fff",fillColor:"#ffb703",fillOpacity:1,weight:2}).addTo(map)});
}
function realtimeTick(){
 if(!state||paused||!$("game")||$("game").classList.contains("hidden"))return;
 const now=Date.now();
 // 1 simulated day passes every 30 seconds; income and recovery happen continuously.
 if(now-lastIncomeAt>=5000){lastIncomeAt=now;state.money+=Math.max(1,Math.round(calcIncome()/12));state.oil+=Math.max(1,Math.round(state.industry/3));state.research+=state.buildings.some(b=>b.effect==="research"&&b.completed)?1:0;state.market=Math.max(80,Math.min(125,state.market+(Math.random()-.5)*.7));state.units.forEach(u=>{if(!u.ready&&u.recoverAt&&now>=u.recoverAt){u.ready=true;u.recoverAt=null;u.strength=Math.min(100,u.strength+5)}});renderHeader();}
 if(!state.lastDayAt)state.lastDayAt=now;
 if(now-state.lastDayAt>=30000){state.lastDayAt=now;state.day++;if(state.day>365){state.day=1;state.year++}state.routes.forEach(r=>state.money+=Math.round(r.profit/6));state.buildings.forEach(b=>{if(!b.completed&&state.day>=b.finish){b.completed=true;if(b.effect==="industry")state.industry+=b.value;if(b.effect==="stability")state.stability=Math.min(100,state.stability+b.value);logEvent(`ساخت «${b.name}» تکمیل شد.`)}});if(Math.random()<.12){const n=nations.filter(x=>x.id!==state.player&&!state.owned.includes(x.id))[Math.floor(Math.random()*Math.max(1,nations.filter(x=>x.id!==state.player&&!state.owned.includes(x.id)).length))];if(n&&Math.random()<.45){state.relations[n.id]=Math.max(-100,Math.min(100,(state.relations[n.id]||0)+(Math.random()>.5?3:-4)));logEvent(`کشورهای جهان در حال تغییر روابط دیپلماتیک هستند.`)}}renderAll();}
 $("turnStatus").textContent="● زمان زنده است";
}
function drawNations(){
 nationLayer.clearLayers();
 nations.forEach(n=>{
  const own=state.owned.includes(n.id), player=n.id===state.player, rel=state.relations[n.id]||0;
  const color=player?(n.color||"#35d5ff"):own?"#f7b801":(n.color||colorForCode(n.id));
  const circle=L.circleMarker([n.lat,n.lng],{radius:player?10:7,color,weight:2,fillColor:color,fillOpacity:.78}).addTo(nationLayer);
  circle.bindTooltip(`${n.flag} ${n.name}`,{direction:"top"});
  circle.on("click",()=>selectNation(n));
 });
}
function drawUnits(){
 unitLayer.clearLayers();
 state.units.forEach(u=>{
  const icon=L.divIcon({className:"unit-marker",html:`<div style="background:#0a1828eF;border:1px solid ${u.id===selectedUnitId?"#28d7df":"#55718b"};border-radius:9px;padding:5px 7px;white-space:nowrap;font:12px Tahoma;box-shadow:0 3px 12px #0008">${u.icon} <b style="color:#eef">${u.strength}</b></div>`,iconSize:[66,28],iconAnchor:[33,14]});
  const marker=L.marker([u.lat,u.lng],{icon}).addTo(unitLayer);marker.bindTooltip(u.name);
  marker.on("click",()=>{selectedUnitId=u.id;target=null;renderUnits();drawUnits();$("selectedTitle").textContent=u.name;$("selectedSub").textContent=`قدرت ${u.strength} · ${u.ready?"آماده":"در حال بازیابی"}`;$("selectedFlag").textContent=u.icon});
 });
}
function selectNation(n){
 const own=state.owned.includes(n.id),rel=state.relations[n.id]||0; $("selectedTitle").textContent=`${n.flag} ${n.name}`;$("selectedSub").textContent=`${n.region} · قدرت ${n.power} · ${own?"قلمرو تو":rel>35?"هم‌پیمان":rel< -35?"رقیب":"کشور مستقل"}`;$("selectedFlag").textContent=n.flag;
 if(map)map.setView([n.lat,n.lng],Math.max(map.getZoom(),3),{animate:true});
 showToastAction(n);
}
function showToastAction(n){const content=$("actionContent");content.innerHTML=`<p class="overline">NATION INTELLIGENCE</p><h2>${n.flag} ${n.name}</h2><p class="muted">${n.region} · جمعیت ${n.pop} · قدرت ملی ${n.power}</p><div class="stat-grid"><div class="tiny-stat"><small>رابطه با تو</small><b>${state.relations[n.id]||0}</b></div><div class="tiny-stat"><small>وضعیت</small><b>${state.owned.includes(n.id)?"قلمرو تو":(state.relations[n.id]||0)>35?"دوست":(state.relations[n.id]||0)<-35?"رقیب":"مستقل"}</b></div></div><button class="primary full" id="nationDiplomacy">گفت‌وگوی دیپلماتیک</button><button class="secondary full" id="nationFocus">تمرکز روی کشور</button>`;
 $("actionModal").classList.remove("hidden");
 $("nationDiplomacy").onclick=()=>{$("actionModal").classList.add("hidden");switchPanel("diplomacy");};
 $("nationFocus").onclick=()=>{$("actionModal").classList.add("hidden");map.setView([n.lat,n.lng],4)};
}
function switchPanel(name){document.querySelectorAll(".side-page").forEach(x=>x.classList.toggle("active",x.id==="side-"+name));document.querySelectorAll("[data-panel]").forEach(x=>x.classList.toggle("active",x.dataset.panel===name));}
function renderAll(){renderHeader();renderOverview();renderUnits();renderBuildings();renderTrade();renderDiplomacy();renderResearch();drawNations();drawUnits()}
function renderHeader(){$("money").textContent=Math.floor(state.money).toLocaleString();$("oil").textContent=Math.floor(state.oil).toLocaleString();$("industry").textContent=state.industry;$("research").textContent=state.research;$("dateLabel").textContent=`روز ${state.day} · ${state.year}`;$("marketIndex").textContent=state.market.toFixed(1);$("nationName").textContent=nations.find(n=>n.id===state.player)?.name||"کشور من";$("population").textContent=nations.find(n=>n.id===state.player)?.pop||"84M";$("stability").textContent=state.stability+"%";$("income").textContent="+"+calcIncome().toLocaleString();const power=Math.min(99,Math.round((state.industry*2+state.units.reduce((s,u)=>s+u.strength,0)/8+state.buildings.length*3+state.techs.filter(t=>t.done).length*4)));$("powerScore").textContent=power;$("powerBar").style.width=power+"%";$("relations").textContent=Object.values(state.relations).reduce((a,b)=>a+b,0)>200?"گرم":Object.values(state.relations).reduce((a,b)=>a+b,0)<-200?"تنش‌زا":"متوازن"}
function calcIncome(){return 1250+state.industry*45+state.buildings.filter(b=>b.effect==="trade").length*150+state.routes.reduce((s,r)=>s+r.profit,0)+state.techs.filter(t=>t.id==="tradeAI"&&t.done).length*150}
function renderOverview(){const el=$("eventLog");el.innerHTML=state.events.slice(0,8).map(e=>`<div class="event">${e.text}<time>${e.when}</time></div>`).join("")||'<div class="event">هنوز رویدادی ثبت نشده است.</div>'}
function renderUnits(){const el=$("unitList");el.innerHTML=state.units.map(u=>`<div class="unit-card ${u.id===selectedUnitId?"selected":""}" data-unit="${u.id}"><div class="unit-head"><div class="unit-icon">${u.icon}</div><div><b>${u.name}</b><small>${u.kind==="land"?"زمینی":u.kind==="air"?"هوایی":"دریایی"} · ${u.ready?"آماده عملیات":"در حال بازیابی"}</small></div><span class="unit-count">${u.strength}</span></div><p>موقعیت: ${u.lat.toFixed(1)}, ${u.lng.toFixed(1)}</p><div class="card-buttons"><button data-select="${u.id}">انتخاب</button><button data-repair="${u.id}">بازیابی (+8)</button></div></div>`).join("")||'<p class="hint">هنوز واحدی نداری.</p>';
 el.querySelectorAll("[data-select]").forEach(b=>b.onclick=()=>{selectedUnitId=b.dataset.select;const u=state.units.find(x=>x.id===selectedUnitId);map.setView([u.lat,u.lng],Math.max(3,map.getZoom()));renderUnits();drawUnits()});
 el.querySelectorAll("[data-repair]").forEach(b=>b.onclick=()=>{const u=state.units.find(x=>x.id===b.dataset.repair);if(state.money<500)return toast("بودجه کافی نیست");state.money-=500;u.strength=Math.min(100,u.strength+8);u.ready=true;renderAll();toast("واحد بازیابی شد")});
}
function renderBuildings(){const el=$("buildingList");el.innerHTML=buildings.map(b=>{const count=state.buildings.filter(x=>x.id===b.id).length;return `<div class="build-card"><div class="build-icon">${b.icon}</div><div class="build-main"><b>${b.name} <small style="color:#8196ad">×${count}</small></b><div class="cost">${b.cost.toLocaleString()} 💰 · ${b.days} روز</div><p>${b.desc}</p><button data-build="${b.id}">ساخت پروژه</button></div></div>`}).join("");el.querySelectorAll("[data-build]").forEach(btn=>btn.onclick=()=>buildBuilding(btn.dataset.build))}
function buildBuilding(id){const b=buildings.find(x=>x.id===id);if(state.money<b.cost)return toast("خزانه کافی نیست");state.money-=b.cost;state.buildings.push({...b,finish:state.day+b.days});logEvent(`پروژه «${b.name}» آغاز شد؛ تکمیل در روز ${state.day+b.days}.`);renderAll();toast("پروژه ثبت شد")}
function renderTrade(){const el=$("tradeList");el.innerHTML=tradeKinds.map(t=>{const count=state.routes.filter(r=>r.kind===t.id).length;return `<div class="trade-card"><div class="trade-icon">${t.icon}</div><div class="trade-info"><b>${t.name} ×${count}</b><small>هزینه ${t.cost.toLocaleString()} · درآمد روزانه +${Math.round(t.profit*(state.market/100)).toLocaleString()}</small></div><button data-route="${t.id}">ایجاد</button></div>`}).join("")+state.routes.map(r=>`<div class="trade-card"><div class="trade-icon">🟢</div><div class="trade-info"><b>${r.name}</b><small>فعال · +${r.profit.toLocaleString()} در روز</small></div><button data-endroute="${r.id}">لغو</button></div>`).join("");
 el.querySelectorAll("[data-route]").forEach(b=>b.onclick=()=>createRoute(b.dataset.route));el.querySelectorAll("[data-endroute]").forEach(b=>b.onclick=()=>{state.routes=state.routes.filter(r=>r.id!==b.dataset.endroute);renderAll();toast("مسیر تجاری متوقف شد")})}
function createRoute(id){const t=tradeKinds.find(x=>x.id===id);if(state.money<t.cost)return toast("بودجه کافی نیست");state.money-=t.cost;let mult=t.id==="sea"?(1+state.buildings.filter(b=>b.effect==="trade").length*.15+state.buildings.filter(b=>b.effect==="navy").length*.1):t.id==="air"?(1+state.buildings.filter(b=>b.effect==="air").length*.18):1;if(state.techs.find(x=>x.id==="tradeAI")?.done)mult+=.2;state.routes.push({id:"r"+Math.random().toString(36).slice(2,8),kind:t.id,name:t.name+" "+(state.routes.length+1),profit:Math.round(t.profit*mult)});logEvent(`مسیر ${t.name} فعال شد.`);renderAll();toast("مسیر تجاری فعال شد")}
function renderDiplomacy(){const el=$("diplomacyList");el.innerHTML=nations.filter(n=>n.id!==state.player).map(n=>{const rel=state.relations[n.id]||0;return `<div class="diplomacy-card"><span class="nation-emoji">${n.flag}</span><div><b>${n.name}</b><small>رابطه ${rel} · قدرت ${n.power}</small></div><button data-dip="${n.id}" data-action="trade">تجارت</button><button data-dip="${n.id}" data-action="pact">پیمان</button></div>`}).join("");el.querySelectorAll("[data-dip]").forEach(b=>b.onclick=()=>diplomacy(b.dataset.dip,b.dataset.action))}
function diplomacy(id,action){const n=nations.find(x=>x.id===id);if(action==="trade"){if(state.money<500)return toast("بودجه کافی نیست");state.money-=500;state.relations[id]=Math.min(100,(state.relations[id]||0)+12);logEvent(`مذاکرات تجاری با ${n.name} رابطه را بهبود داد.`)}else{if(state.money<1200)return toast("بودجه کافی نیست");state.money-=1200;state.relations[id]=Math.min(100,(state.relations[id]||0)+25);logEvent(`پیمان همکاری با ${n.name} پیشنهاد و ثبت شد.`)}renderAll();toast("روابط دیپلماتیک به‌روزرسانی شد")}
function renderResearch(){const el=$("researchList");el.innerHTML=state.techs.map(t=>`<div class="research-card"><b>${t.icon} ${t.name}</b><p>${t.desc}</p><div class="progress"><i style="width:${t.done?100:0}%"></i></div>${t.done?'<span style="color:var(--green);font-size:10px">✓ پژوهش تکمیل شده</span>':`<button data-tech="${t.id}">پژوهش · ${t.cost} امتیاز</button>`}</div>`).join("");el.querySelectorAll("[data-tech]").forEach(b=>b.onclick=()=>researchTech(b.dataset.tech))}
function researchTech(id){const t=state.techs.find(x=>x.id===id);if(t.done)return;if(state.research<t.cost)return toast("امتیاز پژوهش کافی نیست");state.research-=t.cost;t.done=true;logEvent(`فناوری «${t.name}» توسعه یافت.`);renderAll();toast("فناوری باز شد")}
function moveUnit(){
 const u=state.units.find(x=>x.id===selectedUnitId);if(!u)return toast("ابتدا یک واحد انتخاب کن");if(!target)return toast("ابتدا روی نقشه مقصد را انتخاب کن");if(!u.ready)return toast("این واحد چند لحظه دیگر آماده می‌شود");
 const start={lat:u.lat,lng:u.lng},end={lat:target.lat,lng:target.lng};
 if(u.kind==="navy"&&Math.abs(end.lat)>70)return toast("ناوگان برای این مسیر به بندر میانی نیاز دارد.");
 const steps=Math.max(8,Math.min(45,Math.round(Math.hypot(end.lat-start.lat,(end.lng-start.lng)*Math.cos(start.lat*Math.PI/180))*1.3)));
 let step=0;u.ready=false;u.recoverAt=Date.now()+7000;target=null;if(window.targetMarker&&map){map.removeLayer(window.targetMarker);window.targetMarker=null}toast("حرکت زنده آغاز شد…");
 const timer=setInterval(()=>{step++;const t=step/steps;u.lat=start.lat+(end.lat-start.lat)*t;u.lng=start.lng+(end.lng-start.lng)*t;drawUnits();if(step>=steps){clearInterval(timer);logEvent(`${u.name} به مقصد رسید؛ بازیابی خودکار چند ثانیه دیگر تمام می‌شود.`);renderUnits();renderHeader();$("selectedTitle").textContent=u.name;$("selectedSub").textContent="به مقصد رسید · در انتظار بازیابی";toast("واحد به مقصد رسید")}},55);
}
function operation(){const u=state.units.find(x=>x.id===selectedUnitId);if(!u)return toast("ابتدا یک واحد انتخاب کن");if(!target)return toast("برای عملیات ابتدا مقصد را انتخاب کن");if(!u.ready)return toast("واحد در حال بازیابی است؛ چند لحظه صبر کن");const near=nations.reduce((best,n)=>{const d=Math.hypot((n.lat-target.lat),(n.lng-target.lng)*Math.cos(target.lat*Math.PI/180));return !best||d<best.d?{n,d}:best},null);if(near.d>18)return toast("منطقه‌ای برای عملیات در این نزدیکی شناسایی نشد");const n=near.n;if(n.id===state.player||state.owned.includes(n.id))return toast("این منطقه تحت کنترل توست");const rel=state.relations[n.id]||0;const defense=(n.power*.45)+(state.buildings.filter(b=>b.effect==="defense").length*3);const strength=u.strength+(state.techs.find(t=>t.id==="aegis")?.done?8:0)+Math.random()*25;
 if(rel>30){logEvent(`عملیات علیه ${n.name} لغو شد؛ روابط مثبت است.`);return toast("روابط مثبت است؛ از دیپلماسی استفاده کن")}
 u.ready=false;u.recoverAt=Date.now()+10000;u.strength=Math.max(20,u.strength-5);
 if(strength>defense){state.owned.push(n.id);state.money+=2500;state.relations[n.id]=-80;logEvent(`عملیات شبیه‌سازی‌شده موفق بود؛ ${n.name} تحت کنترل درآمد.`);toast(`قلمرو جدید: ${n.name}`)}else{state.stability=Math.max(20,state.stability-4);state.money=Math.max(0,state.money-900);state.relations[n.id]=-60;logEvent(`عملیات در ${n.name} ناکام ماند؛ واحد نیاز به بازیابی دارد.`);toast("عملیات ناموفق بود")}
 renderAll();drawNations();if(countryGeoLayer){countryGeoLayer.setStyle(f=>{const p=f.properties||{},code=featureCode(p);const own=state.owned.includes(code);return {color:own?"#f7b801":"#283c54",weight:own?2.8:1,opacity:.95,fillColor:colorForCode(code),fillOpacity:own?.72:.25}})}
}
function createUnit(){const types=[{kind:"land",name:"گروه زمینی",icon:"🪖",cost:1800},{kind:"air",name:"اسکادران هوایی",icon:"✈️",cost:2500},{kind:"navy",name:"گروه دریایی",icon:"🚢",cost:2800}];$("actionContent").innerHTML=`<p class="overline">FORCE DEPLOYMENT</p><h2>ایجاد واحد جدید</h2><p class="muted">واحد جدید در نزدیکی پایتخت ظاهر می‌شود.</p>${types.map(t=>`<button class="secondary full" data-newkind="${t.kind}">${t.icon} ${t.name} · ${t.cost.toLocaleString()} 💰</button>`).join("")}`;$("actionModal").classList.remove("hidden");document.querySelectorAll("[data-newkind]").forEach(b=>b.onclick=()=>{const t=types.find(x=>x.kind===b.dataset.newkind);if(state.money<t.cost)return toast("بودجه کافی نیست");state.money-=t.cost;const n=nations.find(x=>x.id===state.player);state.units.push({id:"u"+Math.random().toString(36).slice(2,7),kind:t.kind,name:t.name+" "+(state.units.length+1),icon:t.icon,strength:55,lat:n.lat+(Math.random()*3-1.5),lng:n.lng+(Math.random()*3-1.5),ready:true});selectedUnitId=state.units.at(-1).id;$("actionModal").classList.add("hidden");renderAll();toast("واحد جدید آماده است")})}
function nextDay(){
 if(paused)return toast("بازی متوقف است");state.day++;if(state.day>365){state.day=1;state.year++}
 state.money+=calcIncome();state.oil+=Math.max(5,state.industry*2);state.research+=Math.max(1,Math.floor(state.buildings.filter(b=>b.effect==="research").length*.7));state.market=Math.max(80,Math.min(125,state.market+(Math.random()*4-2)));
 state.units.forEach(u=>{if(!u.ready){u.ready=true;u.strength=Math.min(100,u.strength+3)}});
 state.buildings.forEach(b=>{if(!b.completed&&state.day>=b.finish){b.completed=true;logEvent(`ساخت «${b.name}» تکمیل شد.`);if(b.effect==="industry")state.industry+=b.value;if(b.effect==="stability")state.stability=Math.min(100,state.stability+b.value)}});
 state.routes.forEach(r=>{state.money+=r.profit});
 // Abstract air/missile alert system: radar and defense buildings may intercept simulated threats.
 if(Math.random()<.18){
  const hasRadar=state.buildings.some(b=>b.effect==="intel"&&b.completed);
  const defenseCount=state.buildings.filter(b=>b.effect==="defense"&&b.completed).length;
  if(hasRadar||defenseCount){
   const chance=Math.min(.92,.25+(hasRadar?.2:0)+defenseCount*.16+(state.techs.find(t=>t.id==="aegis")?.done?.18:0));
   if(Math.random()<chance){logEvent("هشدار رهگیری: سامانه دفاعی یک تهدید شبیه‌سازی‌شده را خنثی کرد.");}
   else {state.stability=Math.max(10,state.stability-2);state.money=Math.max(0,state.money-350);logEvent("هشدار امنیتی: بخشی از زیرساخت آسیب دید؛ تعمیرات هزینه داشت.");}
  }
 }
 // Trade disruption is a fictional game event; it never represents real-world targeting.
 if(state.routes.length&&Math.random()<.05){const r=state.routes[Math.floor(Math.random()*state.routes.length)];const loss=Math.min(state.money,Math.round(r.profit*.7));state.money-=loss;logEvent(`اختلال در مسیر «${r.name}»؛ ${loss.toLocaleString()} سکه هزینه بیمه و تعمیر شد.`)}
 // Lightweight AI turns: competitors adjust relations and occasionally create a global event.
 state.aiTurn++;if(state.aiTurn%3===0){const n=nations.filter(x=>x.id!==state.player&&!state.owned.includes(x.id))[Math.floor(Math.random()*nations.filter(x=>x.id!==state.player&&!state.owned.includes(x.id)).length)];if(n){const rel=state.relations[n.id]||0;state.relations[n.id]=Math.max(-100,Math.min(100,rel+(Math.random()>.5?4:-5)));if(Math.random()<.25){state.market=Math.max(80,Math.min(125,state.market+(Math.random()>.5?3:-3)));logEvent(`بازار جهانی تحت تأثیر رویدادهای ${n.region} نوسان کرد.`)}}}
 if(Math.random()<.13){const events=["افزایش تقاضای جهانی درآمد تجارت را بالا برد.","تعمیرات زیرساختی هزینه نگهداری را افزایش داد.","یک توافق منطقه‌ای فضای تجارت را بهبود داد.","نوسان انرژی بازار جهانی را تغییر داد."];const text=events[Math.floor(Math.random()*events.length)];if(text.includes("افزایش تقاضا"))state.routes.forEach(r=>state.money+=Math.round(r.profit*.2));if(text.includes("هزینه نگهداری"))state.money=Math.max(0,state.money-500);logEvent(text)}
 renderAll();toast("روز جدید آغاز شد")
}
function logEvent(text){state.events.unshift({text,when:`روز ${state.day} · ${state.year}`});state.events=state.events.slice(0,30);renderOverview()}
function toast(text){const t=$("toast");if(!t)return;t.textContent=text;t.classList.add("show");clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>t.classList.remove("show"),2300)}
function showToastActionFallback(){}
function setup(){
 const startButton=$("startBtn");
 if(startButton) startButton.addEventListener("click",e=>{e.preventDefault();chooseCountry()});
 $("startBtn").onclick=chooseCountry;$("continueBtn").onclick=()=>{const s=loadState();if(s)beginGame(s);else toast("ذخیره‌ای پیدا نشد؛ بازی جدید را شروع کن")};
 $("howBtn").onclick=()=>$("helpOverlay").classList.remove("hidden");
 document.querySelectorAll(".close-overlay").forEach(b=>b.onclick=()=>b.closest(".overlay").classList.add("hidden"));
 $("beginNation").onclick=()=>{if(!selectedNation)return;const s=freshState(selectedNation);localStorage.setItem(STORE,JSON.stringify(s));beginGame(s)};
 $("menuBtn").onclick=()=>{if(confirm("به منوی اصلی برگردی؟ بازی فعلی را ذخیره می‌کنیم.")){saveState();startMenu()}};
 $("saveBtn").onclick=saveState;$("pauseBtn").onclick=()=>{paused=!paused;$("pauseBtn").textContent=paused?"▶":"Ⅱ";$("turnStatus").textContent=paused?"بازی متوقف است":"● زمان زنده است";toast(paused?"بازی متوقف شد":"بازی ادامه یافت")};
 $("nextDay").style.display="none";$("moveBtn").onclick=moveUnit;$("moveSelected").onclick=moveUnit;$("attackBtn").onclick=operation;$("newUnit").onclick=createUnit;$("tradeRoute").onclick=()=>switchPanel("trade");$("closeAction").onclick=()=>$("actionModal").classList.add("hidden");
 $("clearTarget").onclick=()=>{target=null;if(window.targetMarker&&map){map.removeLayer(window.targetMarker);window.targetMarker=null}toast("مقصد لغو شد")};
 $("zoomWorld").onclick=()=>map.setView([18,8],2.5);$("homeView").onclick=()=>{const n=nations.find(x=>x.id===state.player);map.setView([n.lat,n.lng],5,{animate:true})};$("toggleBorders").onclick=()=>{const current=map.getZoom();map.setZoom(current===2?3:2)};
 $("clearLog").onclick=()=>{state.events=[];renderOverview()};
 document.querySelectorAll(".rail,.tab").forEach(b=>b.onclick=()=>switchPanel(b.dataset.panel));
}
document.addEventListener("DOMContentLoaded",setup);
