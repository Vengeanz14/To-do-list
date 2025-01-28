document.addEventListener("DOMContentLoaded", () => {
  let DB;

  setTimeout(() => {
    crearDB();
  }, 1000);

  //Selectores
  const tituloInput = document.querySelector("#titulo");
  const fechaInput = document.querySelector("#fecha");
  const categoriaInput = document.querySelector("#categoria");
  const descripcionInput = document.querySelector("#descripcion");

  const contenedorTareas = document.querySelector("#contenedorTareas");

  const formulario = document.querySelector("#formulario");

  //Contenedor para las citas

  const tareaObj = {
    titulo: "",
    fecha: "",
    categoria: "",
    descripcion: "",
  };

  //Eventos

  tituloInput.addEventListener("change", datosTarea);
  fechaInput.addEventListener("change", datosTarea);
  categoriaInput.addEventListener("change", datosTarea);
  descripcionInput.addEventListener("change", datosTarea);

  formulario.addEventListener("submit", submitTarea);

  //Clases
  class AdminTareas {
    constructor() {
      this.tarea = [];
    }
    //metodo
    agregar(tarea) {
      this.tarea = [...this.tarea, tarea];

      console.log(this.tarea);
    }
  }

  //Instanciamos una clase
  const tareas = new AdminTareas();

  //Funcion para llenar el objeto con los valores de las propiedades

  function datosTarea(e) {
    tareaObj[e.target.id] = e.target.value;
  }

  //Funcion para el boton de submit
  function submitTarea(e) {
    e.preventDefault();

    tareas.agregar(tareaObj);
    window.location.href = "/HTML/lista.html";

    //Transacciones

    let transaccion = DB.transaction(["tareas"], "readwrite");

    transaccion.oncomplete = function () {
      console.log("Transaccion completada");
    };

    transaccion.onerror = function () {
      console.log("Transaccion incompleta");
    };

    const objectStore = transaccion.objectStore("tareas");

    const peticion = objectStore.add({ ...tareaObj, id: Date.now() });

    console.log(peticion);
  }

  /// crear DB //////////////////////////////////////////

  function crearDB() {
    //Crear la base de datos

    const crearDB = window.indexedDB.open("tareas", 1);

    //Si hay un error
    crearDB.onerror = function () {
      console.log("Hubo un error");
    };
    //Si todo sale bien

    crearDB.onsuccess = function () {
      console.log("Todo bien");

      DB = crearDB.result;

      console.log(DB);
    };

    //Definir el schema

    crearDB.onupgradeneeded = function (e) {
      const db = e.target.result;

      const objectStore = db.createObjectStore("tareas", {
        keyPath: "id",
        autoIncrement: true,
      });

      //Definir todas las columnas
      objectStore.createIndex("titulo", "titulo");
      objectStore.createIndex("fecha", "fecha");
      objectStore.createIndex("categoria", "categoria");
      objectStore.createIndex("descripcion", "descripcion");
    };
  }
});
