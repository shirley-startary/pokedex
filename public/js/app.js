$.getJSON("http://pokeapi.co/api/v2/pokemon/",
	function (response) {
	var pokemons = response.results;
  console.log(pokemons);
	crearPokemones(pokemons);
});

$.getJSON("http://pokeapi.co/api/v2/pokemon-species/1/",
	function (response) {
    console.log(response);
    console.log(response.color.name);
    console.log(response.habitat.name);
    console.log(response.shape.name);
    console.log(response.genera[0].genus);
	// var pokemons = response.results;
  // console.log(pokemons);

});

function detallePokemon(pokemon){
	alert("pokemon")
}

// var xhr = new XMLHttpRequest();
//
// /* son los dos
// open
//  send*/
//  xhr.onreadystatechange = function (e){
//    if(this.readyState ===4){
//      if(this.status ===200){
//        console.log(JSON.parse(this.response));
//         // var response=JSON.parse(this.response);
//         // var pokemones=response.results;
//       //  var squad=JSON.parse(this.response);
//       //  crearPokemones(pokemones)
//         // crearPokemones(pokemones)
//
//      }
//    }
//  }
//
//  // por defecto es asynchronous
// xhr.open("GET","http://pokeapi.co/api/v2/pokemon/");
// xhr.send();


/*var squads = [
  {
    "nombre":"chilaquillers",
    "cantidadIntefrantes": 7
  },
  {
    "nombre":"jajasquad",
    "cantidadIntefrantes": 7
  }
]*/
function crearPokemones (pokemones){
var contador=1;
var contenedor = document.getElementById("listaPokemones")
	var row = document.createElement("div");
	row.classList.add("row");

pokemones.forEach(function(pokemon){
	var url = "http://pokeapi.co/api/v2/pokemon-species/"+contador+"/" ;
	var contenedorPokemon = document.createElement("div");
	var contenedorImagenYNombre = document.createElement("div");
	var img = document.createElement("img");
	var nombrePokemon = document.createElement("h3");
  // var li = document.createElement("li");
	img.src="assets/img/"+contador+".png";
	contenedorPokemon.className="col-xs-6 col-md-3 ";
	contenedorImagenYNombre.className ="thumbnail"
  nombrePokemon.textContent = pokemon.name;
	nombrePokemon.className = "text-center text-capitalize"

  // console.log(url);

  contenedorPokemon.setAttribute("data-url",url);
  // console.log(li);
	contenedorPokemon.appendChild(contenedorImagenYNombre)
	contenedorImagenYNombre.appendChild(img);
	contenedorImagenYNombre.appendChild(nombrePokemon);
	row.appendChild(contenedorPokemon);
	contenedor.appendChild(row);
  contador++;
  $(contenedorPokemon).click(function(){
  //   // alert("hola");
    console.log($(this).data("url"));
  })
});
}
