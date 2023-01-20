
// variables iniciales
const letterContainer = document.getElementById("letter-container");
const optionsContainer = document.getElementById("options-container");
const userInputSection = document.getElementById("user-input-section");
const newGameContainer = document.getElementById("new-game-container");
const newGameButton = document.getElementById("new-game-button");
const canvas = document.getElementById("canvas");
const resultText = document.getElementById("result-text");

// opciones para botones
let options = {
  frutas: [
    "Banana",
    "Manzana",
    "Mandarina",
    "Anana",
    "Melon",
    "Sandia",
  ],
  animales: ["Megalodon", "Cuervo", "Cerdo", "Pantera", "Elefante", "Caballo"],
  paises: [
    "India",
    "Uruguay",
    "Kazajistan",
    "Holanda",
    "Argentina",
    "Dinamarca",
  ],
};

// para contar
let winCount = 0;
let count = 0;

let chosenWord = "";

//Mostrar botones de opciones
const displayOptions = () => {
  optionsContainer.innerHTML += `<h3>Seleccione una opción</h3>`;
  let buttonCon = document.createElement("div");
  for (let value in options) {
    buttonCon.innerHTML += `<button class="options" onclick="generateWord('${value}')">${value}</button>`;
  }
  optionsContainer.appendChild(buttonCon);
};

//Bloquear todos los botones
const blocker = () => {
  let optionsButtons = document.querySelectorAll(".options");
  let letterButtons = document.querySelectorAll(".letters");
  //deshabilitar todas las opciones
  optionsButtons.forEach((button) => {
    button.disabled = true;
  });

  //deshabilitar todas las letras
  letterButtons.forEach((button) => {
    button.disabled.true;
  });
  newGameContainer.classList.remove("hide");
};

//Generador de palabras
const generateWord = (optionValue) => {
  let optionsButtons = document.querySelectorAll(".options");
  //Si optionValur coincide con el botón texto interior, resalte el botón
  optionsButtons.forEach((button) => {
    if (button.innerText.toLowerCase() === optionValue) {
      button.classList.add("active");
    }
    button.disabled = true;
  });

  //inicialmente ocultar letras, borrar palabra anterior
  letterContainer.classList.remove("hide");
  userInputSection.innerText = "";

  let optionArray = options[optionValue];
 //elegir palabra al azar
  chosenWord = optionArray[Math.floor(Math.random() * optionArray.length)];
  chosenWord = chosenWord.toUpperCase();

  // reemplaza cada letra con un espacio que contenga un guión
  let displayItem = chosenWord.replace(/./g, '<span class="dashes">_</span>');

  //Mostrar cada elemento como intervalo
  userInputSection.innerHTML = displayItem;
};

//Función inicial (llamada cuando se carga la página/el usuario presiona nuevo juego)
const initializer = () => {
  winCount = 0;
  count = 0;

  // Inicialmente borre todo el contenido y oculte las letras y el nuevo botón de juego
  userInputSection.innerHTML = "";
  optionsContainer.innerHTML = "";
  letterContainer.classList.add("hide");
  newGameContainer.classList.add("hide");
  letterContainer.innerHTML = "";

  //Para crear botones de letras
  for (let i = 65; i < 91; i++) {
    let button = document.createElement("button");
    button.classList.add("letters");
    // numero a ASCII[A-Z]
    button.innerText = String.fromCharCode(i);
    //clic en botón de personaje
    button.addEventListener("click", () => {
      let charArray = chosenWord.split("");
      let dashes = document.getElementsByClassName("dashes");
      // si la matriz contiene un valor seleccionado, reemplace el guión coincidente con la letra, de lo contrario, dram en el lienzo
      if (charArray.includes(button.innerText)) {
        charArray.forEach((char, index) => {
          //si el carácter en la matriz es el mismo que el botón en el que se hizo clic
          if (char === button.innerText) {
           //reemplazar guion con letra
            dashes[index].innerText = char;
            //contador de incrementos
            winCount += 1;
            //si winCount es igual a la longitud de la palabra
            if (winCount == charArray.length) {
              resultText.innerHTML = `<h2 class='win-msg'>Tu Ganas!!</h2><p>La palabra correcta era: <span>${chosenWord}</span></p>`;
              //bloquear todo los btn
              blocker();
            }
          }
        });
      } else {
        //perder la cuenta
        count += 1;
        //para dibujar hombre
        drawMan(count);
        //Cuenta ==6 porque cabeza,cuerpo,brazo izquierdo,brazo derecho,pierna izquierda,pierna derecha
        if (count == 6) {
          resultText.innerHTML = `<h2 class='lose-msg'>Perdiste!!</h2><p>La palabra era: <span>${chosenWord}</span></p>`;
          blocker();
        }
      }
      //deshabilitar botón pulsado
      button.disabled = true;
    });
    letterContainer.append(button);
  }

  displayOptions();
  //Llamar a canvasCreator (para borrar el lienzo anterior y crear el lienzo inicial)
  let { initialDrawing } = canvasCreator();
  //Dibujoinicial dibujaría el marco
  initialDrawing();
};

//Canvas
const canvasCreator = () => {
  let context = canvas.getContext("2d");
  context.beginPath();
  context.strokeStyle = "#000";
  context.lineWidth = 2;

  //Para dibujar lineas
  const drawLine = (fromX, fromY, toX, toY) => {
    context.moveTo(fromX, fromY);
    context.lineTo(toX, toY);
    context.stroke();
  };

  const head = () => {
    context.beginPath();
    context.arc(70, 30, 10, 0, Math.PI * 2, true);
    context.stroke();
  };

  const body = () => {
    drawLine(70, 40, 70, 80);
  };

  const leftArm = () => {
    drawLine(70, 50, 50, 70);
  };

  const rightArm = () => {
    drawLine(70, 50, 90, 70);
  };

  const leftLeg = () => {
    drawLine(70, 80, 50, 110);
  };

  const rightLeg = () => {
    drawLine(70, 80, 90, 110);
  };

  //fotograma inicial
  const initialDrawing = () => {
    //lienzo claro
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    //línea de fondo
    drawLine(10, 130, 130, 130);
    // linea izquierda
    drawLine(10, 10, 10, 131);
    // linea de arriba
    drawLine(10, 10, 70, 10);
    // pequeña line superior
    drawLine(70, 10, 70, 20);
  };

  return { initialDrawing, head, body, leftArm, rightArm, leftLeg, rightLeg };
};

// dibujar al hombre ahorcado
const drawMan = (count) => {
  let { head, body, leftArm, rightArm, leftLeg, rightLeg } = canvasCreator();
  switch (count) {
    case 1:
      head();
      break;
    case 2:
      body();
      break;
    case 3:
      leftArm();
      break;
    case 4:
      rightArm();
      break;
    case 5:
      leftLeg();
      break;
    case 6:
      rightLeg();
      break;
    default:
      break;
  }
};

// nuevo juego
newGameButton.addEventListener("click", initializer);
window.onload = initializer;