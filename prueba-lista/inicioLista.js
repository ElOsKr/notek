document.addEventListener("readystatechange", cargarEventos, false);

function cargarEventos() {
    cargarItems();
    document.getElementById("botonAniadir").addEventListener("click",aniadir);
    document.getElementById("btnVerEnProceso").addEventListener("click",mostrarEnProceso);
    document.getElementById("btnVerEnPausa").addEventListener("click",mostrarEnPausa);
    document.getElementById("btnVerCompletados").addEventListener("click",mostrarAcabados);
    document.getElementById("btnTodos").addEventListener("click",cargarItems);
    //document.getElementById("botonAddFecha").addEventListener("click",aniadirFecha);
}

function cargarItems(){
    var cadena='x=1';
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
      if(this.readyState==4 && this.status==200){
        var comprobar=JSON.parse(this.responseText);
        if(comprobar[0]==1){
            if(comprobar[1]!=""){
                $(".btnEleccionEstado").css("display","flex");
                var html="";
                comprobar[1].forEach(item=>{
                    var color="";
                    if(item.status=="enProceso"){
                        color="text-primary"
                    }else if(item.status=="enPausa"){
                        color="text-warning"
                    }else if(item.status=="completado"){
                        color="text-success"
                    }
                    html +=`
                    <div class="d-flex" data-status="${item.status}">
                        <p class="me-2 mt-3 ${item.id} ${color}">${item.title}</p>
                        <div class="${item.id} me-auto mt-2">
                            <button class="btn btnEnProceso text-primary" data-id="${item.id}">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-gear" viewBox="0 0 16 16">
                                <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/>
                                <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"/>
                                </svg>
                            </button>
                            <button class="btn btnPausa text-warning" data-id="${item.id}">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pause-circle" viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                <path d="M5 6.25a1.25 1.25 0 1 1 2.5 0v3.5a1.25 1.25 0 1 1-2.5 0v-3.5zm3.5 0a1.25 1.25 0 1 1 2.5 0v3.5a1.25 1.25 0 1 1-2.5 0v-3.5z"/>
                                </svg>
                            </button>
                            <button class="btn btnAcabado text-success" data-id="${item.id}">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-check-square" viewBox="0 0 16 16">
                                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                                <path d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.235.235 0 0 1 .02-.022z"/>
                                </svg>
                            </button>
                        </div>
                        <div class="oculto input-group mb-3 ${item.id} me-auto w-75">
                            <input type="text" class="form-control bg-transparent text-light" value="${item.title}">
                            <button class="btn btnGuardarEditar text-light" data-id="${item.id}">
                                <span class="material-symbols-outlined">
                                    save
                                </span>
                            </button>
                        </div>
                        <div class="mt-2">
                            <button class="btn btnEditar text-light" data-id="${item.id}">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                </svg>
                            </button>
                            <button class="btn btnAddCalendario text-light" data-id="${item.id}">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-calendar" viewBox="0 0 16 16">
                                <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
                                </svg>
                            </button>
                            <button class="btn btnEliminar text-light" data-id="${item.id}">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                    `;
                })
                document.getElementById("tareas").innerHTML=html;
                borrarItem();
                editarItem();
                guardarEdit();
                itemEnProceso();
                itemEnPausa();
                itemAcabado();
            }else{
                $(".btnEleccionEstado").css("display","none");
                $('#tareas').html("Hay mucho por hacer SIUUUUUUU");
            }
        }else{
          alert("Error");
        }
      }
    }
    xhttp.open("POST", "baseLista.php");
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(cadena); 
}


