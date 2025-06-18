var F=Object.defineProperty;var G=(n,e,t)=>e in n?F(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t;var T=(n,e,t)=>G(n,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const a of i)if(a.type==="childList")for(const s of a.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&r(s)}).observe(document,{childList:!0,subtree:!0});function t(i){const a={};return i.integrity&&(a.integrity=i.integrity),i.referrerPolicy&&(a.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?a.credentials="include":i.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function r(i){if(i.ep)return;i.ep=!0;const a=t(i);fetch(i.href,a)}})();const U="modulepreload",W=function(n){return"/"+n},A={},N=function(e,t,r){let i=Promise.resolve();if(t&&t.length>0){let s=function(l){return Promise.all(l.map(h=>Promise.resolve(h).then(g=>({status:"fulfilled",value:g}),g=>({status:"rejected",reason:g}))))};document.getElementsByTagName("link");const o=document.querySelector("meta[property=csp-nonce]"),c=(o==null?void 0:o.nonce)||(o==null?void 0:o.getAttribute("nonce"));i=s(t.map(l=>{if(l=W(l),l in A)return;A[l]=!0;const h=l.endsWith(".css"),g=h?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${g}`))return;const d=document.createElement("link");if(d.rel=h?"stylesheet":U,h||(d.as="script"),d.crossOrigin="",d.href=l,c&&d.setAttribute("nonce",c),document.head.appendChild(d),h)return new Promise((V,$)=>{d.addEventListener("load",V),d.addEventListener("error",()=>$(new Error(`Unable to preload CSS for ${l}`)))})}))}function a(s){const o=new Event("vite:preloadError",{cancelable:!0});if(o.payload=s,window.dispatchEvent(o),!o.defaultPrevented)throw s}return i.then(s=>{for(const o of s||[])o.status==="rejected"&&a(o.reason);return e().catch(a)})};class q{getToken(){return localStorage.getItem("token")}async getAllStories(e){try{const t=await fetch("https://story-api.dicoding.dev/v1/stories",{headers:{Authorization:`Bearer ${e}`}}),r=await t.json();if(!t.ok)throw new Error(r.message||"Gagal mengambil data");return r}catch(t){return{error:!0,message:t.message}}}async addNewStory(e,t){try{const r=await fetch("https://story-api.dicoding.dev/v1/stories",{method:"POST",headers:{Authorization:`Bearer ${t}`},body:e}),i=await r.json();if(!r.ok)throw new Error(i.message||"Gagal menambahkan cerita");return i}catch(r){return{error:!0,message:r.message}}}async getStoryById(e,t){try{const r=await fetch(`https://story-api.dicoding.dev/v1/stories/${e}`,{headers:{Authorization:`Bearer ${t}`}}),i=await r.json();if(!r.ok||i.error)throw new Error(i.message||"Gagal mengambil data detail");return i.story}catch(r){throw new Error(r.message||"Gagal mengambil data detail")}}}const k=(n,e)=>e.some(t=>n instanceof t);let P,I;function R(){return P||(P=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function z(){return I||(I=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const S=new WeakMap,w=new WeakMap,b=new WeakMap;function K(n){const e=new Promise((t,r)=>{const i=()=>{n.removeEventListener("success",a),n.removeEventListener("error",s)},a=()=>{t(u(n.result)),i()},s=()=>{r(n.error),i()};n.addEventListener("success",a),n.addEventListener("error",s)});return b.set(e,n),e}function J(n){if(S.has(n))return;const e=new Promise((t,r)=>{const i=()=>{n.removeEventListener("complete",a),n.removeEventListener("error",s),n.removeEventListener("abort",s)},a=()=>{t(),i()},s=()=>{r(n.error||new DOMException("AbortError","AbortError")),i()};n.addEventListener("complete",a),n.addEventListener("error",s),n.addEventListener("abort",s)});S.set(n,e)}let x={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return S.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return u(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function O(n){x=n(x)}function Q(n){return z().includes(n)?function(...e){return n.apply(E(this),e),u(this.request)}:function(...e){return u(n.apply(E(this),e))}}function Y(n){return typeof n=="function"?Q(n):(n instanceof IDBTransaction&&J(n),k(n,R())?new Proxy(n,x):n)}function u(n){if(n instanceof IDBRequest)return K(n);if(w.has(n))return w.get(n);const e=Y(n);return e!==n&&(w.set(n,e),b.set(e,n)),e}const E=n=>b.get(n);function X(n,e,{blocked:t,upgrade:r,blocking:i,terminated:a}={}){const s=indexedDB.open(n,e),o=u(s);return r&&s.addEventListener("upgradeneeded",c=>{r(u(s.result),c.oldVersion,c.newVersion,u(s.transaction),c)}),t&&s.addEventListener("blocked",c=>t(c.oldVersion,c.newVersion,c)),o.then(c=>{a&&c.addEventListener("close",()=>a()),i&&c.addEventListener("versionchange",l=>i(l.oldVersion,l.newVersion,l))}).catch(()=>{}),o}const Z=["get","getKey","getAll","getAllKeys","count"],ee=["put","add","delete","clear"],y=new Map;function D(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(y.get(e))return y.get(e);const t=e.replace(/FromIndex$/,""),r=e!==t,i=ee.includes(t);if(!(t in(r?IDBIndex:IDBObjectStore).prototype)||!(i||Z.includes(t)))return;const a=async function(s,...o){const c=this.transaction(s,i?"readwrite":"readonly");let l=c.store;return r&&(l=l.index(o.shift())),(await Promise.all([l[t](...o),i&&c.done]))[0]};return y.set(e,a),a}O(n=>({...n,get:(e,t,r)=>D(e,t)||n.get(e,t,r),has:(e,t)=>!!D(e,t)||n.has(e,t)}));const te=["continue","continuePrimaryKey","advance"],M={},C=new WeakMap,j=new WeakMap,re={get(n,e){if(!te.includes(e))return n[e];let t=M[e];return t||(t=M[e]=function(...r){C.set(this,j.get(this)[e](...r))}),t}};async function*ne(...n){let e=this;if(e instanceof IDBCursor||(e=await e.openCursor(...n)),!e)return;e=e;const t=new Proxy(e,re);for(j.set(t,e),b.set(t,E(e));e;)yield t,e=await(C.get(t)||e.continue()),C.delete(t)}function _(n,e){return e===Symbol.asyncIterator&&k(n,[IDBIndex,IDBObjectStore,IDBCursor])||e==="iterate"&&k(n,[IDBIndex,IDBObjectStore])}O(n=>({...n,get(e,t,r){return _(e,t)?ne:n.get(e,t,r)},has(e,t){return _(e,t)||n.has(e,t)}}));const ie="StoryAppDB",m="stories",ae=1;class se{constructor(){this._dbPromise=X(ie,ae,{upgrade(e){e.objectStoreNames.contains(m)||e.createObjectStore(m,{keyPath:"id"})}})}async addStory(e){return(await this._dbPromise).put(m,e)}async getAllStories(){return(await this._dbPromise).getAll(m)}async getStoryById(e){return(await this._dbPromise).get(m,e)}async deleteStory(e){return(await this._dbPromise).delete(m,e)}}const B=new se,oe=Object.freeze(Object.defineProperty({__proto__:null,default:B},Symbol.toStringTag,{value:"Module"}));class le{constructor(e){this.view=e,this.model=new q}async init(){const e=localStorage.getItem("token");if(!e){console.warn("Token tidak ditemukan. Redirect ke login..."),this.view.redirectToLogin();return}try{const{listStory:t}=await this.model.getAllStories(e);this.view.renderStories(t)}catch(t){console.error("Gagal mengambil cerita dari API, coba load dari IndexedDB:",t);const r=await B.getAllStories();r.length>0?(this.view.showAlert("Gagal terhubung ke server. Menampilkan cerita dari penyimpanan offline."),this.view.renderStories(r)):this.view.showAlert("Gagal memuat cerita. Periksa koneksi internet Anda atau coba lagi nanti.")}}}class ce extends HTMLElement{constructor(){super(),this._story=null,this._onSaveCallback=null}setStory(e,t){this._story=e,this._onSaveCallback=t,this.render(),this._addEventListeners()}render(){if(!this._story){this.innerHTML="<p>Story data is missing.</p>";return}this.innerHTML=`
      <article class="story-card-container border rounded-lg overflow-hidden shadow bg-white p-4 cursor-pointer">
        <img src="${this._story.photoUrl}" alt="Story by ${this._story.name}" class="w-full h-48 object-cover rounded-md mb-3" />
        <div class="story-info">
        <p class="text-sm text-gray-600 mb-3">${this._story.description}</p>
        <h2 class="font-semibold text-lg text-gray-800 mb-1">${this._story.name}</h2>
          <button class="save-story-btn bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
            Simpan Story
          </button>
        </div>
      </article>
    `,this._updateButtonState()}_addEventListeners(){const e=this.querySelector(".save-story-btn"),t=this.querySelector(".story-card-container");e&&e.addEventListener("click",async r=>{r.stopPropagation(),this._onSaveCallback&&(await this._onSaveCallback(this._story),alert(`Story "${this._story.name}" berhasil disimpan!`),this._updateButtonState())}),t&&(t.addEventListener("click",()=>{window.location.hash=`#/detail/${this._story.id}`}),t.addEventListener("keypress",r=>{r.key==="Enter"&&(window.location.hash=`#/detail/${this._story.id}`)}))}async _updateButtonState(){const t=await(await N(()=>Promise.resolve().then(()=>oe),void 0)).default.getStoryById(this._story.id),r=this.querySelector(".save-story-btn");r&&(t?(r.textContent="Tersimpan",r.disabled=!0,r.classList.remove("bg-blue-500","hover:bg-blue-600"),r.classList.add("bg-gray-400","cursor-not-allowed")):(r.textContent="Simpan Story",r.disabled=!1,r.classList.add("bg-blue-500","hover:bg-blue-600"),r.classList.remove("bg-gray-400","cursor-not-allowed")))}}customElements.define("story-item",ce);class v{constructor(e){this.container=e,this.presenter=new le(this),this.render()}render(){this.container.innerHTML=`
      <main id="main-content" class="container mx-auto py-8">
        <h1 class="text-3xl font-bold text-center mb-6">Cerita Terbaru</h1>
        <section aria-label="Daftar cerita" id="storyList" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4"></section>
      </main>
    `,this.presenter.init()}renderStories(e){const t=this.container.querySelector("#storyList");if(t.innerHTML="",e.length===0){t.innerHTML='<p class="text-center text-gray-500 col-span-full">Tidak ada cerita untuk ditampilkan.</p>';return}e.forEach(r=>{const i=document.createElement("story-item");i.setStory(r,async a=>{try{await B.addStory(a)}catch(s){console.error("Gagal menyimpan story ke IndexedDB:",s),this.showAlert("Gagal menyimpan cerita: "+s.message)}}),t.appendChild(i)})}showAlert(e){alert(e)}redirectToLogin(){window.location.hash="#/login"}}class de{constructor(e){this.view=e,this.model=new q,this.capturedFromCamera=!1,this.selectedCoords=null}async handleFormSubmit(e){e.preventDefault();const t=this.model.getToken();if(!t){this.view.showAlert("Anda belum login!"),this.view.stopCamera(),this.view.redirectToLogin();return}const{description:r,photo:i}=this.view.getFormData(),a=new FormData;a.append("description",r);let s;if(this.capturedFromCamera)s=await this.view.canvasToBlob(),a.append("photo",s,"captured.jpg");else if(i&&i.size>0){if(i.size>1e6){this.view.showAlert("Ukuran gambar terlalu besar! Maksimal 1MB.");return}a.append("photo",i)}else{this.view.showAlert("Silakan unggah atau ambil gambar terlebih dahulu!");return}try{const o=this.selectedCoords||await this.view.getUserLocation();o&&(a.append("lat",o.lat),a.append("lon",o.lon))}catch(o){console.warn("Gagal mengambil lokasi:",o.message)}try{const o=await this.model.addNewStory(a,t);if(!o.error)this.view.showAlert("Cerita berhasil dikirim!"),this.view.stopCamera(),this.view.redirectToHome();else throw new Error(o.message)}catch(o){console.error(o),this.view.showAlert(`Error: ${o.message}`)}}capturePhoto(){this.view.captureToCanvas(),this.capturedFromCamera=!0,this.view.stopCamera()}initMap(){const e=L.map("map").setView([-6.2,106.816666],13);L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:"&copy; OpenStreetMap contributors"}).addTo(e);let t;e.on("click",r=>{const{lat:i,lng:a}=r.latlng;this.selectedCoords={lat:i,lon:a},t?t.setLatLng(r.latlng):t=L.marker(r.latlng).addTo(e)})}}class ue{constructor(e){this.container=e,this.presenter=new de(this),this.stream=null,this.elements={},window.addEventListener("hashchange",()=>this.stopCamera()),this.render()}render(){this.container.innerHTML=`
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
    `,this.elements={description:this.container.querySelector("#description"),photoInput:this.container.querySelector("#photo"),openCameraBtn:this.container.querySelector("#openCameraBtn"),closeCameraBtn:this.container.querySelector("#closeCameraBtn"),cameraContainer:this.container.querySelector("#cameraContainer"),cameraPreview:this.container.querySelector("#cameraPreview"),captureBtn:this.container.querySelector("#captureBtn"),cameraCanvas:this.container.querySelector("#cameraCanvas"),storyForm:this.container.querySelector("#storyForm"),map:this.container.querySelector("#map")},this.elements.openCameraBtn.addEventListener("click",()=>this.openCamera()),this.elements.closeCameraBtn.addEventListener("click",()=>this.stopCamera()),this.elements.storyForm.addEventListener("submit",e=>this.presenter.handleFormSubmit(e)),this.elements.captureBtn.addEventListener("click",()=>this.presenter.capturePhoto()),this.presenter.initMap()}async openCamera(){try{if(this.stream)return;this.stream=await navigator.mediaDevices.getUserMedia({video:!0}),this.setVideoStream(this.stream),this.showCameraUI()}catch(e){this.showAlert("Gagal membuka kamera: "+e.message),console.error("Error opening camera:",e),this.stopCamera()}}stopCamera(){this.stream&&(this.stream.getTracks().forEach(e=>e.stop()),this.stream=null),this.hideCameraUI()}async getUserLocation(){return new Promise((e,t)=>{if(!("geolocation"in navigator)){t(new Error("Geolocation tidak didukung oleh browser ini."));return}navigator.geolocation.getCurrentPosition(r=>e({lat:r.coords.latitude,lon:r.coords.longitude}),r=>{console.warn("Gagal mendapatkan lokasi:",r),t(new Error("Gagal mendapatkan lokasi Anda. Izinkan akses lokasi atau pilih secara manual di peta."))},{enableHighAccuracy:!0,timeout:5e3,maximumAge:0})})}getFormData(){return{description:this.elements.description.value,photo:this.elements.photoInput.files[0]}}showAlert(e){alert(e)}redirectToLogin(){window.location.hash="#/login"}redirectToHome(){window.location.hash="#/"}showCameraUI(){this.elements.cameraContainer&&(this.elements.cameraContainer.classList.remove("hidden"),this.elements.cameraContainer.setAttribute("aria-expanded","true")),this.elements.closeCameraBtn&&this.elements.closeCameraBtn.classList.remove("hidden"),this.elements.openCameraBtn&&(this.elements.openCameraBtn.classList.add("hidden"),this.elements.openCameraBtn.setAttribute("aria-expanded","true")),this.elements.cameraCanvas&&this.elements.cameraCanvas.classList.add("hidden")}hideCameraUI(){this.elements.cameraContainer&&(this.elements.cameraContainer.classList.add("hidden"),this.elements.cameraContainer.setAttribute("aria-expanded","false")),this.elements.closeCameraBtn&&this.elements.closeCameraBtn.classList.add("hidden"),this.elements.openCameraBtn&&(this.elements.openCameraBtn.classList.remove("hidden"),this.elements.openCameraBtn.setAttribute("aria-expanded","false")),this.elements.cameraPreview&&this.elements.cameraPreview.srcObject&&(this.elements.cameraPreview.srcObject.getTracks().forEach(e=>e.stop()),this.elements.cameraPreview.srcObject=null)}setVideoStream(e){this.elements.cameraPreview&&(this.elements.cameraPreview.srcObject=e)}captureToCanvas(){const e=this.elements.cameraPreview,t=this.elements.cameraCanvas;if(!e||!t){console.error("Video or Canvas element not found for capture.");return}const r=t.getContext("2d"),i=e.videoWidth,a=e.videoHeight;t.width=i,t.height=a,r.drawImage(e,0,0,i,a),t.classList.remove("hidden"),e.classList.add("hidden")}canvasToBlob(){return new Promise((e,t)=>{const r=this.elements.cameraCanvas;if(!r){t(new Error("Canvas element not found for blob conversion."));return}r.toBlob(i=>{i?e(i):t(new Error("Failed to convert canvas to blob."))},"image/jpeg")})}}class H{constructor(e,t){this.view=e,this.model=t}async login(e,t){try{const r=await this.model.login(e,t);if(r.error)throw new Error(r.message);this.view.onLoginSuccess(r.loginResult.token)}catch(r){this.view.showError(r.message)}}async register(e,t,r){try{const i=await this.model.register(e,t,r);if(i.error)throw new Error(i.message);this.view.onRegisterSuccess()}catch(i){this.view.showError(i.message)}}}class f{static async request(e,t="GET",r=null,i=null,a=!1){const s={};return i&&(s.Authorization=`Bearer ${i}`),a||(s["Content-Type"]="application/json"),(await fetch(`${this.baseUrl}${e}`,{method:t,headers:s,body:a?r:r&&JSON.stringify(r)})).json()}static register(e){return this.request("/register","POST",e)}static login(e){return this.request("/login","POST",e)}static getStories(e){return this.request("/stories?location=1","GET",null,e)}static addStory(e,t){return this.request("/stories","POST",e,t,!0)}static getSubscribed(e,t,r){return fetch(`${this.baseUrl}/notifications/subscribe`,{method:"POST",headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"},body:JSON.stringify({endpoint:t,keys:{p256dh:r.p256dh,auth:r.auth}})})}static getUnsubscribe(e,t){return fetch(`${this.baseUrl}/notifications/subscribe`,{method:"DELETE",headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"},body:JSON.stringify({endpoint:t})})}}T(f,"baseUrl","https://story-api.dicoding.dev/v1");class p{async login(e,t){return f.login({email:e,password:t})}async register(e,t,r){return f.register({name:e,email:t,password:r})}saveToken(e){localStorage.setItem("token",e)}getToken(){return localStorage.getItem("token")}removeToken(){localStorage.removeItem("token")}isAuthenticated(){return!!this.getToken()}}class he{constructor(e){this.container=e;const t=new p;this.presenter=new H(this,t),this.render()}render(){this.container.innerHTML=`
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
    `,document.querySelector("#email").focus(),document.querySelector("#loginForm").addEventListener("submit",e=>{e.preventDefault();const t=document.getElementById("email").value,r=document.getElementById("password").value;this.presenter.login(t,r)})}onLoginSuccess(e){new p().saveToken(e),window.dispatchEvent(new Event("authChanged")),window.location.hash="#/"}showError(e){document.getElementById("errorMsg").textContent=e}}class me{constructor(e){this.container=e;const t=new p;this.presenter=new H(this,t),this.render()}render(){this.container.innerHTML=`
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
    `,document.querySelector("#name").focus(),document.querySelector("#registerForm").addEventListener("submit",e=>{e.preventDefault();const t=document.getElementById("name").value,r=document.getElementById("email").value,i=document.getElementById("password").value;this.presenter.register(t,r,i)})}onRegisterSuccess(){alert("Registrasi berhasil! Silakan login."),window.location.hash="#/login"}showError(e){document.getElementById("errorMsg").textContent=e}}class ge{constructor(e){this.container=e,window.addEventListener("hashchange",()=>this.render()),window.addEventListener("load",()=>this.render())}async render(){const e=window.location.hash,t=this.container,r=async()=>{if(e.startsWith("#/detail/")){const s=e.split("/")[2],o=await N(()=>import("./Detail-ZYEpWZSH.js"),[]);new o.default(t,s);return}const a={"":v,"#/":v,"#/add":ue,"#/login":he,"#/register":me}[e]||v;new a(t)};document.startViewTransition?document.startViewTransition(()=>r()):await r()}}class fe{constructor(e){this.root=e}render(e){this.root.innerHTML=`
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
    `}bindLogout(e){const t=this.root.querySelector("#logoutBtn");t&&t.addEventListener("click",r=>{r.preventDefault(),e()})}bindSkipLink(){const e=this.root.querySelector(".skip-link"),t=document.querySelector("#main-content");e&&t&&e.addEventListener("click",function(r){r.preventDefault(),e.blur(),t.setAttribute("tabindex","-1"),t.focus(),t.scrollIntoView({behavior:"smooth"})})}redirectToLogin(){window.location.hash="#/login"}notifyAuthChanged(){window.dispatchEvent(new Event("authChanged"))}bindNotificationToggle(e){const t=this.root.querySelector("#toggleNotifBtn");t&&t.addEventListener("click",()=>{e()})}updateNotifButtonState(e){const t=this.root.querySelector("#toggleNotifBtn");t&&(t.textContent=e?"Nonaktifkan Notifikasi":"Aktifkan Notifikasi")}}class pe{constructor(e){this.view=e,this.model=new p,this.notifEnabled=!1,window.addEventListener("authChanged",()=>this.render()),this.render()}handleLogout(){this.model.removeToken(),this.view.notifyAuthChanged(),this.view.redirectToLogin()}async render(){const e=this.model.isAuthenticated();this.view.render(e),this.view.bindLogout(this.handleLogout.bind(this)),this.view.bindSkipLink(),this.view.bindNotificationToggle(this.handleToggleNotif.bind(this)),await this._checkSubscriptionStatus()}async _checkSubscriptionStatus(){if(!("serviceWorker"in navigator)||!("PushManager"in window)){console.warn("Push notifications not supported in this browser.");return}try{await(await navigator.serviceWorker.ready).pushManager.getSubscription()?this.notifEnabled=!0:this.notifEnabled=!1,this.view.updateNotifButtonState(this.notifEnabled)}catch(e){console.error("Error checking push subscription status:",e),this.notifEnabled=!1,this.view.updateNotifButtonState(this.notifEnabled)}}async handleToggleNotif(){if(!("Notification"in window)||!("serviceWorker"in navigator)||!("PushManager"in window)){alert("Browser tidak mendukung notifikasi push.");return}const e=Notification.permission;let t,r=null;try{t=await navigator.serviceWorker.ready,r=await t.pushManager.getSubscription()}catch(a){console.error("Error getting service worker registration or subscription:",a),alert("Terjadi kesalahan saat memeriksa langganan notifikasi.");return}const i=this.model.getToken();if(!i){this.view.showAlert("Anda harus login untuk mengelola notifikasi.");return}if(this.notifEnabled)try{if(r){const{endpoint:a}=r;await f.getUnsubscribe(i,a),await r.unsubscribe()}this.notifEnabled=!1,this.view.updateNotifButtonState(!1),alert("Notifikasi dimatikan.")}catch(a){console.error("Gagal berhenti berlangganan push notification:",a),alert("Gagal mematikan notifikasi. Coba lagi.")}else{if(e==="denied"){alert("Anda telah menolak izin notifikasi. Mohon ubah di pengaturan browser Anda.");return}try{r||(r=await t.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:this.urlBase64ToUint8Array("BCCs2eonMI-6H2ctvFaWg-UYdDv387Vno_bzUzALpB442r2lCnsHmtrx8biyPi_E-1fSGABK_Qs_GlvPoJJqxbk")}));const{endpoint:a,keys:s}=r.toJSON();await f.getSubscribed(i,a,s),this.notifEnabled=!0,this.view.updateNotifButtonState(!0),this.showNotification("Notifikasi diaktifkan!")}catch(a){console.error("Gagal berlangganan push notification:",a),Notification.permission==="denied"?alert("Izin notifikasi ditolak. Tidak dapat mengaktifkan notifikasi."):alert("Gagal mengaktifkan notifikasi. Pastikan Anda online dan coba lagi."),this.notifEnabled=!1,this.view.updateNotifButtonState(!1)}}}showNotification(e){navigator.serviceWorker.ready.then(t=>{t.showNotification("Dicoding Story",{body:e,icon:"/pwa-192x192.png",data:{url:"/"}})})}urlBase64ToUint8Array(e){const t="=".repeat((4-e.length%4)%4),r=(e+t).replace(/-/g,"+").replace(/_/g,"/"),i=window.atob(r),a=new Uint8Array(i.length);for(let s=0;s<i.length;++s)a[s]=i.charCodeAt(s);return a}}class be extends HTMLElement{connectedCallback(){this.view=new fe(this),this.presenter=new pe(this.view)}}customElements.define("header-custom",be);class we extends HTMLElement{connectedCallback(){this.render()}render(){this.innerHTML=`
		<footer class="bg-blue-500 text-white text-xs sm:text-sm md:text-base py-3 mt-6 rounded-t-3xl shadow-inner">
   <div class="flex items-center justify-center space-x-2 select-none px-8 max-w-screen-lg mx-auto">
	 <hr class="border-white border-t border-opacity-50 flex-grow"/>
	 <span class="flex items-center whitespace-nowrap">
	   &copy; 2025 StoryApp | DBSdicoding
	 </span>
	 <hr class="border-white border-t border-opacity-50 flex-grow"/>
   </div>
 </footer>
	 `}}customElements.define("footer-custom",we);document.addEventListener("DOMContentLoaded",()=>{new ge(document.querySelector("#app"))});"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("/sw.js").then(n=>{console.log("Service Worker registered:",n.scope)}).catch(n=>{console.error("Service Worker registration failed:",n)})});export{p as A,q as S};
