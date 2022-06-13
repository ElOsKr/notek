import { collection, query, where, onSnapshot, db, setDoc,getDoc, doc, updateDoc, deleteDoc ,startAt,endAt,orderBy} from "./firebase.js";
document.addEventListener("readystatechange", cargarEventos, false);

function cargarEventos() {
    cargarItems();
    document.getElementById("botonAniadir").addEventListener("click",aniadir);
    document.getElementById("btnTodos").addEventListener("click",cargarItems);
    document.getElementById("filtroNombre").addEventListener("keyup",buscador);
}

function estructuraHTML(nombre,color,status){
    
    return` <div class="d-flex" data-status="${status}">
                <p class="me-2 mt-3 ${nombre} ${color}">${nombre}</p>
                <div class="${nombre} me-auto mt-2">
                    <button class="btn btnEnProceso text-primary" data-id="${nombre}">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-gear" viewBox="0 0 16 16">
                        <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/>
                        <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"/>
                        </svg>
                    </button>
                    <button class="btn btnPausa text-warning" data-id="${nombre}">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pause-circle" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                        <path d="M5 6.25a1.25 1.25 0 1 1 2.5 0v3.5a1.25 1.25 0 1 1-2.5 0v-3.5zm3.5 0a1.25 1.25 0 1 1 2.5 0v3.5a1.25 1.25 0 1 1-2.5 0v-3.5z"/>
                        </svg>
                    </button>
                    <button class="btn btnAcabado text-success" data-id="${nombre}">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-check-square" viewBox="0 0 16 16">
                        <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                        <path d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.235.235 0 0 1 .02-.022z"/>
                        </svg>
                    </button>
                </div>
                <div class="oculto input-group mt-2 ${nombre} me-auto w-75">
                    <input type="text" class="form-control bg-transparent text-light" value="${nombre}">
                    <button class="btn btnGuardarEditar text-light" data-id="${nombre}" data-status="${status}" data-color="${color}">
                        <span class="material-symbols-outlined">
                            save
                        </span>
                    </button>
                </div>
                <div class="mt-2">
                    <button class="btn btnEditar text-light" data-id="${nombre}">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                        </svg>
                    </button>
                    <button class="btn btnEliminar text-light" data-id="${nombre}">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                        </svg>
                    </button>
                </div>
            </div>`
}


function cargarItems(){
    const referenciaLista = collection(db, "Usuarios",localStorage.getItem("id"),"Lista");
    const consulta = query(referenciaLista, where("usuario", "==", localStorage.getItem("id")));
    const unsubscribe = onSnapshot(consulta, (querySnapshot) => {
      var lastId=0;
      var html="";
      var color="";
      querySnapshot.forEach((doc) => {
        color="text-light";
        if(typeof doc.data().status =="string"){
            if(doc.data().status=="enProceso"){
                color="text-primary"
            }else if(doc.data().status=="enPausa"){
                color="text-warning"
            }else if(doc.data().status=="completado"){
                color="text-success"
            }
        }
        html+=estructuraHTML(doc.data().title,color,doc.data().status);
        lastId=doc.id
        console.log(doc.id)
      });
        if(lastId!=0){
            document.getElementById("tareas").innerHTML=html;
            borrarItem();
            editarItem();
            guardarEdit();
            itemsEstado(".btnEnProceso","enProceso")
            itemsEstado(".btnPausa","enPausa")
            itemsEstado(".btnAcabado","completado")
            $(".btnEleccionEstado").css("display","block");
            verItemsEstado("btnVerEnProceso","enProceso","text-primary")
            verItemsEstado("btnVerEnPausa","enPausa","text-warning")
            verItemsEstado("btnVerCompletados","completado","text-success")
        }else{
            $(".btnEleccionEstado").css("display","none");
            $('#tareas').html("No hay aún nada en la lista");        
        }
    });
}


async function aniadir(){
    if($('#tareas').html()=="No hay aún nada en la lista"){
        $('#tareas').html("");
    }
    var nombreItem=document.getElementById("listaItemNombre").value;
    if(nombreItem==""){
        $('.errorItem').html("No puede estar vacio este campo");
        $('.errorItem').show();
    }else{
        const apunte = await getDoc( doc(db, "Usuarios/" + localStorage.getItem("id") + "/Lista", nombreItem));
        if(apunte.exists()){
            $('.errorItem').html("Item ya existente en la lista");
            $('.errorItem').show();
        }else{
            const docRef = {
            title: nombreItem,
            usuario: localStorage.getItem("id")
            }
            //Se le pone como id Personalizado el correo y se le pasa el objeto con los datos
            await setDoc(doc(db, "Usuarios", localStorage.getItem("id"),"Lista",nombreItem), docRef);
            var html=estructuraHTML(nombreItem,"text-light",null);
            document.getElementById("tareas").innerHTML+=html;
            cargarItems();
            $("#listaItemNombre").val("");
            $('.errorItem').hide();            
        }
    }
}