function aniadir(){
    if($('#tareas').html()=="Hay mucho por hacer SIUUUUUUU"){
        $('#tareas').html("");
    }
    var nombreItem=document.getElementById("listaItemNombre").value;
    if(nombreItem==""){
        $('.errorItem').show();
    }else{
        $('.errorItem').hide();
        var cadenaDatos=JSON.stringify(nombreItem);
        var cadena='a='+cadenaDatos;
        const xhttp = new XMLHttpRequest();
        xhttp.onload = function() {
        if(this.readyState==4 && this.status==200){
            var comprobar=JSON.parse(this.responseText);
            if(comprobar==0){
              alert("Error");  
            }else{
                var html=`
                <div class="d-flex">
                    <p class="me-2 mt-3 ${comprobar}">${nombreItem}</p>
                    <div class="${comprobar} me-auto mt-2">
                        <button class="btn btnEnProceso text-primary" data-id="${comprobar}">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-gear" viewBox="0 0 16 16">
                            <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/>
                            <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"/>
                            </svg>
                        </button>
                        <button class="btn btnPausa text-warning" data-id="${comprobar}">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pause-circle" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                            <path d="M5 6.25a1.25 1.25 0 1 1 2.5 0v3.5a1.25 1.25 0 1 1-2.5 0v-3.5zm3.5 0a1.25 1.25 0 1 1 2.5 0v3.5a1.25 1.25 0 1 1-2.5 0v-3.5z"/>
                            </svg>
                        </button>
                        <button class="btn btnAcabado text-success" data-id="${comprobar}">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-check-square" viewBox="0 0 16 16">
                            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                            <path d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.235.235 0 0 1 .02-.022z"/>
                            </svg>
                        </button>
                    </div>
                    <div class="oculto input-group mb-3 ${comprobar} w-75">
                        <input type="text" class="form-control bg-transparent text-light" value="${nombreItem}">
                        <button class="btn btnGuardarEditar text-light" data-id="${comprobar}">
                            <span class="material-symbols-outlined">
                                save
                            </span>
                        </button>
                    </div>
                    <div class="mt-2">
                        <button class="btn btnEditar text-light" data-id="${comprobar}">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                            </svg>
                        </button>
                        <button class="btn btnAddCalendario text-light" data-id="${comprobar}">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-calendar" viewBox="0 0 16 16">
                            <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
                            </svg>
                        </button>
                        <button class="btn btnEliminar text-light" data-id="${comprobar}">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                            </svg>
                        </button>
                    </div>
                </div>
                `;
                document.getElementById("tareas").innerHTML+=html;
                cargarItems();
                $("#listaItemNombre").val("");
            
            }
        }
        }
        xhttp.open("POST", "baseLista.php");
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send(cadena);        
    }

}

