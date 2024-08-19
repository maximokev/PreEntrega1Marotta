// JavaScript para el cálculo del préstamo
function calcularPrestamo() {
    // Definir los IDs de los campos y los mensajes de error en arrays
    const idsCampos = ['nombre', 'apellido', 'email', 'monto', 'tasa', 'meses'];
    const idsErrores = ['error-nombre', 'error-apellido', 'error-email', 'error-monto', 'error-tasa', 'error-meses'];

    // Crear un objeto para almacenar los datos del formulario
    let prestamo = {};
    idsCampos.forEach(id => {
        prestamo[id] = id === 'monto' || id === 'tasa' ? parseFloat(document.getElementById(id).value) : document.getElementById(id).value;
        if (id === 'meses') {
            prestamo[id] = parseInt(prestamo[id]);
        }
    });

    // Crear un objeto para almacenar los mensajes de error
    let errores = {
        nombre: '',
        apellido: '',
        email: '',
        monto: '',
        tasa: '',
        meses: ''
    };

    // Limpiar mensajes de error en la página
    idsErrores.forEach(id => {
        document.getElementById(id).textContent = '';
    });

    // Validar los valores ingresados
    let hayErrores = false;

    if (!prestamo.nombre) {
        errores.nombre = 'El nombre es requerido.';
        hayErrores = true;
    }
    if (!prestamo.apellido) {
        errores.apellido = 'El apellido es requerido.';
        hayErrores = true;
    }
    if (!prestamo.email) {
        errores.email = 'El email es requerido.';
        hayErrores = true;
    }
    if (isNaN(prestamo.monto) || prestamo.monto <= 0) {
        errores.monto = 'Monto inválido.';
        hayErrores = true;
    }
    if (isNaN(prestamo.tasa) || prestamo.tasa < 0) {
        errores.tasa = 'Tasa de interés inválida.';
        hayErrores = true;
    }
    if (isNaN(prestamo.meses) || prestamo.meses <= 0) {
        errores.meses = 'Número de meses inválido.';
        hayErrores = true;
    }

    // Mostrar los errores en la página
    Object.keys(errores).forEach(key => {
        if (errores[key]) {
            document.getElementById(`error-${key}`).textContent = errores[key];
        }
    });

    if (hayErrores) return; // Detener el cálculo si hay errores

    // Convertir tasa anual en tasa mensual
    let tasaMensual = prestamo.tasa / 12 / 100;

    // Calcular el pago mensual usando la fórmula de amortización
    let pagoMensual;
    if (tasaMensual > 0) {
        pagoMensual = prestamo.monto * (tasaMensual * Math.pow(1 + tasaMensual, prestamo.meses)) / (Math.pow(1 + tasaMensual, prestamo.meses) - 1);
    } else {
        pagoMensual = prestamo.monto / prestamo.meses;
    }

    // Calcular el pago total y los intereses totales
    let pagoTotal = pagoMensual * prestamo.meses;
    let interesesTotales = pagoTotal - prestamo.monto;

    // Mostrar el resultado en la consola
    console.log('Resumen del Préstamo');
    console.log(`Nombre: ${prestamo.nombre} ${prestamo.apellido}`);
    console.log(`Correo electrónico: ${prestamo.email}`);
    console.log(`Monto del préstamo: ${prestamo.monto}`);
    console.log(`Tasa de interés anual: ${prestamo.tasa}%`);
    console.log(`Número de meses: ${prestamo.meses}`);
    console.log(`Pago mensual: ${pagoMensual.toFixed(2)}`);
    console.log(`Pago total: ${pagoTotal.toFixed(2)}`);
    console.log(`Intereses totales: ${interesesTotales.toFixed(2)}`);

    // Mostrar el resultado en el HTML
    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = `
        <h2>Resumen del Préstamo</h2>
        <p><strong>Nombre:</strong> ${prestamo.nombre} ${prestamo.apellido}</p>
        <p><strong>Correo electrónico:</strong> ${prestamo.email}</p>
        <p><strong>Monto del préstamo:</strong> ${prestamo.monto.toFixed(2)}</p>
        <p><strong>Tasa de interés anual:</strong> ${prestamo.tasa.toFixed(2)}%</p>
        <p><strong>Número de meses:</strong> ${prestamo.meses}</p>
        <p><strong>Pago mensual:</strong> ${pagoMensual.toFixed(2)}</p>
        <p><strong>Pago total:</strong> ${pagoTotal.toFixed(2)}</p>
        <p><strong>Intereses totales:</strong> ${interesesTotales.toFixed(2)}</p>
    `;

    // Mostrar un mensaje de éxito
    alert('La cotización del préstamo fue exitosa.');
}
