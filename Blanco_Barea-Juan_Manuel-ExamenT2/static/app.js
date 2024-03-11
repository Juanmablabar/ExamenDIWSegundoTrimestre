var plantilla = document.querySelector("template").content;
var tabla = document.getElementById("paradas");



//Iniciar mapa
map = L.map('mapa').setView([36.719332, -4.423457], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

function addToMap(data){
 
    let marker = L.marker([data.geometry.coordinates[1], data.geometry.coordinates[0]]).addTo(map);
    marker.bindPopup(
        `<h3>${data.properties.DESCRIPCION}</h3>
         <p>${data.properties.DIRECCION}</p>
        `);
   
}


function mostrar(element){
    let nuevafila = plantilla.cloneNode(true);

    nuevafila.querySelector(".nombre").textContent=element.properties.DESCRIPCION;
    nuevafila.querySelector(".direccion").textContent=element.properties.DIRECCION;
    
    if(element.properties.ACCESOPMR=="Si"){
        nuevafila.querySelector(".minusvalido").textContent=("Accesible")
    };
    
    tabla.appendChild(nuevafila);

}

fetch("static/paradas.json")
.then( (res) => res.json() )
.then( (data) => {
    data.features.forEach(element => {
        addToMap(element)
        mostrar(element);
       
    });
    
} )









