const apiUrl = "http://localhost/app-php-js-chat-yes-no-senati/api.php";
const apiUrlYesNo = "https://yesno.wtf/api";

// Obtener referencias a los elementos del chat
let chatMessages = document.getElementById("chatMessages"); 
let chatForm = document.getElementById("chatForm");
let messageInput = document.getElementById("messageInput");


function agregarMensaje(mensaje, soyYo = true, imagen = null) {
    const mensajeDiv = document.createElement("div");
    mensajeDiv.classList.add("message", soyYo ? "user-message" : "api-message");
    mensajeDiv.textContent = mensaje;
    chatMessages.appendChild(mensajeDiv);

    if(imagen){
        const img =document.createElement('img');
        img.src = imagen;
        mensajeDiv.appendChild(img);
    }

    setTimeout(() => {
        chatMessages.scrollTop = chatMessages.scrollHeight
    }, 500);
}





async function getYesNoData() {
    try {
        const respuesta = await fetch(apiUrlYesNo, { method: "GET" });
        const data = await respuesta.json();
        agregarMensaje(data.answer.toUpperCase(), false,data.image); // Mostrar respuesta en el chat
    } catch (error) {
        console.log("Error al momento de hacer la petición GET: ", error);
    }
}

// Asociar el botón Yes/No API al chat
let botonGetYesNo = document.querySelector("#yes-no-data");
botonGetYesNo.addEventListener("click", function () {
    getYesNoData();
});


async function getData() {
    console.log("ingreso a get data");
    try {
        const respuesta = await fetch(
            `${apiUrl}?id=123&nombre=JoseLuis&apellido=BernedoLaura`,
            { method: "GET" }
        );
        const data = await respuesta.json();
        console.log(data);
    } catch (error) {
        console.log("Error al momento de hacer la peticion GET: ", error);
    }
}

let botonGet = document.querySelector(".getdata");
botonGet.addEventListener("click", function () {
    getData();
});


async function postData() {
    try {
        const respuesta = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                nombre: "Jose Luis",
                apellido: "Bernedo",
                lenguaje_favorito: "JavaScript",
                color: "azul",
            }),
        });
        const data_retorno = await respuesta.json();
        console.log(data_retorno);
    } catch (error) {
        console.log("Error al momento de hacer la peticion POST: ", error);
    }
}

let botonPost = document.querySelector("#post-data");
botonPost.addEventListener("click", function () {
    postData();
});


async function putData() {
    try {
        const respuesta = await fetch(apiUrl, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: 123, 
                nombre: "Jose Luis",
                apellido: "Bernedo Laura",
                lenguaje_favorito: "JavaScript",
                color: "verde",
            }),
        });
        const data_retorno = await respuesta.json();
        console.log("Respuesta de PUT: ", data_retorno);
    } catch (error) {
        console.log("Error al momento de hacer la petición PUT: ", error);
    }
}

// Asociar la función PUT al botón correspondiente
let botonPut = document.querySelector(".btn-outline-warning");
botonPut.addEventListener("click", function () {
    putData();
});

// Función para eliminar datos con DELETE
async function deleteData() {
    try {
        const respuesta = await fetch(`${apiUrl}?id=123`, {
            method: "DELETE",
        });
        const data_retorno = await respuesta.json();
        console.log("Respuesta de DELETE: ", data_retorno);
    } catch (error) {
        console.log("Error al momento de hacer la petición DELETE: ", error);
    }
}

// Asociar la función DELETE al botón correspondiente
let botonDelete = document.querySelector(".btn-outline-info");
botonDelete.addEventListener("click", function () {
    deleteData();
});



agregarMensaje("Hola, soy Jose Luis Bernedo", true);
agregarMensaje("Hola, soy la Api. ", false);


chatForm.addEventListener('submit',function(e){

    e.preventDefault();
    const miMensaje = messageInput.value;
    agregarMensaje(miMensaje,true);
    getYesNoData();
});