$.getJSON("https://pokeapi.co/api/v2/pokemon/",
	function (response) {
	var pokemons = response.results;
	crearPokemones(pokemons);
});


function abrir(nombre,imagen,url){
		$.getJSON(url,
			function (response) {
				var modal = crearModal(nombre,imagen,response)
				mostrarModal(modal);
			});
}

// en esta funcion se extructura todo el modal
function crearModal(nombre,imagen,response){
	var fondo=document.getElementById("fondo");
	var modal=document.getElementById("modal");
	var cerrar=document.getElementById("cerrar");
	var tituloPokemon = document.getElementById("tituloPokemon");
	var imagenDom=document.getElementById("_imagen");
	var color = document.getElementById("color");
	var shape = document.getElementById("shape");
	var habitat = document.getElementById("habitat");
	var genera = document.getElementById("genera");
	//console.log(fondo);

	tituloPokemon.textContent = nombre
	imagenDom.src=imagen;
	color.textContent = "Color: "+response.color.name;
	shape.textContent = "Shape: "+response.shape.name;
	habitat.textContent = "Habitat: "+response.habitat.name;
	genera.textContent = "Genera: "+response.genera[0].genus;

	cerrar.innerText="X";
	cerrar.addEventListener("click",function(){
		fondo.style.visibility="hidden";
	});
	return fondo;
}

// en esta funcion visualiza el modal
function mostrarModal(obj){
	obj.style.visibility="visible";
}

function crearPokemones (pokemones){
	var contador=1;
	var contenedor = document.getElementById("listaPokemones")
	var row = document.createElement("div");
	row.classList.add("row");

	pokemones.forEach(function(pokemon){
		var url = "https://pokeapi.co/api/v2/pokemon-species/"+contador+"/" ;

		// Creando los elementos pokemones del DOM
		var contenedorPokemon = document.createElement("div");
		var contenedorImagenYNombre = document.createElement("div");
		var img = document.createElement("img");
		var tituloPokemon = document.createElement("h3");
		var urlimagen="assets/img/"+contador+".png";
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
