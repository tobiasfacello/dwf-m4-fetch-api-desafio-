const formEl = document.querySelector(".formulario-busqueda");

function removerResultados() {
	const containerEl = document.querySelector(".results-container");
	while (containerEl.lastElementChild) {
		containerEl.removeChild(containerEl.lastElementChild);
	}
}

function contarResultados(data) {
	const spanResultadosEl = document.querySelector(".cant-resultados");
	spanResultadosEl.textContent = data["paging"]["total"];
}

function mostrarProductos(data) {
	const containerEl = document.querySelector(".results-container");
	const tplEl = document.querySelector(".tpl-productos");

	for (const prod of data) {
		// Ingresa la imagen de los productos encontrados.
		const imgProductosEl = tplEl.content.querySelector(".img-producto");
		imgProductosEl.setAttribute("src", prod["thumbnail"]);

		const nombreProductoEl =
			tplEl.content.querySelector(".nombre-producto");
		nombreProductoEl.textContent = prod["title"].substring(0, 55) + "...";

		const estadoProductoEl =
			tplEl.content.querySelector(".estado-producto");
		estadoProductoEl.textContent = prod["condition"];

		const spanVentasEl = tplEl.content.querySelector(".cant-ventas");
		spanVentasEl.textContent = prod["sold_quantity"];

		const spanPrecioEl = tplEl.content.querySelector(".precio");
		spanPrecioEl.textContent = `$${prod["price"]}`;

		const cloneTplEl = document.importNode(tplEl.content, true);
		containerEl.appendChild(cloneTplEl);
	}
}

formEl.addEventListener("submit", (event) => {
	event.preventDefault();

	const productoBuscado = document.querySelector(".buscador").value;

	fetch(`https://api.mercadolibre.com/sites/MLA/search?q=${productoBuscado}`)
		.then((res) => {
			return res.json();
		})
		.then((data) => {
			console.log(data["results"]);
			removerResultados();
			contarResultados(data);
			mostrarProductos(data["results"]);
		});
});
