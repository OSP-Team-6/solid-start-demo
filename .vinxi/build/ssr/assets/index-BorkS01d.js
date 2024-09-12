import{isServer as w,getRequestEvent as x}from"solid-js/web";import{provideRequestEvent as Fe}from"solid-js/web/storage";import{H3Event as J,setResponseStatus as ke,sendRedirect as je,useSession as We,setHeader as Be,getRequestIP as Me,getResponseStatus as De,getResponseStatusText as Ke,getCookie as Ne,setCookie as Xe,getRequestURL as ze,getResponseHeaders as Ge,getResponseHeader as Je,setResponseHeader as Qe,appendResponseHeader as Ve,removeResponseHeader as Ye,getRequestWebStream as Ze}from"h3";import{getContext as et}from"unctx";import{AsyncLocalStorage as tt}from"node:async_hooks";import{createStorage as nt}from"unstorage";import rt from"unstorage/drivers/fs-lite";import{getOwner as Y,runWithOwner as de,createMemo as E,createContext as he,useContext as pe,createSignal as A,createRenderEffect as st,on as ge,startTransition as T,resetErrorBoundaries as ot,batch as at,untrack as it,createComponent as ct,getListener as ut,onCleanup as me,sharedConfig as P,$TRACK as lt}from"solid-js";function ft(){let e=new Set;function t(s){return e.add(s),()=>e.delete(s)}let n=!1;function r(s,o){if(n)return!(n=!1);const a={to:s,options:o,defaultPrevented:!1,preventDefault:()=>a.defaultPrevented=!0};for(const i of e)i.listener({...a,from:i.location,retry:f=>{f&&(n=!0),i.navigate(s,{...o,resolve:!1})}});return!a.defaultPrevented}return{subscribe:t,confirm:r}}let Q;function ye(){(!window.history.state||window.history.state._depth==null)&&window.history.replaceState({...window.history.state,_depth:window.history.length-1},""),Q=window.history.state._depth}w||ye();function mn(e){return{...e,_depth:window.history.state&&window.history.state._depth}}function yn(e,t){let n=!1;return()=>{const r=Q;ye();const s=r==null?null:Q-r;if(n){n=!1;return}s&&t(s)?(n=!0,window.history.go(-s)):e()}}const dt=/^(?:[a-z0-9]+:)?\/\//i,ht=/^\/+|(\/)\/+$/g,we="http://sr";function _(e,t=!1){const n=e.replace(ht,"$1");return n?t||/^[?#]/.test(n)?n:"/"+n:""}function M(e,t,n){if(dt.test(t))return;const r=_(e),s=n&&_(n);let o="";return!s||t.startsWith("/")?o=r:s.toLowerCase().indexOf(r.toLowerCase())!==0?o=r+s:o=s,(o||"/")+_(t,!o)}function pt(e,t){if(e==null)throw new Error(t);return e}function gt(e,t){return _(e).replace(/\/*(\*.*)?$/g,"")+_(t)}function Re(e){const t={};return e.searchParams.forEach((n,r)=>{t[r]=n}),t}function mt(e,t,n){const[r,s]=e.split("/*",2),o=r.split("/").filter(Boolean),a=o.length;return i=>{const f=i.split("/").filter(Boolean),h=f.length-a;if(h<0||h>0&&s===void 0&&!t)return null;const l={path:a?"":"/",params:{}},c=y=>n===void 0?void 0:n[y];for(let y=0;y<a;y++){const u=o[y],g=f[y],p=u[0]===":",v=p?u.slice(1):u;if(p&&X(g,c(v)))l.params[v]=g;else if(p||!X(g,u))return null;l.path+=`/${g}`}if(s){const y=h?f.slice(-h).join("/"):"";if(X(y,c(s)))l.params[s]=y;else return null}return l}}function X(e,t){const n=r=>r.localeCompare(e,void 0,{sensitivity:"base"})===0;return t===void 0?!0:typeof t=="string"?n(t):typeof t=="function"?t(e):Array.isArray(t)?t.some(n):t instanceof RegExp?t.test(e):!1}function yt(e){const[t,n]=e.pattern.split("/*",2),r=t.split("/").filter(Boolean);return r.reduce((s,o)=>s+(o.startsWith(":")?2:3),r.length-(n===void 0?0:1))}function ve(e){const t=new Map,n=Y();return new Proxy({},{get(r,s){return t.has(s)||de(n,()=>t.set(s,E(()=>e()[s]))),t.get(s)()},getOwnPropertyDescriptor(){return{enumerable:!0,configurable:!0}},ownKeys(){return Reflect.ownKeys(e())}})}function be(e){let t=/(\/?\:[^\/]+)\?/.exec(e);if(!t)return[e];let n=e.slice(0,t.index),r=e.slice(t.index+t[0].length);const s=[n,n+=t[1]];for(;t=/^(\/\:[^\/]+)\?/.exec(r);)s.push(n+=t[1]),r=r.slice(t[0].length);return be(r).reduce((o,a)=>[...o,...s.map(i=>i+a)],[])}const wt=100,Rt=he(),vt=he(),Se=()=>pt(pe(Rt),"<A> and 'use' router primitives can be only used inside a Route."),bt=()=>Se().navigatorFactory();function St(e,t=""){const{component:n,preload:r,load:s,children:o,info:a}=e,i=!o||Array.isArray(o)&&!o.length,f={key:e,component:n,preload:r||s,info:a};return xe(e.path).reduce((h,l)=>{for(const c of be(l)){const y=gt(t,c);let u=i?y:y.split("/*",1)[0];u=u.split("/").map(g=>g.startsWith(":")||g.startsWith("*")?g:encodeURIComponent(g)).join("/"),h.push({...f,originalPath:l,pattern:u,matcher:mt(u,!i,e.matchFilters)})}return h},[])}function xt(e,t=0){return{routes:e,score:yt(e[e.length-1])*1e4-t,matcher(n){const r=[];for(let s=e.length-1;s>=0;s--){const o=e[s],a=o.matcher(n);if(!a)return null;r.unshift({...a,route:o})}return r}}}function xe(e){return Array.isArray(e)?e:[e]}function Et(e,t="",n=[],r=[]){const s=xe(e);for(let o=0,a=s.length;o<a;o++){const i=s[o];if(i&&typeof i=="object"){i.hasOwnProperty("path")||(i.path="");const f=St(i,t);for(const h of f){n.push(h);const l=Array.isArray(i.children)&&i.children.length===0;if(i.children&&!l)Et(i.children,h.pattern,n,r);else{const c=xt([...n],r.length);r.push(c)}n.pop()}}}return n.length?r:r.sort((o,a)=>a.score-o.score)}function z(e,t){for(let n=0,r=e.length;n<r;n++){const s=e[n].matcher(t);if(s)return s}return[]}function Pt(e,t){const n=new URL(we),r=E(f=>{const h=e();try{return new URL(h,n)}catch{return console.error(`Invalid path ${h}`),f}},n,{equals:(f,h)=>f.href===h.href}),s=E(()=>r().pathname),o=E(()=>r().search,!0),a=E(()=>r().hash),i=()=>"";return{get pathname(){return s()},get search(){return o()},get hash(){return a()},get state(){return t()},get key(){return i()},query:ve(ge(o,()=>Re(r())))}}let C;function Ct(){return C}let I=!1;function At(){return I}function wn(e){I=e}function Rn(e,t,n,r={}){const{signal:[s,o],utils:a={}}=e,i=a.parsePath||(d=>d),f=a.renderPath||(d=>d),h=a.beforeLeave||ft(),l=M("",r.base||"");if(l===void 0)throw new Error(`${l} is not a valid base path`);l&&!s().value&&o({value:l,replace:!0,scroll:!1});const[c,y]=A(!1);let u;const g=(d,m)=>{m.value===p()&&m.state===b()||(u===void 0&&y(!0),C=d,u=m,T(()=>{u===m&&(v(u.value),L(u.state),ot(),w||ne[1]([]))}).finally(()=>{u===m&&at(()=>{C=void 0,d==="navigate"&&_e(u),y(!1),u=void 0})}))},[p,v]=A(s().value),[b,L]=A(s().state),N=Pt(p,b),F=[],ne=A(w?Le():[]),re=E(()=>typeof r.transformUrl=="function"?z(t(),r.transformUrl(N.pathname)):z(t(),N.pathname)),He=ve(()=>{const d=re(),m={};for(let S=0;S<d.length;S++)Object.assign(m,d[S].params);return m}),se={pattern:l,path:()=>l,outlet:()=>null,resolvePath(d){return M(l,d)}};return st(ge(s,d=>g("native",d),{defer:!0})),{base:se,location:N,params:He,isRouting:c,renderPath:f,parsePath:i,navigatorFactory:Te,matches:re,beforeLeave:h,preloadRoute:Ue,singleFlight:r.singleFlight===void 0?!0:r.singleFlight,submissions:ne};function Ie(d,m,S){it(()=>{if(typeof m=="number"){m&&(a.go?a.go(m):console.warn("Router integration does not support relative routing"));return}const k=!m||m[0]==="?",{replace:j,resolve:$,scroll:W,state:O}={replace:!1,resolve:!k,scroll:!0,...S};let oe;const q=$?d.resolvePath(m):M(k&&(oe=s().value)&&oe.split("?")[0]||"",m);if(q===void 0)throw new Error(`Path '${m}' is not a routable path`);if(F.length>=wt)throw new Error("Too many redirects");const ae=p();if(q!==ae||O!==b())if(w){const ie=x();ie&&(ie.response={status:302,headers:new Headers({Location:q})}),o({value:q,replace:j,scroll:W,state:O})}else h.confirm(q,S)&&(F.push({value:ae,replace:j,scroll:W,state:b()}),g("navigate",{value:q,state:O}))})}function Te(d){return d=d||pe(vt)||se,(m,S)=>Ie(d,m,S)}function _e(d){const m=F[0];m&&(o({...d,replace:m.replace,scroll:m.scroll}),F.length=0)}function Ue(d,m={}){const S=z(t(),d.pathname),k=C;C="preload";for(let j in S){const{route:$,params:W}=S[j];$.component&&$.component.preload&&$.component.preload();const{preload:O}=$;I=!0,m.preloadData&&O&&de(n(),()=>O({params:W,location:{pathname:d.pathname,search:d.search,hash:d.hash,query:Re(d),state:null,key:""},intent:"preload"})),I=!1}C=k}function Le(){const d=x();return d&&d.router&&d.router.submission?[d.router.submission]:[]}}function vn(e,t,n,r){const{base:s,location:o,params:a}=e,{pattern:i,component:f,preload:h}=r().route,l=E(()=>r().path);f&&f.preload&&f.preload(),I=!0;const c=h?h({params:a,location:o,intent:C||"initial"}):void 0;return I=!1,{parent:t,pattern:i,path:l,outlet:()=>f?ct(f,{params:a,location:o,data:c,get children(){return n()}}):n(),resolvePath(u){return M(s.path(),u,l())}}}const $t="Location",Ot=5e3,qt=18e4;let U=new Map;w||setInterval(()=>{const e=Date.now();for(let[t,n]of U.entries())!n[3].count&&e-n[0]>qt&&U.delete(t)},3e5);function Z(){if(!w)return U;const e=x();if(!e)throw new Error("Cannot find cache context");return(e.router||(e.router={})).cache||(e.router.cache=new Map)}function Ht(e,t=!0){return T(()=>{const n=Date.now();Ee(e,r=>{t&&(r[0]=0),r[3][1](n)})})}function Ee(e,t){e&&!Array.isArray(e)&&(e=[e]);for(let n of U.keys())(e===void 0||It(n,e))&&t(U.get(n))}function K(e,t){e.GET&&(e=e.GET);const n=(...r)=>{const s=Z(),o=Ct(),a=At(),f=Y()?bt():void 0,h=Date.now(),l=t+V(r);let c=s.get(l),y;if(w){const p=x();if(p){const v=(p.router||(p.router={})).dataOnly;if(v){const b=p&&(p.router.data||(p.router.data={}));if(b&&l in b)return b[l];if(Array.isArray(v)&&!v.includes(l))return b[l]=void 0,Promise.resolve()}}}if(ut()&&!w&&(y=!0,me(()=>c[3].count--)),c&&c[0]&&(w||o==="native"||c[3].count||Date.now()-c[0]<Ot)){y&&(c[3].count++,c[3][0]()),c[2]==="preload"&&o!=="preload"&&(c[0]=h);let p=c[1];return o!=="preload"&&(p="then"in c[1]?c[1].then(g(!1),g(!0)):g(!1)(c[1]),!w&&o==="navigate"&&T(()=>c[3][1](c[0]))),a&&"then"in p&&p.catch(()=>{}),p}let u=!w&&P.context&&P.has(l)?P.load(l):e(...r);if(c?(c[0]=h,c[1]=u,c[2]=o,!w&&o==="navigate"&&T(()=>c[3][1](c[0]))):(s.set(l,c=[h,u,o,A(h)]),c[3].count=0),y&&(c[3].count++,c[3][0]()),w){const p=x();if(p&&p.router.dataOnly)return p.router.data[l]=u}if(o!=="preload"&&(u="then"in u?u.then(g(!1),g(!0)):g(!1)(u)),a&&"then"in u&&u.catch(()=>{}),w&&P.context&&P.context.async&&!P.context.noHydrate){const p=x();(!p||!p.serverOnly)&&P.context.serialize(l,u)}return u;function g(p){return async v=>{if(v instanceof Response){const b=v.headers.get($t);if(b!==null){if(f&&b.startsWith("/"))T(()=>{f(b,{replace:!0})});else if(!w)window.location.href=b;else if(w){const L=x();L&&(L.response={status:302,headers:new Headers({Location:b})})}return}v.customBody&&(v=await v.customBody())}if(p)throw v;return v}}};return n.keyFor=(...r)=>t+V(r),n.key=t,n}K.set=(e,t)=>{const n=Z(),r=Date.now();let s=n.get(e);s?(s[0]=r,s[1]=t,s[2]="preload"):(n.set(e,s=[r,t,,A(r)]),s[3].count=0)};K.clear=()=>Z().clear();function It(e,t){for(let n of t)if(e.startsWith(n))return!0;return!1}function V(e){return JSON.stringify(e,(t,n)=>Tt(n)?Object.keys(n).sort().reduce((r,s)=>(r[s]=n[s],r),{}):n)}function Tt(e){let t;return e!=null&&typeof e=="object"&&(!(t=Object.getPrototypeOf(e))||t===Object.prototype)}const ce=new Map;function _t(e,t){const n=Se(),r=E(()=>n.submissions[0]().filter(s=>s.url===e.toString()&&!t));return new Proxy([],{get(s,o){return o===lt?r():o==="pending"?r().some(a=>!a.result):r()[o]}})}function bn(e,t){const n=_t(e,t);return new Proxy({},{get(r,s){return n.length===0&&s==="clear"||s==="retry"?()=>{}:n[n.length-1]?.[s]}})}function Pe(e,t){function n(...s){const o=this.r,a=this.f,i=(o.singleFlight&&e.withOptions?e.withOptions({headers:{"X-Single-Flight":"true"}}):e)(...s),[f,h]=A();let l;function c(y){return async u=>{const g=await Lt(u,y,o.navigatorFactory());if(!g)return l.clear();if(h(g),g.error&&!a)throw g.error;return g.data}}return o.submissions[1](y=>[...y,l={input:s,url:r,get result(){return f()?.data},get error(){return f()?.error},get pending(){return!f()},clear(){o.submissions[1](u=>u.filter(g=>g.input!==s))},retry(){return h(void 0),e(...s).then(c(),c(!0))}}]),i.then(c(),c(!0))}const r=e.url||t||(w?"":`https://action/${Ut(e.toString())}`);return Ce(n,r)}function Ce(e,t){return e.toString=()=>{if(!t)throw new Error("Client Actions need explicit names if server rendered");return t},e.with=function(...n){const r=function(...o){return e.call(this,...n,...o)},s=new URL(t,we);return s.searchParams.set("args",V(n)),Ce(r,(s.origin==="https://action"?s.origin:"")+s.pathname+s.search)},e.url=t,w||(ce.set(t,e),Y()&&me(()=>ce.delete(t))),e}const Ut=e=>e.split("").reduce((t,n)=>(t<<5)-t+n.charCodeAt(0)|0,0);async function Lt(e,t,n){let r,s,o,a;if(e instanceof Response){if(e.headers.has("X-Revalidate")&&(o=e.headers.get("X-Revalidate").split(",")),e.customBody&&(r=s=await e.customBody(),e.headers.has("X-Single-Flight")&&(r=r._$value,delete s._$value,a=Object.keys(s))),e.headers.has("Location")){const i=e.headers.get("Location")||"/";i.startsWith("http")?window.location.href=i:n(i)}}else{if(t)return{error:e};r=e}return Ee(o,i=>i[0]=0),a&&a.forEach(i=>K.set(i,s[i])),await Ht(o,!1),r!=null?{data:r}:void 0}function ee(e,t=302){let n,r;typeof t=="number"?n={status:t}:({revalidate:r,...n}=t,typeof n.status>"u"&&(n.status=302));const s=new Headers(n.headers);return s.set("Location",e),r&&s.set("X-Revalidate",r.toString()),new Response(null,{...n,headers:s})}function Ft(e){let t;const n=$e(e),r={duplex:"half",method:e.method,headers:e.headers};return e.node.req.body instanceof ArrayBuffer?new Request(n,{...r,body:e.node.req.body}):new Request(n,{...r,get body(){return t||(t=Xt(e),t)}})}function kt(e){return e.web??={request:Ft(e),url:$e(e)},e.web.request}function jt(){return Qt()}const Ae=Symbol("$HTTPEvent");function Wt(e){return typeof e=="object"&&(e instanceof J||e?.[Ae]instanceof J||e?.__is_event__===!0)}function R(e){return function(...t){let n=t[0];if(Wt(n))t[0]=n instanceof J||n.__is_event__?n:n[Ae];else{if(!globalThis.app.config.server.experimental?.asyncContext)throw new Error("AsyncLocalStorage was not enabled. Use the `server.experimental.asyncContext: true` option in your app configuration to enable it. Or, pass the instance of HTTPEvent that you have as the first argument to the function.");if(n=jt(),!n)throw new Error("No HTTPEvent found in AsyncLocalStorage. Make sure you are using the function within the server runtime.");t.unshift(n)}return e(...t)}}const $e=R(ze),Bt=R(Me),ue=R(ke),le=R(De),Mt=R(Ke),B=R(Ge),fe=R(Je),Dt=R(Qe),Kt=R(Ve),Sn=R(je),xn=R(Ne),En=R(Xe),Nt=R(We),Pn=R(Be),Xt=R(Ze),zt=R(Ye),Gt=R(kt);function Jt(){return et("nitro-app",{asyncContext:!!globalThis.app.config.server.experimental?.asyncContext,AsyncLocalStorage:tt})}function Qt(){return Jt().use().event}const G=Symbol("fetchEvent");function Vt(e){return{request:Gt(e),response:en(e),clientAddress:Bt(e),locals:{},nativeEvent:e}}function Yt(e){return{...e}}function Cn(e){if(!e[G]){const t=Vt(e);e[G]=t}return e[G]}class Zt{event;constructor(t){this.event=t}get(t){const n=fe(this.event,t);return Array.isArray(n)?n.join(", "):n||null}has(t){return this.get(t)!==void 0}set(t,n){return Dt(this.event,t,n)}delete(t){return zt(this.event,t)}append(t,n){Kt(this.event,t,n)}getSetCookie(){const t=fe(this.event,"Set-Cookie");return Array.isArray(t)?t:[t]}forEach(t){return Object.entries(B(this.event)).forEach(([n,r])=>t(Array.isArray(r)?r.join(", "):r,n,this))}entries(){return Object.entries(B(this.event)).map(([t,n])=>[t,Array.isArray(n)?n.join(", "):n])[Symbol.iterator]()}keys(){return Object.keys(B(this.event))[Symbol.iterator]()}values(){return Object.values(B(this.event)).map(t=>Array.isArray(t)?t.join(", "):t)[Symbol.iterator]()}[Symbol.iterator](){return this.entries()[Symbol.iterator]()}}function en(e){return{get status(){return le(e)},set status(t){ue(e,t)},get statusText(){return Mt(e)},set statusText(t){ue(e,le(e),t)},headers:new Zt(e)}}function Oe(e,t,n){if(typeof e!="function")throw new Error("Export from a 'use server' module must be a function");const r="";return new Proxy(e,{get(s,o,a){return o==="url"?`${r}/_server?id=${encodeURIComponent(t)}&name=${encodeURIComponent(n)}`:o==="GET"?a:s[o]},apply(s,o,a){const i=x();if(!i)throw new Error("Cannot call server function outside of a request");const f=Yt(i);return f.locals.serverFunctionMeta={id:t+"#"+n},f.serverOnly=!0,Fe(f,()=>e.apply(o,a))}})}const H=nt({driver:rt({base:"./.data"})});H.setItem("users:data",[{id:0,username:"kody",password:"twixrox"}]);H.setItem("users:counter",1);const D={user:{async create({data:e}){const[{value:t},{value:n}]=await H.getItems(["users:data","users:counter"]),r={...e,id:n};return await Promise.all([H.setItem("users:data",[...t,r]),H.setItem("users:counter",n+1)]),r},async findUnique({where:{username:e=void 0,id:t=void 0}}){const n=await H.getItem("users:data");return t!==void 0?n.find(r=>r.id===t):n.find(r=>r.username===e)}}};function tn(e){if(typeof e!="string"||e.length<3)return"Usernames must be at least 3 characters long"}function nn(e){if(typeof e!="string"||e.length<6)return"Passwords must be at least 6 characters long"}async function rn(e,t){const n=await D.user.findUnique({where:{username:e}});if(!n||t!==n.password)throw new Error("Invalid login");return n}async function qe(){await(await te()).update(t=>{t.userId=void 0})}async function sn(e,t){if(await D.user.findUnique({where:{username:e}}))throw new Error("User already exists");return D.user.create({data:{username:e,password:t}})}function te(){return Nt({password:process.env.SESSION_SECRET??"areallylongsecretthatyoushouldreplace"})}const An=K(async()=>{"use server";try{const t=(await te()).data.userId;if(t===void 0)throw new Error("User not found");const n=await D.user.findUnique({where:{id:t}});if(!n)throw new Error("User not found");return{id:n.id,username:n.username}}catch{await qe(),ee("/login")}},"user"),$n=Pe(Oe(on,"c_6052","$$function0")),On=Pe(Oe(an,"c_6052","$$function1"));async function on(e,t){const n=String(e.get("username")),r=String(e.get("password")),s=String(e.get("loginType"));let o=tn(n)||nn(r);if(o)return new Error(o);console.log("In loginOrRegister"),console.log(rn);try{const a=await(s!=="login"?sn(n,r):t.login(n,r));await(await te()).update(f=>{f.userId=a.id})}catch(a){return a}return ee("/")}async function an(){return await qe(),ee("/login")}export{Rt as R,Rn as a,vn as b,Et as c,vt as d,Ct as e,ce as f,z as g,ye as h,ft as i,An as j,mn as k,xn as l,we as m,yn as n,En as o,Cn as p,Sn as q,ue as r,wn as s,Pn as t,On as u,bn as v,$n as w};
