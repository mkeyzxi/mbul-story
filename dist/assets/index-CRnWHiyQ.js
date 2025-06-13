var S=Object.defineProperty;var C=(i,e,t)=>e in i?S(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t;var f=(i,e,t)=>C(i,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const a of o)if(a.type==="childList")for(const s of a.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&r(s)}).observe(document,{childList:!0,subtree:!0});function t(o){const a={};return o.integrity&&(a.integrity=o.integrity),o.referrerPolicy&&(a.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?a.credentials="include":o.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function r(o){if(o.ep)return;o.ep=!0;const a=t(o);fetch(o.href,a)}})();const B="modulepreload",T=function(i){return"/"+i},b={},A=function(e,t,r){let o=Promise.resolve();if(t&&t.length>0){let s=function(l){return Promise.all(l.map(d=>Promise.resolve(d).then(m=>({status:"fulfilled",value:m}),m=>({status:"rejected",reason:m}))))};document.getElementsByTagName("link");const n=document.querySelector("meta[property=csp-nonce]"),h=(n==null?void 0:n.nonce)||(n==null?void 0:n.getAttribute("nonce"));o=s(t.map(l=>{if(l=T(l),l in b)return;b[l]=!0;const d=l.endsWith(".css"),m=d?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${m}`))return;const c=document.createElement("link");if(c.rel=d?"stylesheet":B,d||(c.as="script"),c.crossOrigin="",c.href=l,h&&c.setAttribute("nonce",h),document.head.appendChild(c),d)return new Promise((E,x)=>{c.addEventListener("load",E),c.addEventListener("error",()=>x(new Error(`Unable to preload CSS for ${l}`)))})}))}function a(s){const n=new Event("vite:preloadError",{cancelable:!0});if(n.payload=s,window.dispatchEvent(n),!n.defaultPrevented)throw s}return o.then(s=>{for(const n of s||[])n.status==="rejected"&&a(n.reason);return e().catch(a)})};class y{getToken(){return localStorage.getItem("token")}async getAllStories(e){try{const t=await fetch("https://story-api.dicoding.dev/v1/stories",{headers:{Authorization:`Bearer ${e}`}}),r=await t.json();if(!t.ok)throw new Error(r.message||"Gagal mengambil data");return r}catch(t){return{error:!0,message:t.message}}}async addNewStory(e,t){try{const r=await fetch("https://story-api.dicoding.dev/v1/stories",{method:"POST",headers:{Authorization:`Bearer ${t}`},body:e}),o=await r.json();if(!r.ok)throw new Error(o.message||"Gagal menambahkan cerita");return o}catch(r){return{error:!0,message:r.message}}}async getStoryById(e,t){try{const r=await fetch(`https://story-api.dicoding.dev/v1/stories/${e}`,{headers:{Authorization:`Bearer ${t}`}}),o=await r.json();if(!r.ok)throw new Error(o.message||"Gagal mengambil data detail");return o.story}catch(r){throw new Error(r.message)}}}const I="StoryAppDB",P=1,u="stories";function v(){return new Promise((i,e)=>{const t=indexedDB.open(I,P);t.onerror=()=>e("Gagal membuka DB"),t.onsuccess=()=>i(t.result),t.onupgradeneeded=r=>{const o=r.target.result;o.objectStoreNames.contains(u)||o.createObjectStore(u,{keyPath:"id"})}})}async function N(i){(await v()).transaction(u,"readwrite").objectStore(u).put(i)}async function q(){const i=await v();return new Promise(e=>{const r=i.transaction(u,"readonly").objectStore(u).getAll();r.onsuccess=()=>e(r.result)})}class M{constructor(e){this.view=e,this.model=new y}async init(){const e=localStorage.getItem("token");if(!e){console.warn("Token tidak ditemukan. Redirect ke login..."),window.location.hash="#/login";return}try{const{listStory:t}=await this.model.getAllStories(e);this.view.renderStories(t);for(const r of t)await N(r)}catch(t){console.error("Gagal mengambil cerita dari API, coba load dari IndexedDB:",t);const r=await q();this.view.renderStories(r)}}}class p{constructor(e){this.container=e,this.presenter=new M(this),this.render()}render(){this.container.innerHTML=`
      <section aria-label="Daftar cerita" id="storyList" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4"></section>
    `,this.presenter.init()}renderStories(e){const t=this.container.querySelector("#storyList");t.innerHTML="",e.forEach(r=>{const o=this.createStoryCard(r);t.appendChild(o)})}createStoryCard(e){const t=document.createElement("article");t.className="bg-white p-4 rounded shadow hover:shadow-lg transition focus:outline-none focus:ring-2 focus:ring-blue-400",t.setAttribute("tabindex","0"),t.setAttribute("role","link"),t.setAttribute("aria-label",`Lihat detail cerita oleh ${e.name}`);const r=document.createElement("figure");r.className="mb-2";const o=document.createElement("img");o.src=e.photoUrl,o.alt=`Foto dari cerita oleh ${e.name}`,o.className="w-full h-48 object-cover rounded";const a=document.createElement("figcaption");a.className="sr-only",a.textContent=`Foto cerita oleh ${e.name}`,r.appendChild(o),r.appendChild(a);const s=document.createElement("h2");s.className="text-gray-800 font-semibold text-lg mb-1",s.textContent=e.description,s.setAttribute("tabindex","0");const n=document.createElement("p");return n.className="text-sm text-gray-500",n.textContent=`Oleh: ${e.name}`,t.appendChild(r),t.appendChild(s),t.appendChild(n),t.addEventListener("click",()=>{window.location.hash=`#/detail/${e.id}`}),t.addEventListener("keypress",h=>{h.key==="Enter"&&(window.location.hash=`#/detail/${e.id}`)}),t}showAlert(e){alert(e)}redirectToLogin(){window.location.hash="#/login"}}class D{constructor(e){this.view=e,this.model=new y,this.capturedFromCamera=!1,this.selectedCoords=null}async handleFormSubmit(e){e.preventDefault();const t=this.model.getToken();if(!t){this.view.showAlert("Anda belum login!"),this.view.stopCamera(),this.view.redirectToLogin();return}const{description:r,photo:o}=this.view.getFormData(),a=new FormData;a.append("description",r);let s;if(this.capturedFromCamera)s=await this.view.canvasToBlob(),a.append("photo",s,"captured.jpg");else if(o&&o.size>0){if(o.size>1e6){this.view.showAlert("Ukuran gambar terlalu besar! Maksimal 1MB.");return}a.append("photo",o)}else{this.view.showAlert("Silakan unggah atau ambil gambar terlebih dahulu!");return}try{const n=this.selectedCoords||await this.view.getUserLocation();n&&(a.append("lat",n.lat),a.append("lon",n.lon))}catch(n){console.warn("Gagal mengambil lokasi:",n.message)}try{const n=await this.model.addNewStory(a,t);if(!n.error)this.view.showAlert("Cerita berhasil dikirim!"),this.view.stopCamera(),this.view.redirectToHome();else throw new Error(n.message)}catch(n){console.error(n),this.view.showAlert(`Error: ${n.message}`)}}capturePhoto(){this.view.captureToCanvas(),this.capturedFromCamera=!0,this.view.stopCamera()}initMap(){const e=L.map("map").setView([-6.2,106.816666],13);L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:"&copy; OpenStreetMap contributors"}).addTo(e);let t;e.on("click",r=>{const{lat:o,lng:a}=r.latlng;this.selectedCoords={lat:o,lon:a},t?t.setLatLng(r.latlng):t=L.marker(r.latlng).addTo(e)})}}class O{constructor(e){this.container=e,this.presenter=new D(this),this.stream=null,window.addEventListener("hashchange",()=>this.stopCamera()),this.render()}render(){this.container.innerHTML=`
      <form id="storyForm" class="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg space-y-5" aria-labelledby="formTitle" novalidate>
        <h2 id="formTitle" class="sr-only">Form Tambah Cerita</h2>

        <div>
          <label for="description" class="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
          <textarea id="description" required rows="4" class="w-full border border-gray-300 rounded-md p-2" aria-required="true" aria-describedby="descHelp"></textarea>
          <div id="descHelp" class="sr-only">Masukkan deskripsi cerita minimal 10 kata.</div>
        </div>

        <div>
          <label for="photo" class="block text-sm font-medium text-gray-700 mb-1">Gambar</label>
          <input 
            type="file" 
            id="photo" 
            accept="image/*" 
            capture="environment" 
            class="mb-2 bg-gray-500 text-white px-3 py-1 w-full" 
            aria-describedby="photoHelp"
            aria-label="Upload atau ambil gambar cerita" 
          />
          <div id="photoHelp" class="sr-only">Anda dapat memilih file gambar atau menggunakan kamera untuk mengambil foto.</div>

          <div class="flex gap-2">
            <button 
              type="button" 
              id="openCameraBtn" 
              class="bg-blue-500 text-white px-4 py-1 rounded" 
              aria-controls="cameraContainer" 
              aria-expanded="false"
              aria-label="Buka kamera untuk mengambil gambar"
            >Buka Kamera</button>

            <button 
              type="button" 
              id="closeCameraBtn" 
              class="bg-gray-500 text-white px-4 py-1 rounded hidden" 
              aria-controls="cameraContainer"
              aria-expanded="true"
              aria-label="Tutup kamera"
            >Tutup Kamera</button>
          </div>

          <div 
            class="mt-2 hidden" 
            id="cameraContainer" 
            role="region" 
            aria-live="polite" 
            aria-label="Pratinjau kamera dan kontrol pengambilan gambar"
          >
            <video id="cameraPreview" autoplay playsinline class="w-full rounded object-contain" aria-label="Tampilan kamera"></video>
            <button 
              type="button" 
              id="captureBtn" 
              class="mt-2 bg-green-600 text-white px-4 py-1 rounded" 
              aria-label="Ambil gambar dari kamera"
            >Ambil Gambar</button>
            <canvas id="cameraCanvas" class="hidden mt-2 w-full" aria-hidden="true"></canvas>
          </div>
        </div>

        <div>
          <label for="map" class="block text-sm font-medium text-gray-700 mb-1">Pilih Lokasi (klik peta)</label>
          <div id="map" class="w-full h-64 rounded border border-gray-300" role="application" aria-label="Peta digital untuk memilih lokasi"></div>
        </div>

        <button 
          type="submit" 
          class="w-full bg-blue-600 text-white py-2 rounded"
          aria-label="Kirim cerita"
        >Kirim</button>
      </form>
    `;const e=document.getElementById("openCameraBtn"),t=document.getElementById("closeCameraBtn");document.getElementById("cameraContainer"),e.addEventListener("click",()=>this.openCamera()),t.addEventListener("click",()=>this.stopCamera()),document.querySelector("#storyForm").addEventListener("submit",r=>this.presenter.handleFormSubmit(r)),document.querySelector("#captureBtn").addEventListener("click",()=>this.presenter.capturePhoto()),this.presenter.initMap()}async openCamera(){try{if(this.stream)return;this.stream=await navigator.mediaDevices.getUserMedia({video:!0}),this.setVideoStream(this.stream),this.showCameraUI()}catch(e){this.showAlert("Gagal membuka kamera: "+e.message)}}stopCamera(){this.stream&&(this.stream.getTracks().forEach(e=>e.stop()),this.stream=null),this.hideCameraUI()}async getUserLocation(){return new Promise((e,t)=>{navigator.geolocation.getCurrentPosition(r=>e({lat:r.coords.latitude,lon:r.coords.longitude}),r=>t(r))})}getFormData(){return{description:document.getElementById("description").value,photo:document.getElementById("photo").files[0]}}showAlert(e){alert(e)}redirectToLogin(){window.location.hash="#/login"}redirectToHome(){window.location.hash="#/"}showCameraUI(){document.getElementById("cameraContainer").classList.remove("hidden"),document.getElementById("closeCameraBtn").classList.remove("hidden"),document.getElementById("openCameraBtn").setAttribute("aria-expanded","true")}hideCameraUI(){document.getElementById("cameraContainer").classList.add("hidden"),document.getElementById("closeCameraBtn").classList.add("hidden"),document.getElementById("openCameraBtn").setAttribute("aria-expanded","false")}setVideoStream(e){document.getElementById("cameraPreview").srcObject=e}captureToCanvas(){const e=document.getElementById("cameraPreview"),t=document.getElementById("cameraCanvas"),r=t.getContext("2d"),o=e.videoWidth,a=e.videoHeight;t.width=o,t.height=a,r.drawImage(e,0,0,o,a),t.classList.remove("hidden")}canvasToBlob(){return new Promise(e=>{document.getElementById("cameraCanvas").toBlob(r=>e(r),"image/jpeg")})}}class k{constructor(e,t){this.view=e,this.model=t}async login(e,t){try{const r=await this.model.login(e,t);if(r.error)throw new Error(r.message);this.view.onLoginSuccess(r.loginResult.token)}catch(r){this.view.showError(r.message)}}async register(e,t,r){try{const o=await this.model.register(e,t,r);if(o.error)throw new Error(o.message);this.view.onRegisterSuccess()}catch(o){this.view.showError(o.message)}}}class w{static async request(e,t="GET",r=null,o=null,a=!1){const s={};return o&&(s.Authorization=`Bearer ${o}`),a||(s["Content-Type"]="application/json"),(await fetch(`${this.baseUrl}${e}`,{method:t,headers:s,body:a?r:r&&JSON.stringify(r)})).json()}static register(e){return this.request("/register","POST",e)}static login(e){return this.request("/login","POST",e)}static getStories(e){return this.request("/stories?location=1","GET",null,e)}static addStory(e,t){return this.request("/stories","POST",e,t,!0)}}f(w,"baseUrl","https://story-api.dicoding.dev/v1");class g{async login(e,t){return w.login({email:e,password:t})}async register(e,t,r){return w.register({name:e,email:t,password:r})}saveToken(e){localStorage.setItem("token",e)}getToken(){return localStorage.getItem("token")}removeToken(){localStorage.removeItem("token")}isAuthenticated(){return!!this.getToken()}}class j{constructor(e){this.container=e;const t=new g;this.presenter=new k(this,t),this.render()}render(){this.container.innerHTML=`
      <section class="p-4 max-w-md mx-auto flex justify-center items-center flex-col h-screen" role="main" aria-labelledby="LoginTitle">
        <h2 id="loginTitle" class="text-2xl font-bold mb-4">Login</h2>
        <form id="loginForm" class="space-y-4 min-w-full flex flex-col" novalidate aria-describedby="errorMsg">
          <label for="email" class="block">
            Email
            </label>
            <input type="email" id="email" name="email" class="border p-2 w-full" required aria-required="true" aria-label="Masukkan email Anda" />
          <label for="password" class="block">
            Password
            </label>
            <input type="password" id="password" name="password" class="border p-2 w-full" required aria-required="true" aria-label="Masukkan kata sandi Anda" />
          <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded" aria-label="Tombol login">Login</button>
          <p id="errorMsg" class="text-red-500 mt-2" role="alert" aria-live="assertive"></p>
        </form>
    `,document.querySelector("#email").focus(),document.querySelector("#loginForm").addEventListener("submit",e=>{e.preventDefault();const t=document.getElementById("email").value,r=document.getElementById("password").value;this.presenter.login(t,r)})}onLoginSuccess(e){new g().saveToken(e),window.dispatchEvent(new Event("authChanged")),window.location.hash="#/"}showError(e){document.getElementById("errorMsg").textContent=e}}class H{constructor(e){this.container=e;const t=new g;this.presenter=new k(this,t),this.render()}render(){this.container.innerHTML=`
      <section class="p-4 max-w-md mx-auto flex justify-center items-center flex-col h-screen" role="main" aria-labelledby="registerTitle">
        <h2 class="text-2xl font-bold mb-4">Register</h2>
        <form id="registerForm" class="space-y-4 flex flex-col min-w-full" aria-describedby="errorMsg">
          <label for="name">Nama</label>
            
            <input type="text" id="name" name="name"  class="border p-2 w-full" required />
          
          <label for="email">
            Email
            </label>
            <input type="email" id="email" name="email"  class="border p-2 w-full" required />
          <label for="password">
            Password
            </label>
            <input type="password" name="password" id="password" class="border p-2 w-full" required />
          <button type="submit" class="bg-green-600 text-white px-4 py-2 rounded mt-4">Daftar</button>
          <p id="errorMsg" class="text-red-500 mt-2"></p>
        </form>
      </section>
    `,document.querySelector("#name").focus(),document.querySelector("#registerForm").addEventListener("submit",e=>{e.preventDefault();const t=document.getElementById("name").value,r=document.getElementById("email").value,o=document.getElementById("password").value;this.presenter.register(t,r,o)})}onRegisterSuccess(){alert("Registrasi berhasil! Silakan login."),window.location.hash="#/login"}showError(e){document.getElementById("errorMsg").textContent=e}}class ${constructor(e){this.container=e,window.addEventListener("hashchange",()=>this.render()),window.addEventListener("load",()=>this.render())}async render(){const e=window.location.hash,t=this.container,r=async()=>{if(e.startsWith("#/detail/")){const s=e.split("/")[2],n=await A(()=>import("./Detail-BMnUXT-O.js"),[]);new n.default(t,s);return}const a={"":p,"#/":p,"#/add":O,"#/login":j,"#/register":H}[e]||p;new a(t)};document.startViewTransition?document.startViewTransition(()=>r()):await r()}}class F{constructor(e){this.root=e}render(e){this.root.innerHTML=`
      <header class="bg-blue-600 text-white p-4 shadow-md">
        <div class="container mx-auto flex justify-between items-center">
          <a 
            href="#main-content"
            class="skip-link sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:bg-white focus:text-blue-600 focus:p-2 focus:rounded focus:shadow-lg focus:z-50"
          >
            Skip to content
          </a>
          <h1 class="text-lg font-bold">
            <a href="#/">Dicoding Story</a>
          </h1>
          <nav class="space-x-4">
            <button id="toggleNotifBtn" class="hover:bg-blue-500 p-2 rounded-md">Aktifkan Notifikasi</button>
            ${e?`
                <a href="#/" class="hover:bg-blue-500 p-2 rounded-md">Cerita</a>
                <a href="#/add" class="hover:bg-blue-500 p-2 rounded-md">Tambah Cerita</a>
                <button id="logoutBtn" class="hover:bg-blue-500 p-2 rounded-md">Logout</button>
              `:`
                <a href="#/login" class="hover:bg-blue-500 p-2 rounded-md">Login</a>
                <a href="#/register" class="hover:bg-blue-500 p-2 rounded-md">Register</a>
              `}
          </nav>
        </div>
      </header>
    `}bindLogout(e){const t=this.root.querySelector("#logoutBtn");t&&t.addEventListener("click",r=>{r.preventDefault(),e()})}bindSkipLink(){const e=this.root.querySelector(".skip-link"),t=document.querySelector("#main-content");e&&t&&e.addEventListener("click",function(r){r.preventDefault(),e.blur(),t.setAttribute("tabindex","-1"),t.focus(),t.scrollIntoView({behavior:"smooth"})})}redirectToLogin(){window.location.hash="#/login"}notifyAuthChanged(){window.dispatchEvent(new Event("authChanged"))}bindNotificationToggle(e){const t=this.root.querySelector("#toggleNotifBtn");t&&t.addEventListener("click",()=>{e()})}updateNotifButtonState(e){const t=this.root.querySelector("#toggleNotifBtn");t&&(t.textContent=e?"Nonaktifkan Notifikasi":"Aktifkan Notifikasi")}}class U{constructor(e){this.view=e,this.model=new g,this.notifEnabled=!1,window.addEventListener("authChanged",()=>this.render()),this.render()}handleLogout(){this.model.removeToken(),this.view.notifyAuthChanged(),this.view.redirectToLogin()}render(){const e=this.model.isAuthenticated();this.view.render(e),this.view.bindLogout(this.handleLogout.bind(this)),this.view.bindSkipLink(),this.view.bindNotificationToggle(this.handleToggleNotif.bind(this))}async handleToggleNotif(){if(!("Notification"in window)){alert("Browser tidak mendukung notifikasi!");return}if(this.notifEnabled){const t=await(await navigator.serviceWorker.ready).pushManager.getSubscription();if(t){const{endpoint:r}=t,o=this.model.getToken();await fetch("https://story-api.dicoding.dev/v1/notifications/subscribe",{method:"DELETE",headers:{Authorization:`Bearer ${o}`,"Content-Type":"application/json"},body:JSON.stringify({endpoint:r})}),await t.unsubscribe()}this.notifEnabled=!1,this.view.updateNotifButtonState(!1),alert("Notifikasi dimatikan.")}else{if(await Notification.requestPermission()!=="granted"){alert("Izin notifikasi ditolak.");return}this.notifEnabled=!0,this.view.updateNotifButtonState(!0),this.showNotification("Notifikasi diaktifkan!");const r=await(await navigator.serviceWorker.ready).pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:this.urlBase64ToUint8Array("BCCs2eonMI-6H2ctvFaWg-UYdDv387Vno_bzUzALpB442r2lCnsHmtrx8biyPi_E-1fSGABK_Qs_GlvPoJJqxbk")}),o=this.model.getToken(),{endpoint:a,keys:s}=r.toJSON();await fetch("https://story-api.dicoding.dev/v1/notifications/subscribe",{method:"POST",headers:{Authorization:`Bearer ${o}`,"Content-Type":"application/json"},body:JSON.stringify({endpoint:a,keys:{p256dh:s.p256dh,auth:s.auth}})})}}showNotification(e){navigator.serviceWorker.ready.then(t=>{t.showNotification("Dicoding Story",{body:e,icon:"/pwa-192x192.png",data:{url:"/"}})})}}class V extends HTMLElement{connectedCallback(){this.view=new F(this),this.presenter=new U(this.view)}}customElements.define("header-custom",V);class R extends HTMLElement{connectedCallback(){this.render()}render(){this.innerHTML=`
		<footer class="bg-blue-500 text-white text-xs sm:text-sm md:text-base py-3 mt-6 rounded-t-3xl shadow-inner">
   <div class="flex items-center justify-center space-x-2 select-none px-8 max-w-screen-lg mx-auto">
	 <hr class="border-white border-t border-opacity-50 flex-grow"/>
	 <span class="flex items-center whitespace-nowrap">
	   &copy; 2025 StoryApp | DBSdicoding
	 </span>
	 <hr class="border-white border-t border-opacity-50 flex-grow"/>
   </div>
 </footer>
	 `}}customElements.define("footer-custom",R);document.addEventListener("DOMContentLoaded",()=>{new $(document.querySelector("#app"))});"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("/sw.js").then(i=>{console.log("Service Worker registered:",i.scope)}).catch(i=>{console.error("Service Worker registration failed:",i)})});export{g as A,y as S};
