document.addEventListener("DOMContentLoaded", () => {
  //Selectores
  const createBtn = document.querySelector("#create");
  const editarBtn = document.querySelector("#editar");

  const contenedorTareas = document.querySelector("#contenedorTareas");

  //Eventos
  createBtn.addEventListener("click", cambiarPagina);
  editarBtn.addEventListener("click", editarCliente);

  //boton create task

  function cambiarPagina() {
    console.log("Cambiando");
    window.location.href = "/HTML/toDoList.html";
  }

  //boton editar task

  function editarCliente() {
    window.location.href = "/HTML/toDoList.html";
  }

  console.log("buenas tardes");
});
