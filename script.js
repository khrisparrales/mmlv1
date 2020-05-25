// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
    apiKey: "AIzaSyBvWAwkse4Vh_QABLtfwsj2GJLBtrzy8co",
    authDomain: "almac-ff6a4.firebaseapp.com",
    projectId: "almac-ff6a4"
});
var db = firebase.firestore();
var nombre = document.getElementById('Nametxt').value;
var fecha = document.getElementById('Fechatxt').value;
var usuario = document.getElementById('ID').value;

async function openMenu() {
    await menuController.open();
}

var existe = true;
async function handleButtonClick(aler) {

    const alert = await alertController.create({

        header: 'El Usuario se ha ' + aler,
        // message: 'Do you agree to use this lightsaber to do good across the galaxy?',
        buttons: ['Agree']
    });


    await alert.present();
}

function adduser() {
    nombre = document.getElementById('Nametxt').value;
    fecha = document.getElementById('Fechatxt').value;
    usuario = document.getElementById('ID').value;


    if (nombre !== "" && usuario !== "" && fecha !== "") {
        db.collection("Usuarios").doc(usuario).set({
                Nombre: nombre,
                Fecha: fecha
            })
            .then(function() {
                console.log("Document successfully written!");
                handleButtonClick('agregado');
                document.getElementById('Nametxt').value = "";
                document.getElementById('Fechatxt').value = "";
                document.getElementById('ID').value = "";

            })
            .catch(function(error) {
                console.error("Error writing document: ", error);
            });

    }

}
var tabla = document.getElementById('tablausuario');

function mostrar() {
    //limpiar tabla
    tabla.innerHTML = "";

    db.collection("Usuarios").onSnapshot((querySnapshot) => {
        tabla.innerHTML = "";
        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data().Nombre}`);
            tabla.innerHTML += ` <tr>

                    <th scope="row">${doc.id}</th>
                    <td >${doc.data().Nombre}</td>
                     <td >${doc.data().title}</td>
                      <td>  <button class="btn btn-warning"" id="btnedituser" onclick="edituser('${doc.id}','${doc.data().Nombre}','${doc.data().Fecha}')">Editar </button>  </td>
                        <td><button class="btn btn-danger" id="btndeleuser" onclick="deleuser('${doc.id}')">Eliminar </button></td>
                </tr>`

        });
    });


}
mostrar();

function deleuser(idu) {
    db.collection("Usuarios").doc(idu).delete().then(function() {
        handleButtonClick('eliminado');
        console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
}

function edituser(idu, nombre, fecha) {
    var washingtonRef = db.collection("Usuarios").doc(idu);
    document.getElementById('Nametxt').value = nombre;
    document.getElementById('Fechatxt').value = fecha;
    document.getElementById('ID').value = idu;
    var btne = document.getElementById('btnadduser');
    btne.innerHTML = 'Editar';
    btne.onclick = function() {
        nombre = document.getElementById('Nametxt').value;
        fecha = document.getElementById('Fechatxt').value;
        usuario = document.getElementById('ID').value;
        // Set the "capital" field of the city 'DC'
        return washingtonRef.update({
                Nombre: nombre,
                Fecha: fecha
            })
            .then(function() {
                console.log("Document successfully updated!");
                btne.innerHTML = 'Guardar';
                document.getElementById('Nametxt').value = "";
                document.getElementById('Fechatxt').value = "";
                document.getElementById('ID').value = "";
            })
            .catch(function(error) {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
            });
    }

}
//////////////////LISTAS
var moviename = document.getElementById('Movietxt').value;


function addmovie() {
    moviename = document.getElementById('Movietxt').value;



    if (moviename !== "") {

        db.collection("/Usuarios/1/Peliculas").add({
                Nombre: moviename

            })
            .then(function(docRef) {
                console.log("Document written with ID: ", docRef.id);
            })
            .catch(function(error) {
                console.error("Error adding document: ", error);
            });

    }

}
var tablamovie = document.getElementById('tablemovie');
var cabez = document.getElementById('titleu');
cabez.innerHTML = "Usuario:Khris";

function mostrarmovielist() {
    //limpiar tabla
    tablamovie.innerHTML = "";

    db.collection("/Usuarios/1/Peliculas").onSnapshot((querySnapshot) => {
        tablamovie.innerHTML = "";

        querySnapshot.forEach((doc) => {

            console.log(`${doc.id} => ${doc.data().Nombre}`);
            tablamovie.innerHTML += ` <tr>

                    
                    <td >${doc.data().Nombre}</td>
                    
                        <td>  <button class="btn btn-warning"" id="btneditmovie" onclick="editmovie('${doc.id}','${doc.data().Nombre}')">Editar </button>  </td>
                        <td><button class="btn btn-danger" id="btndelemovie" onclick="delemovie('${doc.id}')">Eliminar </button></td>

                </tr>`

        });
    });


}
mostrarmovielist();

function delemovie(idu) {
    db.collection("/Usuarios/1/Peliculas").doc(idu).delete().then(function() {
        //handleButtonClick('eliminado');
        console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
}

function editmovie(idu, moviename) {
    var washingtonRef = db.collection("/Usuarios/1/Peliculas").doc(idu);
    document.getElementById('Movietxt').value = moviename;

    var btne = document.getElementById('btnaddmovie');
    btne.innerHTML = 'Editar';
    btne.onclick = function() {
        moviename = document.getElementById('Movietxt').value;

        // Set the "capital" field of the city 'DC'
        return washingtonRef.update({
                Nombre: moviename,

            })
            .then(function() {
                console.log("Document successfully updated!");
                btne.innerHTML = 'Guardar';
                document.getElementById('Movietxt').value = "";

            })
            .catch(function(error) {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
            });
    }

}
//////////////////////////////////////////////
var e = 0;
console.log(10 % 5);
var se = 'batman';
var pag = 10;
var f = 1;

function buscarPopup() {


    var s = document.getElementById('txtsearch').value;
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
            un = response.title;
            $('img').attr('src', image);
            document.getElementById('cont1').innerHTML = response.title;
            document.getElementById('anio').innerHTML = response.release_date;
            document.getElementById('descripcion').innerHTML = response.overview;

        }

    );
}


function savePopup() {

    console.log(un);

    db.collection("/Usuarios/1/Peliculas").add({
            Nombre: un

        })
        .then(function(docRef) {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });


}

apiCall();