function borrarItem(){
    var listaBotonesBorrar=document.querySelectorAll(".btnEliminar");
    for (let i = 0; i < listaBotonesBorrar.length; i++) {
        listaBotonesBorrar[i].addEventListener("click", (evento) => {
        const id = evento.currentTarget.dataset.id;
        var cadenaDatos=JSON.stringify(id);
        var cadena='b='+cadenaDatos;
        const xhttp = new XMLHttpRequest();
        xhttp.onload = function() {
            if(this.readyState==4 && this.status==200){
                var comprobar=JSON.parse(this.responseText);
                if(comprobar==0){
                    alert("Error");  
                }else{
                    cargarItems();
                }
            }
        }
        xhttp.open("POST", "baseLista.php");
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send(cadena);  
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

function guardarEdit(){
    var listaBotonesGuardarEditar=document.querySelectorAll(".btnGuardarEditar");
    for (let i = 0; i < listaBotonesGuardarEditar.length; i++) {
        listaBotonesGuardarEditar[i].addEventListener("click", (evento) => {
            const id = evento.currentTarget.dataset.id;
            var cajaTitulo=$("."+id)[1];
            var titulo=cajaTitulo.childNodes[1].value;
            var datos=[id,titulo];
            var cadenaDatos=JSON.stringify(datos);
            var cadena='e='+cadenaDatos;
            const xhttp = new XMLHttpRequest();
            xhttp.onload = function() {
                if(this.readyState==4 && this.status==200){
                    var comprobar=JSON.parse(this.responseText);
                    if(comprobar==0){
                        alert("Error");  
                    }else{
                        cargarItems();
                    }
                }
            }
            xhttp.open("POST", "baseLista.php");
            xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhttp.send(cadena);
        });
    }
}

function itemEnProceso(){
    var listaBotonesEnProceso=document.querySelectorAll(".btnEnProceso");
    for (let i = 0; i < listaBotonesEnProceso.length; i++) {
        listaBotonesEnProceso[i].addEventListener("click", (evento) => {
            const id = evento.currentTarget.dataset.id;
            var cadenaDatos=JSON.stringify(id);
            var cadena='p='+cadenaDatos;
            const xhttp = new XMLHttpRequest();
            xhttp.onload = function() {
                if(this.readyState==4 && this.status==200){
                    var comprobar=JSON.parse(this.responseText);
                    if(comprobar==0){
                        alert("Error");  
                    }else{
                        cargarItems();
                    }
                }
            }
            xhttp.open("POST", "baseLista.php");
            xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhttp.send(cadena);
        });
    }
}

function itemEnPausa(){
    var listaBotonesEnProceso=document.querySelectorAll(".btnPausa");
    for (let i = 0; i < listaBotonesEnProceso.length; i++) {
        listaBotonesEnProceso[i].addEventListener("click", (evento) => {
            const id = evento.currentTarget.dataset.id;
            var cadenaDatos=JSON.stringify(id);
            var cadena='s='+cadenaDatos;
            const xhttp = new XMLHttpRequest();
            xhttp.onload = function() {
                if(this.readyState==4 && this.status==200){
                    var comprobar=JSON.parse(this.responseText);
                    if(comprobar==0){
                        alert("Error");  
                    }else{
                        cargarItems();
                    }
                }
            }
            xhttp.open("POST", "baseLista.php");
            xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhttp.send(cadena);
        });
    }
}

function itemAcabado(){
    var listaBotonesEnProceso=document.querySelectorAll(".btnAcabado");
    for (let i = 0; i < listaBotonesEnProceso.length; i++) {
        listaBotonesEnProceso[i].addEventListener("click", (evento) => {
            const id = evento.currentTarget.dataset.id;
            var cadenaDatos=JSON.stringify(id);
            var cadena='c='+cadenaDatos;
            const xhttp = new XMLHttpRequest();
            xhttp.onload = function() {
                if(this.readyState==4 && this.status==200){
                    var comprobar=JSON.parse(this.responseText);
                    if(comprobar==0){
                        alert("Error");  
                    }else{
                        cargarItems();
                    }
                }
            }
            xhttp.open("POST", "baseLista.php");
            xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhttp.send(cadena);
        });
    }
}

function mostrarEnProceso(){
    var listaItems=document.getElementById("tareas").childNodes;
    for (let i = 0; i < listaItems.length; i++) {
        if(listaItems[i].nodeName=="DIV"){
            if(listaItems[i].dataset.status!="enProceso"){
                $(listaItems[i]).removeClass("d-flex");
                $(listaItems[i]).css("display","none");
            }else{
                $(listaItems[i]).addClass("d-flex");
                $(listaItems[i]).css("display","block");
            }            
        }
    }
}

function mostrarEnPausa(){
    var listaItems=document.getElementById("tareas").childNodes;
    for (let i = 0; i < listaItems.length; i++) {
        if(listaItems[i].nodeName=="DIV"){
            if(listaItems[i].dataset.status!="enPausa"){
                $(listaItems[i]).removeClass("d-flex");
                $(listaItems[i]).css("display","none");
            }else{
                $(listaItems[i]).addClass("d-flex");
                $(listaItems[i]).css("display","block");
            }            
        }
    }
}

function mostrarAcabados(){
    var listaItems=document.getElementById("tareas").childNodes;
    for (let i = 0; i < listaItems.length; i++) {
        if(listaItems[i].nodeName=="DIV"){
            if(listaItems[i].dataset.status!="completado"){
                $(listaItems[i]).removeClass("d-flex");
                $(listaItems[i]).css("display","none");
            }else{
                $(listaItems[i]).addClass("d-flex");
                $(listaItems[i]).css("display","block");
            }            
        }
    }
}


function aniadirFecha(){

}