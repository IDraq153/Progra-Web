
let carrerRows = document.getElementById("careers").children[1].children.length;
  //console.log(carrerRows);

  function registrar(event) {
    
    // Evita que se refresque
    event.preventDefault();
    
    // Codigo para ir creando estas nuevas secciones en nuestra web para agregar carreras
    let newCareer = document.getElementById("name").value;
    let careerTable = document.getElementById("careers");
    let careerId = document.getElementById("careerId").value;

    // Cuando le damos al boton editar ese valor se guarda en el input hidden y si no le damos estaremos editando
    if(careerId == "") {
      //console.log(newCareer);
      // la fila es tr las celdas son td
      let tr = document.createElement("TR");
      let td1 = document.createElement("TD");
      let td2 = document.createElement("TD");
      let td3 = document.createElement("TD");
      
      carrerRows+=1;
      td1.innerHTML = carrerRows;
      td2.innerHTML = newCareer;
      td3.innerHTML = `
      <div class="d-flex justify-content-center gap-2">
        <button
          type="button"
          class="btn btn-sm btn-outline-primary"
          title="Editar"
          onclick="editar('${carrerRows}', event)"
        >
          <i class="bi bi-pencil-square me-1"></i>
          Editar
        </button>

        <button
          type="button"
          class="btn btn-sm btn-outline-danger"
          title="Eliminar"
          onclick="eliminar('${carrerRows}', event)"
        >
          <i class="bi bi-trash me-1"></i>
          Eliminar
        </button>
      </div>
    `;
      //console.log(tr); 
      
      // "juntar" adentro del tr los td como un arbol nodo hijo
      tr.appendChild(td1);
      tr.appendChild(td2);
      tr.appendChild(td3);
      careerTable.children[1].appendChild(tr);
    } else {
      let tbody = careerTable.children[1];
      
      for (let tr of tbody.children) {
        if(tr.children[0].innerHTML.trim() == careerId) {
          tr.children[1].innerHTML = newCareer;
        }
        document.getElementById("careerId").value = "";
      }
      
      document.getElementById("careerTitle").innerHTML = "Nueva carrera";
    }
  }
  
  function eliminar(ID, event) {
    // que event.currentTarget captura el elemento con el que tuve interaccion
    let tr = event.currentTarget.parentElement.parentElement;
    tr.parentElement.remove();
    document.getElementById("careerTitle").innerHTML = "Nueva carrera";
  }
  
  function editar(ID, event) {
    
    // 
    let tr = event.currentTarget.parentElement.parentElement.parentElement;
    let id = tr.children[0].innerHTML;
    let name =tr.children[1].innerHTML;
    
    document.getElementById("name").value = name.trim();
    document.getElementById("careerId").value = id;
    
    document.getElementById("careerTitle").innerHTML = "Editar carrera";
    console.log(document.getElementById("careerTitle"));
  }