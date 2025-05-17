import './style.css'


let bodyElem = document.querySelector("body");

window.addEventListener("load", () => {                     //! cuando el este cargado el contenido ejecutara la funcion
	let randNum = Math.ceil(Math.random() * 8);               //! genera un numero aleatorio, ceil redondea para arriba, ramdon genera un numero aleatoreo entre 0 y 5 de caracter float por eso se usa ceil
	bodyElem.style.backgroundImage = `url('../public/imgs/bg-${randNum}.jpg')`; //!modificamos el bg con el numero ramdon, es importante que los archivos tengan el mismo nombre, solo se cambiara el numero
	
});


let pokeInput = document.querySelector("#pokemon");
pokeInput.addEventListener("keypress", (event) => {
	if (event.key == "Enter") {
		fetchDataFromApi();
	}
});
pokeInput.value = "pikachu";
fetchDataFromApi();
pokeInput.value="";

function fetchDataFromApi(){
	let pokemonBuscado = pokeInput.value
	fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonBuscado}`)
  .then(res => res.json())
  .then((data) => addDataToDom(data));
  
}

let pokeimagen = document.querySelector("#imagen")
let pokenombre = document.querySelector("#nombre-id")
let poketipo = document.querySelector("#tipo")
let pokealtura = document.querySelector("#altura")
let pokepeso = document.querySelector("#peso")


function addDataToDom(data) {
	let tipos = data.types.map(t => t.type.name).join(" / ");
	let urlImagen = data.sprites.front_default;
	pokeimagen.innerHTML = `<img src="${urlImagen}" alt="" class="h-full w-full object-contain"> `;
	pokenombre.innerHTML = `Nombre: ${data.name}`;
	poketipo.innerHTML = `Tipo: ${tipos}`;
	pokealtura.innerHTML = `Altura: ${(data.height / 10).toFixed(1)} kg`;
	pokepeso.innerHTML = `Peso: ${(data.weight / 10).toFixed(1)} kg`;
}

