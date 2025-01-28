document.addEventListener("DOMContentLoaded", () => {
  let DB;

  // Selectores
  const contenedorTareas = document.querySelector(".contenedorTareas");

  const createBtn = document.querySelector("#create");

  //Eventos

  createBtn.addEventListener("click", function () {
    window.location.href = "/HTML/toDoList.html";
  });

  //funcion del boton crear

  /////////////DB/////////////////////
  // Abrir la BS
  const abrirDB = window.indexedDB.open("tareas", 1);

  abrirDB.onsuccess = function (e) {
    console.log("Base de datos abierta correctamente.");
    DB = e.target.result;

    // Llamar a la función para imprimir las tareas
    imprimirTareas();
  };

  abrirDB.onerror = function () {
    console.error("Error al abrir la base de datos.");
  };

  // Función para imprimir las tareas
  function imprimirTareas() {
    if (!DB) {
      console.error("La base de datos tiene un error.");
      return;
    }

    // Leer las tareass
    const objectStore = DB.transaction("tareas", "readonly").objectStore(
      "tareas"
    );

    objectStore.openCursor().onsuccess = function (e) {
      const cursor = e.target.result;

      if (cursor) {
        const { titulo, fecha, categoria, descripcion } = cursor.value;

        // Crear un div para el input
        const inputTitulo = document.createElement("div");
        inputTitulo.classList.add("inputTitulo");
        inputTitulo.innerHTML = `
    <input type="radio" id="titulo" name="titulo" value="titulo"><label for="titulo">${titulo}</label>`;
        // Agregar la input al contenedor
        contenedorTareas.appendChild(inputTitulo);

        // Crear un div para cada tarea
        const tareaDiv = document.createElement("div");
        tareaDiv.classList.add("tarea");
        tareaDiv.innerHTML = `
        <p> ${fecha}</p>
        <p> ${categoria}</p>
        <p> ${descripcion}</p>`;

        // Agregar la tarea al contenedor
        contenedorTareas.appendChild(tareaDiv);

        // Continuar al siguiente cursor
        cursor.continue();
      } else {
        console.log("No hay más tareas para mostrar.");
      }
    };

    objectStore.openCursor().onerror = function () {
      console.error("Error al leer las tareas.");
    };
  }
});
