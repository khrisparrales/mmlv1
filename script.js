var nombre = document.getElementById('Nametxt').value;
var fecha = document.getElementById('Fechatxt').value;
var usuario = document.getElementById('ID').value;
async function openMenu() {
    await menuController.open();
}
var existe = true;
//////////////////LISTAS
var moviename = document.getElementById('Movietxt').value;
var cabez = document.getElementById('titleu');
cabez.innerHTML = "Usuario:Khris";
//////////////////////////////////////////////
var e = 0;
console.log(10 % 5);
var se = 'batman';
var pag = 10;
var f = 1;
var url;
function buscarPopup() {


    var s =encodeURIComponent(document.getElementById('txtsearch').value);

    console.log(s);
    if (s !== null) {
        e = 0;
        f = 1;
        se = s;
        document.getElementById('pt').innerHTML = "Elemento:" + e + " Pagina:" + f + " Total:" +
            pag;
        apiCall();
    }

}

function apiCall() {

    $.getJSON('https://api.themoviedb.org/3/search/movie?api_key=2ec9323401793e5a207687ea4612d147&language=es&query=' + se + '&page=' + f + '&include_adult=false').then(function(response) {

            console.log("Response.Search()" + response.results.length);
            console.log("Response.result()" + response.results[e].title);
            pag = response.results.length;
            //        
            //       $('img').attr('src', image);
            add(response.results[e].id);

        }

    );



}


function abrirPopup() {

    if (e < pag - 1) {
        e += 1;
        document.getElementById('pt').innerHTML = e + "  " + f;
        console.log(e);
        console.log(pag);
        apiCall();
    } else {
        f = f + 1;
        e = 0;
        apiCall();
    }
}

function cerrarPopup() {

    if (e < pag - 1 && e >= 1) {
        e -= 1;
        document.getElementById('pt').innerHTML = e + "  " + f;
        console.log(e);
        console.log(pag);
        apiCall();
    } else {

        f = f - 1;
        e = 0;
        apiCall();
    }
}
let un;

function add(id_imdb) {
    $.getJSON('https://api.themoviedb.org/3/movie/' + id_imdb + '?api_key=2ec9323401793e5a207687ea4612d147&language=es').then(function(response) {

            console.log(response);
            document.getElementById('pt').innerHTML = "Elemento:" + e + " Pagina:" + f + " Total:" +
                pag;

            var image = 'https://image.tmdb.org/t/p/original' + response.poster_path;
            un = response.id;
            $('img').attr('src', image);
            document.getElementById('cont1').innerHTML = response.title;
            document.getElementById('anio').innerHTML = response.release_date;
            document.getElementById('descripcion').innerHTML = response.overview;

        }

    );
}


var a = document.createElement('a');
function savePopup() {
    console.log("valor "+un);
var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://api.themoviedb.org/3/movie/"+un+"?api_key=2ec9323401793e5a207687ea4612d147&language=es",
  "method": "GET",
  "headers": {
    "content-type": "application/json;charset=utf-8",
    "authorization": "Bearer <<access_token>>"
  },
  "processData": false,
  "data": "{}"
}

var data;
var container
    url=document.getElementById('txturlgd').value;
$.ajax(settings).done(function (response) {
  console.log(response.genres[0].name);
  var obj={"id":response.id,"key":encodeURIComponent(response.title),"name":response.title,"description":response.overview,"genres":[response.genres[0].name,response.genres[1].name],"rate":response.vote_average,"length":"1hr 48mins","img":"https://image.tmdb.org/t/p/w220_and_h330_face/"+response.poster_path,"cover":"https://image.tmdb.org/t/p/original/"+response.backdrop_path,"url":url};
  

var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(obj));

a.href = 'data:' + data;
a.download = response.title+'.txt';
a.innerHTML = 'download'+response.title+' JSON';

var container = document.getElementById('containerjson');
container.appendChild(a);

});


}
apiCall();
