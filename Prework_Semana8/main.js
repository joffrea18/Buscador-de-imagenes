"use strict"; // esto no hace falta si coloco el module en el script del html

// ################################################################
// ################# LLAMADO DE API EXTERNA IMG ####################

const form = document.querySelector("form.search");
const app = document.querySelector("section.app");

// Declaro la key de acceso a la api
const KEY = "oOyzSb5LNj8HYYAdGe4f72xrHeemFrx0nmekk4sOec4znuZqMqeObfY7";

const writePhotos = (photos) => {
	// Creo una función que me llame y recorra lo devuelto
	const photoList = photos.map((photo) => {
		return `
    <li>
    <img src="${photo.src.tiny}" alt="${photo.alt}" />
    <p>${photo.alt} (${photo.photographer})</p>
    </li>
    `;
	});

	console.log(photoList);
	// Creo el ul donde los quiero mostrar al llamar esta función
	app.innerHTML = `<ul>${photoList.join("")}{</ul>`;
};
// declaro el trozo de HTML que pasará a ser el nuevo valor declarado en el front
// Esto lo puedo hacer de último ya cuando esté agregando los errores
const writeMessage = (message) => {
	app.innerHTML = `<p>${message}<p>`;
};

const doSearch = async (e) => {
	e.preventDefault();

	// console.log("se envió el formulario");

	// creo la representación del formulario en JS
	const values = new FormData(form);
	// query corresponde al nombre dado al input
	const query = values.get("query");
	// color corresponde al nombre dado al select
	const color = values.get("color");

	// URL de la api a conectar
	// "https://api.pexels.com/v1/search?query=poeple&color=red&per_page=40"

	try {
		// De último puedo ingresar un valor que quiero que salga mientras carga la información la página
		// writeMessage("Cargando datos...");

		// modifico la url a algo parecido en los datos de valor igual a los guardados en las constantes
		const url = `https://api.pexels.com/v1/search?query=${query}&color=${color}&per_page=40&`;

		// las fects permiten un segundo parámetro que permite definirlas separan dentro del paréntesis con coma (,)
		const response = await fetch(url, {
			headers: {
				Authorization: KEY,
			},
		});
		if (response.ok) {
			// Extraigo todos los datos correspondientes a esa propiedad photos en este caso
			const data = await response.json();

			writePhotos(data.photos);
			// console.log(data.photos);
		} else {
			writeMessage("Hubo un error haciendo la petición");
		}
	} catch (error) {
		writeMessage(error.message);
	}

	// console.log(query, color);
};

form.addEventListener("submit", doSearch);

// #####################################################################
// ########### CON ESTE LLAMO LA API DE MI PERFIL DE GITHUB ############
// async function main() {
// 	// llamo el documento txt que contiene la información
// 	// Debo meterlo en el try por si acaso hay algún posible error que se me pueda escapar.
// 	try {
// 		// Esto devuelve la promesa
// 		// Primero con txt
// 		// const response = await fetch(`./texto.txt`);

// 		// Este con JSON
// 		const response = await fetch(`https://api.github.com/users/joffrea18`, {
// 			// Puedo declarar como quiero que sea la extracción de los datos
// 			// method: `GET`,
// 		});

// 		// console.log(response.status); // Al estar conectado aparece el status 200, el 404 es (not found)
// 		// console.log(response.ok); // devuelve un buleano.

// 		if (response.ok) {
// 			// Extraigo el texto
// 			// Ejemplo con text
// 			// const text = await response.text();

// 			// Ejemplo con JSON
// 			const data = await response.json();

// 			// imprimo en consola
// 			// entro a la variable antes declarada y llamo a la propiedad que quiero extraer, en este caso name
// 			console.log(data.name);

// 			// Creamos el elemento donde vamos a agregar la imagen
// 			const image = document.createElement("img");

// 			// Con esto estoy agregando la propiedad src al elemento creado e indicándole que visualice dicho dato de la api extraida
// 			image.setAttribute("src", data.avatar_url);

// 			// Hago ver el elemento.
// 			document.body.append(image);

// 			// Creamos para agregar un párrafo
// 			const title = document.createElement("p");

// 			// Agrego el dato que quiero aparezca en el elemento
// 			title.textContent = data.name;

// 			// Hago ver el elemento
// 			document.body.append(title);
// 		} else {
// 			console.log("hubo un error en la petición");
// 		}
// 	} catch (error) {
// 		console.log(error.message);
// 	}
// }

// main();
