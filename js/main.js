// Función para calcular el préstamo
const calcularPrestamo = () => {
    // Definir los IDs de los campos y los mensajes de error en arrays
    const idsCampos = ['nombre', 'apellido', 'dni', 'email', 'monto', 'tasa', 'meses'];
    const idsErrores = ['error-nombre', 'error-apellido', 'error-dni', 'error-email', 'error-monto', 'error-tasa', 'error-meses'];

    // Crear un objeto para almacenar los datos del formulario
    const prestamo = idsCampos.reduce((acc, id) => {
        const elemento = document.getElementById(id);
        if (elemento) {
            acc[id] = id === 'monto' || id === 'tasa' ? parseFloat(elemento.value) : elemento.value;
            if (id === 'meses') acc[id] = parseInt(acc[id], 10);
        }
        return acc;
    }, {});

    // Crear un objeto para almacenar los mensajes de error
    const errores = idsCampos.reduce((acc, id) => ({ ...acc, [id]: '' }), {});

    // Limpiar mensajes de error en la página
    idsErrores.forEach(id => {
        const errorElemento = document.getElementById(id);
        if (errorElemento) errorElemento.textContent = '';
    });

    // Validar los valores ingresados
    let hayErrores = false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const validarCampo = (id, validacion, mensaje) => {
        if (!validacion) {
            errores[id] = mensaje;
            hayErrores = true;
        }
    };

    validarCampo('nombre', prestamo.nombre, 'El nombre es requerido.');
    validarCampo('apellido', prestamo.apellido, 'El apellido es requerido.');
    validarCampo('dni', prestamo.dni, 'El DNI es requerido.');
    validarCampo('email', prestamo.email, 'El email es requerido.');
    validarCampo('email', emailRegex.test(prestamo.email), 'El formato del email es inválido.');
    validarCampo('monto', Number.isFinite(prestamo.monto) && prestamo.monto > 0, 'Monto inválido.');
    validarCampo('tasa', Number.isFinite(prestamo.tasa) && prestamo.tasa >= 0, 'Tasa de interés inválida.');
    validarCampo('meses', Number.isFinite(prestamo.meses) && prestamo.meses > 0, 'Número de meses inválido.');

    // Mostrar los errores en la página
    Object.entries(errores).forEach(([key, error]) => {
        if (error) {
            const errorElemento = document.getElementById(`error-${key}`);
            if (errorElemento) errorElemento.textContent = error;
        }
    });

    if (hayErrores) return; // Detener el cálculo si hay errores

    // Convertir tasa anual en tasa mensual
    const tasaMensual = prestamo.tasa / 12 / 100;

    // Calcular el pago mensual usando la fórmula de amortización
    const pagoMensual = tasaMensual > 0
        ? prestamo.monto * (tasaMensual * Math.pow(1 + tasaMensual, prestamo.meses)) / (Math.pow(1 + tasaMensual, prestamo.meses) - 1)
        : prestamo.monto / prestamo.meses;

    // Calcular el pago total y los intereses totales
    const pagoTotal = pagoMensual * prestamo.meses;
    const interesesTotales = pagoTotal - prestamo.monto;

    // Mostrar el resultado en el HTML
    const resultadoDiv = document.getElementById('resultado');
    if (resultadoDiv) {
        resultadoDiv.innerHTML = `
            <h2>Resumen del Préstamo</h2>
            <p><strong>Nombre:</strong> ${prestamo.nombre} ${prestamo.apellido}</p>
            <p><strong>Dni:</strong> ${prestamo.dni}</p>
            <p><strong>Correo electrónico:</strong> ${prestamo.email}</p>
            <p><strong>Monto del préstamo:</strong> ${prestamo.monto.toFixed(2)}</p>
            <p><strong>Tasa de interés anual:</strong> ${prestamo.tasa.toFixed(2)}%</p>
            <p><strong>Número de meses:</strong> ${prestamo.meses}</p>
            <p><strong>Pago mensual:</strong> ${pagoMensual.toFixed(2)}</p>
            <p><strong>Pago total:</strong> ${pagoTotal.toFixed(2)}</p>
            <p><strong>Intereses totales:</strong> ${interesesTotales.toFixed(2)}</p>
        `;
    }

    // Mostrar un mensaje de éxito en el DOM
    const mensajeExitoDiv = document.getElementById('mensaje-exito');
    if (mensajeExitoDiv) {
        mensajeExitoDiv.textContent = 'La cotización del préstamo fue exitosa.';
        mensajeExitoDiv.style.display = 'block'; // Mostrar el mensaje
        mensajeExitoDiv.classList.add('show');
        mensajeExitoDiv.classList.remove('hide');

        // Ocultar el mensaje después de 3 segundos
        setTimeout(() => {
            mensajeExitoDiv.classList.add('hide');
            mensajeExitoDiv.classList.remove('show');
            setTimeout(() => {
                mensajeExitoDiv.style.display = 'none'; // Ocultar completamente el mensaje
            }, 300); // Tiempo para el efecto de desvanecimiento
        }, 3000); // Tiempo antes de ocultar el mensaje
    }

    // Guardar los datos en localStorage
    localStorage.setItem('prestamo', JSON.stringify(prestamo));

    // Eliminar los datos de localStorage después de guardarlos
    localStorage.removeItem('prestamo');

    // Verificar los datos guardados en localStorage
    console.log('Datos guardados en localStorage:', localStorage.getItem('prestamo'));
};

// Función para manejar el botón Solicitar Ahora
const manejarSolicitarAhora = () => {
    // Mostrar un mensaje de confirmación usando SweetAlert
    Swal.fire({
        title: 'Felicitaciones!',
        text: 'Te estaremos contactando a la brevedad por e-mail para finalizar la gestión.',
        icon: 'success',
        confirmButtonText: 'Aceptar'
    });
};

// Recuperar los datos del localStorage al cargar la página
window.onload = () => {
    const prestamoGuardado = JSON.parse(localStorage.getItem('prestamo'));
    if (prestamoGuardado) {
        const idsCampos = ['nombre', 'apellido', 'dni', 'email', 'monto', 'tasa', 'meses'];
        idsCampos.forEach(id => {
            const campo = document.getElementById(id);
            if (campo) {
                campo.value = (id === 'monto' || id === 'tasa')
                    ? prestamoGuardado[id].toFixed(2)
                    : prestamoGuardado[id];
            }
        });

        // Verificar los datos recuperados desde localStorage
        console.log('Datos recuperados desde localStorage:', prestamoGuardado);
    } else {
        // Si no hay datos en localStorage
        console.log('No hay datos de préstamo en localStorage.');
    }

    // Configurar el evento del botón Solicitar Ahora
    document.getElementById('solicitarAhora')?.addEventListener('click', manejarSolicitarAhora);
};
