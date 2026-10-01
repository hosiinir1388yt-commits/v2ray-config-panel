const PASS_HASH="6f12879e3d9e2ba887598d781e61125fdd02aab66f6fb136a86d9221cec47222";
async function hash(s){
 const b=await crypto.subtle.digest("SHA-256",new TextEncoder().encode(s));
 return [...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,"0")).join("");
}
async function login(){
 if(await hash(document.getElementById("pw").value)===PASS_HASH){
  sessionStorage.ok="1";
  document.getElementById("lock").hidden=true;
  document.getElementById("app").hidden=false;
 }else document.getElementById("err").textContent="رمز اشتباه است";
}
if(sessionStorage.ok==="1"){
 document.getElementById("lock").hidden=true;
 document.getElementById("app").hidden=false;
}
function generate(){
 let p=document.getElementById("protocol").value;
 let a=document.getElementById("address").value.trim();
 let portN=+document.getElementById("port").value||443;
 let idv=document.getElementById("id").value.trim();
 let network=document.getElementById("transport").value;
 let tlsv=document.getElementById("tls").checked;
 let pathv=document.getElementById("path").value.trim();
 if(!a||!idv){document.getElementById("status").textContent="آدرس و UUID/Password را وارد کنید.";return}
 let o;
 if(p==="VLESS")o={protocol:"vless",settings:{vnext:[{address:a,port:portN,users:[{id:idv,encryption:"none"}]}]},streamSettings:{network,security:tlsv?"tls":"none"}};
 if(p==="VMess")o={protocol:"vmess",settings:{vnext:[{address:a,port:portN,users:[{id:idv,alterId:0,security:"auto"}]}]},streamSettings:{network,security:tlsv?"tls":"none"}};
 if(p==="Trojan")o={protocol:"trojan",settings:{servers:[{address:a,port:portN,password:idv}]},streamSettings:{network,security:tlsv?"tls":"none"}};
 if(p==="Shadowsocks")o={protocol:"shadowsocks",settings:{servers:[{address:a,port:portN,method:"aes-128-gcm",password:idv}]}};
 if(network==="ws")o.streamSettings.wsSettings={path:pathv||"/"};
 if(network==="grpc")o.streamSettings.grpcSettings={serviceName:pathv||"grpc"};
 document.getElementById("out").value=JSON.stringify({
  log:{loglevel:"warning"},
  inbounds:[{listen:"127.0.0.1",port:10808,protocol:"socks",settings:{udp:true}}],
  outbounds:[o]
 },null,2);
 document.getElementById("status").textContent="کانفیگ ساخته شد.";
}
async function copyOut(){
 await navigator.clipboard.writeText(document.getElementById("out").value);
 document.getElementById("status").textContent="کپی شد.";
}
function downloadOut(){
 let b=new Blob([document.getElementById("out").value],{type:"application/json"});
 let a=document.createElement("a");
 a.href=URL.createObjectURL(b);a.download="config.json";a.click();
}
