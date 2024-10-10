class ValidarFormulario {

    // Método para validar el nombre y apellido
    validarNombre(nombre) {
        const regexNombre = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{3,100}$/;
        if (!regexNombre.test(nombre)) {
            return JSON.stringify({ status: 'error', campo: 'nombre', mensaje: 'El nombre debe tener entre 3 y 100 caracteres y solo puede contener letras.' });
        }
        return JSON.stringify({ status: 'success', campo: 'nombre', mensaje: 'Nombre válido.' });
    }

    // Método para validar el correo electrónico
    validarCorreo(correo) {
        const regexCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!regexCorreo.test(correo)) {
            return JSON.stringify({ status: 'error', campo: 'correo', mensaje: 'Debes ingresar un correo electrónico válido.' });
        }
        return JSON.stringify({ status: 'success', campo: 'correo', mensaje: 'Correo válido.' });
    }

    // Método para validar la contraseña
    validarContrasena(contrasena) {
        const regexContrasena = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
        if (!regexContrasena.test(contrasena)) {
            return JSON.stringify({ 
                status: 'error', 
                campo: 'contrasena', 
                mensaje: 'La contraseña debe tener al menos 8 caracteres, incluir una mayúscula, una minúscula, un número y un carácter especial.' 
            });
        }
        return JSON.stringify({ 
            status: 'success', 
            campo: 'contrasena', 
            mensaje: 'Contraseña válida.' 
        });
    }
    
    // Método para validar la edad automática según la fecha de nacimiento
    calcularEdad(fechaNacimiento) {
        const hoy = new Date();
        const fecha = new Date(fechaNacimiento);
        let edad = hoy.getFullYear() - fecha.getFullYear();
        const mes = hoy.getMonth() - fecha.getMonth();
        if (mes < 0 || (mes === 0 && hoy.getDate() < fecha.getDate())) {
            edad--;
        }
        return edad;
    }

    validarFechaNacimiento(fechaNacimiento) {
        // Verificar si el campo está vacío
        if (!fechaNacimiento) {
            return JSON.stringify({ 
                status: 'error', 
                campo: 'Fecha de nacimiento', 
                mensaje: 'Debes ingresar una fecha de nacimiento válida.' 
            });
        }
    
        const edad = this.calcularEdad(fechaNacimiento);
        if (edad < 18) {
            return JSON.stringify({ 
                status: 'error', 
                campo: 'Fecha de nacimiento', 
                mensaje: 'Debes tener al menos 18 años.' 
            });
        }
    
        // Actualiza el slider y la visualización de la edad
        document.getElementById('edadSlider').value = edad;
        document.getElementById('edadDisplay').textContent = edad;
    
        return JSON.stringify({ 
            status: 'success', 
            campo: 'Fecha de nacimiento', 
            mensaje: 'Fecha de nacimiento válida.' 
        });
    }
    calcularEdad(fechaNacimiento) {
        const hoy = new Date();
        const fecha = new Date(fechaNacimiento);
        let edad = hoy.getFullYear() - fecha.getFullYear();
        const mes = hoy.getMonth() - fecha.getMonth();
        if (mes < 0 || (mes === 0 && hoy.getDate() < fecha.getDate())) {
            edad--;
        }
        return edad;
    }

    // Método para validar el tipo de documento
    validarTipoDocumento(tipoDocumento, edad) {
        if (tipoDocumento === "TI" && edad >= 18) {
            return JSON.stringify({ status: 'error', campo: 'Tipo de documento', mensaje: 'La Tarjeta de Identidad es solo para menores de edad.' });
        }
        if (tipoDocumento === "") {
            return JSON.stringify({ status: 'error', campo: 'Tipo de documento', mensaje: 'Debes seleccionar un tipo de documento.' });
        }
        return JSON.stringify({ status: 'success', campo: 'Tipo de documento', mensaje: 'Tipo de documento válido.' });
    }

    // Método para validar el número de documento
    validarNumeroDocumento(numeroDocumento) {
        const regexNumero = /^\d{10,}$/;
        if (!regexNumero.test(numeroDocumento)) {
            return JSON.stringify({ status: 'error', campo: 'Numero de documento', mensaje: 'El número de documento debe tener al menos 10 dígitos y contener solo números.' });
        }
        return JSON.stringify({ status: 'success', campo: 'Numero de documento', mensaje: 'Número de documento válido.' });
    }

    // Método para validar el género
    validarGenero(genero) {
        if (genero === "") {
            return JSON.stringify({ status: 'error', campo: 'genero', mensaje: 'Debes seleccionar un género.' });
        }
        return JSON.stringify({ status: 'success', campo: 'genero', mensaje: 'Género válido.' });
    }

    // Método para validar que se seleccione un hobbie
    validarHobbie(hobbie) {
        if (hobbie === null) {
            return JSON.stringify({ status: 'error', campo: 'hobbie', mensaje: 'Debes seleccionar un hobbie.' });
        }
        return JSON.stringify({ status: 'success', campo: 'hobbie', mensaje: 'Hobbie válido.' });
    }

    // Método para validar que se seleccione al menos una habilidad
    validarHabilidad() {
        const habilidades = document.querySelectorAll('input[name="habilidad"]:checked');
        if (habilidades.length < 1) {
            return JSON.stringify({ status: 'error', campo: 'habilidad', mensaje: 'Debes seleccionar al menos una habilidad.' });
        }
        return JSON.stringify({ status: 'success', campo: 'habilidad', mensaje: 'Habilidades válidas.' });
    }

  // Método para validar todo el formulario
  validarFormulario() {
    const nombre = document.getElementById('nombre').value;
    const correo = document.getElementById('correo').value;
    const contrasena = document.getElementById('contrasena').value; // Captura el valor correctamente
    const fechaNacimiento = document.getElementById('fechaNacimiento').value;
    const tipoDocumento = document.getElementById('tipoDocumento').value;
    const numeroDocumento = document.getElementById('numeroDocumento').value;
    const genero = document.getElementById('genero').value;
    const hobbie = document.querySelector('input[name="hobbie"]:checked');
    const edad = this.calcularEdad(fechaNacimiento);

    let resultados = [];

    resultados.push(this.validarNombre(nombre));
    resultados.push(this.validarCorreo(correo));
    resultados.push(this.validarContrasena(contrasena)); // Valida correctamente la contraseña
    resultados.push(this.validarFechaNacimiento(fechaNacimiento));
    resultados.push(this.validarTipoDocumento(tipoDocumento, edad));
    resultados.push(this.validarNumeroDocumento(numeroDocumento));
    resultados.push(this.validarGenero(genero));
    resultados.push(this.validarHobbie(hobbie));
    resultados.push(this.validarHabilidad());

    return resultados;
}
}

// Event listener
document.getElementById('formulario').addEventListener('submit', function (event) {
event.preventDefault();

const validador = new ValidarFormulario();
const resultados = validador.validarFormulario();
const mensajeDiv = document.getElementById('mensaje');
mensajeDiv.innerHTML = ''; // Limpia los mensajes anteriores

let formularioValido = true;

resultados.forEach(resultado => {
    const resultadoObj = JSON.parse(resultado);
    const mensaje = document.createElement('p');
    mensaje.textContent = `${resultadoObj.campo}: ${resultadoObj.mensaje}`;
    if (resultadoObj.status === 'error') {
        mensaje.classList.add('text-danger');
        formularioValido = false;
    } else {
        mensaje.classList.add('text-success');
    }
    mensajeDiv.appendChild(mensaje);
});

if (formularioValido) {
    document.getElementById('formulario').reset();
}
});