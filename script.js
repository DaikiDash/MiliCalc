const input = document.getElementById("ingresoTexto");
const resultado = document.getElementById("resultado");
const botonesNumeros = document.querySelectorAll(".numeros .boton");
const operadorSuma = document.getElementById("operadorSuma");
const operadorResta = document.getElementById("operadorResta");
const operadorDivisor = document.getElementById("operadorDivisor");
const operadorMultiplicador = document.getElementById("operadorMultiplicador");
const botonIgual = document.getElementById("igual");
const eliminarValores = document.getElementById("EliminarValores");

let valorActual = "";
let valorAnterior = "";
let operador = "";

function actualizarTexto() {
  input.value = valorActual;
}

botonesNumeros.forEach((boton) => {
  boton.addEventListener("click", () => {
    if (valorActual.length < 10) {
      valorActual += boton.value;
      actualizarTexto();
    }
  });
});

function asignarOperador(op) {
  if (valorActual !== "") {
    if (valorAnterior !== "") {
      calcularResultado();
    }
    operador = op;
    valorAnterior = valorActual;
    valorActual = "";
  }
}

operadorSuma.addEventListener("click", () => asignarOperador("+"));
operadorResta.addEventListener("click", () => asignarOperador("-"));
operadorDivisor.addEventListener("click", () => asignarOperador("÷"));
operadorMultiplicador.addEventListener("click", () => asignarOperador("×"));

function calcularResultado() {
  if (valorAnterior !== "" && valorActual !== "" && operador !== "") {
    const num1 = parseFloat(valorAnterior);
    const num2 = parseFloat(valorActual);
    let resultadoFinal = 0;

    switch (operador) {
      case "+":
        resultadoFinal = num1 + num2;
        break;
      case "-":
        resultadoFinal = num1 - num2;
        break;
      case "÷":
        resultadoFinal = num2 !== 0 ? num1 / num2 : "Error";
        break;
      case "×":
        resultadoFinal = num1 * num2;
        break;
      default:
        resultadoFinal = "Error";
    }

    resultado.textContent = `Resultado: ${resultadoFinal}`;
    valorActual = resultadoFinal.toString();
    valorAnterior = "";
    operador = "";
    actualizarTexto();
  }
}

botonIgual.addEventListener("click", calcularResultado);

eliminarValores.addEventListener("click", () => {
  valorActual = "";
  valorAnterior = "";
  operador = "";
  resultado.textContent = "Resultado: 0";
  actualizarTexto();
});

input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    calcularResultado();
  }
});