function borrarItem(){
    var listaBotonesBorrar=document.querySelectorAll(".btnEliminar");
    for (let i = 0; i < listaBotonesBorrar.length; i++) {
        listaBotonesBorrar[i].addEventListener("click", async (evento) => {
        const id = evento.currentTarget.dataset.id;
        await deleteDoc(doc(db, "Usuarios",localStorage.getItem("id"),'Lista', id));
        cargarItems();
        });

    }
}


function editarItem(){
    var listaBotonesEditar=document.querySelectorAll(".btnEditar");
    for (let i = 0; i < listaBotonesEditar.length; i++) {
        listaBotonesEditar[i].addEventListener("click", (evento) => {
            const id = evento.currentTarget.dataset.id;
            var titulo=$("."+id)[0];
            var editar=$("."+id)[1];
            var boton=$("."+id)[2];
            if($(boton).hasClass("oculto")==true){
                $(titulo).css("display","none")
                $(editar).css("display","none")
                $(boton).removeClass("oculto") 
            }else{
                $(titulo).css("display","block")
                $(editar).css("display","block")
                $(boton).addClass("oculto")
            }
        });

    }
}

async function guardarEdit(){
    var listaBotonesGuardarEditar=document.querySelectorAll(".btnGuardarEditar");
    for (let i = 0; i < listaBotonesGuardarEditar.length; i++) {
        listaBotonesGuardarEditar[i].addEventListener("click", async (evento) => {
            const id = evento.currentTarget.dataset.id;
            var cajaTitulo=$("."+id)[2];
            var titulo=cajaTitulo.childNodes[1].value;
            var status=evento.currentTarget.dataset.status;
            var color=evento.currentTarget.dataset.color;
            await deleteDoc(doc(db, "Usuarios",localStorage.getItem("id"),'Lista', id));
            const docRef={
              title: titulo,
              usuario: localStorage.getItem("id"),
              status:status,
              color:color
            };
            await setDoc(doc(db, "Usuarios", localStorage.getItem("id"),"Lista",titulo), docRef);
        });
    }
}
async function itemsEstado(botones,estado){
    var listaBotones=document.querySelectorAll(botones);
    for (let i = 0; i < listaBotones.length; i++) {
        listaBotones[i].addEventListener("click", async (evento) => {
            const id = evento.currentTarget.dataset.id;
            const referenciaLista = doc(db, "Usuarios", localStorage.getItem("id"),"Lista",id);
            await updateDoc(referenciaLista, {
              status: estado
            });
            cargarEventos();
        });
    }
}
async function verItemsEstado(boton,estado,colorT){
    document.getElementById(boton).addEventListener("click",function(){
        $('#tareas').html("");
        const referenciaLista = collection(db, "Usuarios",localStorage.getItem("id"),"Lista");
        const consulta = query(referenciaLista, where("status", "==", estado));
        const unsubscribe = onSnapshot(consulta, (querySnapshot) => {
          var html="";
          var color=colorT;
          querySnapshot.forEach((doc) => {
            html+=estructuraHTML(doc.data().title,color,doc.data().status);
          });
          document.getElementById("tareas").innerHTML=html;
          itemsEstado(".btnEnProceso","enProceso")
          itemsEstado(".btnPausa","enPausa")
          itemsEstado(".btnAcabado","completado")
        })
    })
}
async function buscador(){
    var texto=$("#filtroNombre").val();
    if(texto.trim()==""){
        cargarItems()
    }else{
        $('#tareas').html("");
        const referenciaLista = collection(db, "Usuarios",localStorage.getItem("id"),"Lista");
        const consulta = query(referenciaLista,orderBy("title"), startAt(texto),endAt(texto+"\uf8ff"));
        const unsubscribe = onSnapshot(consulta, (querySnapshot) => {
          var html="";
          var color="";
          querySnapshot.forEach((doc) => {
            if(doc.data().status=="enProceso"){
                color="text-primary"
            }else if(doc.data().status=="enPausa"){
                color="text-warning"
            }else if(doc.data().status=="completado"){
                color="text-success"
            }else{
                color="text-light";
            }
            html+=estructuraHTML(doc.data().title,color,doc.data().status);
          });
          document.getElementById("tareas").innerHTML=html;
        })       
    }

}