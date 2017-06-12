$(document).on("click",".cerrarModalPokemon",cerrarModalPokemon);
var url = "https://pokeapi.co/api/v2/pokemon/";
// $(document).on("click","#next",pokeNext);
apipokemones(url);

// function pokeNext(){
// 	console.log(url);
// 	apipokemones(url);
// }

function apipokemones(url){
	$.getJSON(url,
	function (response) {
		// console.log(response);
		var pokemons = response.results;
		var next = response.next;
		console.log(next);
		$("#next").click(function(){
			$("#listaPokemones").html("");
			apipokemones(next);
		});
		crearPokemones(pokemons);
	});
}

function abrir(nombre,imagen,url){
		$.getJSON(url,
			function (response) {
				var modal = crearModal(nombre,imagen,response)
				mostrarModal(modal);
			});
}

var plantillaModal =
'<div class="modalPokemon row" id="modal">'+
        '<span class="cerrarModalPokemon" id="cerrar">__cerrar__</span>'+
        '<h3 id="tituloPokemon" class="col-xs-12 text-center text-uppercase">__nombrePokemon__</h3>'+
        '<div class="col-xs-12">'+
        '<img src="__imagen__" id="_imagen" class="col-xs-12 col-md-4">'+
          '<div class="col-xs-12 col-md-4 text-capitalize">'+
          	'<p id="color"><strong>Color:</strong>__color__</p>'+
            '<p id="shape"><strong>Shape:</strong>__shape__</p>'+
          '</div>'+
          '<div class="col-xs-12 col-md-4 text-capitalize">'+
            '<p id="habitat"><strong>Habitat:</strong>__habitat__</p>'+
            '<p id="genera"><strong>Genera:</strong>__genera__</p>'+
          '</div>'+
        '</div>'+
      '</div>';

// en esta funcion se extructura todo el modal
function crearModal(nombre,imagen,response){
	var $infoModal = $("#fondo");
	$infoModal.html(
		plantillaModal.replace("__cerrar__","x")
		.replace("__nombrePokemon__",nombre)
									.replace("__imagen__",imagen)
									.replace("__color__",response.color.name)
									.replace("__shape__",response.shape.name)
									.replace("__habitat__",response.habitat.name)
									.replace("__genera__",response.genera[0].genus)
	);
	return $infoModal;
}

function cerrarModalPokemon(){
	var $fondo=$("#fondo");
	$fondo.css("visibility","hidden");
}

// en esta funcion visualiza el modal
function mostrarModal(obj){
	console.log(obj);
	obj.css("visibility", "visible");
}

var contador=1;
function crearPokemones (pokemones){
	var contenedor = document.getElementById("listaPokemones")
	var row = document.createElement("div");
	row.classList.add("row");
	console.log(pokemones);
	pokemones.forEach(function(pokemon){

		var url = "https://pokeapi.co/api/v2/pokemon-species/"+contador+"/" ;

		// Creando los elementos pokemones del DOM
		var contenedorPokemon = document.createElement("div");
		var contenedorImagenYNombre = document.createElement("div");
		var img = document.createElement("img");
		var tituloPokemon = document.createElement("h3");
		var urlimagen="assets/img/"+contador+".png";
		// console.log(urlimagen);
		var nombrePokemon=pokemon.name;
		img.src=urlimagen;

		contenedorPokemon.className="col-xs-6 col-md-3 ";
		contenedorImagenYNombre.className ="thumbnail"
	  tituloPokemon.textContent = nombrePokemon;
		tituloPokemon.className = "text-center text-capitalize"

	  contenedorPokemon.setAttribute("data-url",url);
		contenedorPokemon.setAttribute("data-urlimagen",urlimagen);
		contenedorPokemon.setAttribute("data-nombre",nombrePokemon);

		// Aregando los elementos pokemones al DOM
		contenedorPokemon.appendChild(contenedorImagenYNombre)
		contenedorImagenYNombre.appendChild(img);
		contenedorImagenYNombre.appendChild(tituloPokemon);
		row.appendChild(contenedorPokemon);
		contenedor.appendChild(row);
	  contador++;
	  $(contenedorPokemon).click(function(){
			var nombre = ($(this).data("nombre"));
			var imagen = ($(this).data("urlimagen"));
			var urlInfoPokemon=($(this).data("url"));
			/* en la siente funcionle pasa todos los datos del pokemon,
			 para que lo muestre en el modal*/
	    abrir(nombre,imagen,urlInfoPokemon);
	  })
	});
}
