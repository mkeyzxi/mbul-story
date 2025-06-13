import{S as r,A as o}from"./index-CRnWHiyQ.js";class s{constructor(t,e){this.container=t,this.onRedirect=e}triggerRedirect(){var t;(t=this.onRedirect)==null||t.call(this)}renderStory(t){this.container.innerHTML=`
      <article class="max-w-xl mx-auto p-4 bg-white shadow rounded space-y-4" role="main" aria-labelledby="storyTitle">
        <img src="${t.photoUrl}" alt="Foto cerita oleh ${t.name}" class="w-full h-64 object-cover rounded">
        <p class="text-gray-700">Dibuat : ${new Date(t.createdAt).toLocaleDateString()}</p>
        <h1 id="storyTitle" class="text-xl font-bold">${t.name}</h1>
        <p class="text-gray-700">${t.description}</p>
        <p class="text-sm text-gray-500" aria-label="Koordinat lokasi cerita">Lat: ${t.lat}, Lon: ${t.lon}</p>
        <section id="map" class="w-full h-64 rounded border" role="region" aria-label="Peta lokasi cerita"></section>
      </article>
    `,this.initMap(t.lat,t.lon)}renderError(t){this.container.innerHTML=`<p class="text-red-600">Gagal memuat detail cerita: ${t}</p>`}initMap(t,e){const i=L.map("map").setView([t,e],13);L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(i),L.marker([t,e]).addTo(i).bindPopup("Lokasi cerita ini").openPopup()}}class n{constructor(t,e){this.view=t,this.storyId=e,this.storyModel=new r,this.authModel=new o,this.init()}async init(){const t=this.authModel.getToken();if(!t){this.view.triggerRedirect();return}try{const e=await this.storyModel.getStoryById(this.storyId,t);this.view.renderStory(e)}catch(e){this.view.renderError(e.message)}}}class c{constructor(t,e){const i=new s(t,()=>{window.location.hash="#/login"});new n(i,e)}}export{c as default};
