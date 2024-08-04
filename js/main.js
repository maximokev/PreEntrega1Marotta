function calcularPrestamo() {
    // Obtener los valores del formulario
    let nombre = document.getElementById('nombre').value;
    let apellido = document.getElementById('apellido').value;
    let email = document.getElementById('email').value;
    let monto = parseFloat(document.getElementById('monto').value);
    let tasaAnual = parseFloat(document.getElementById('tasa').value);
    let meses = parseInt(document.getElementById('meses').value);

    // Limpiar mensajes de error
    let errores = false;
    document.querySelectorAll('.error').forEach(span => span.textContent = '');

    // Validar los valores ingresados
    if (!nombre) {
        document.getElementById('error-nombre').textContent = 'El nombre es requerido.';
        errores = true;
    }
    if (!apellido) {
        document.getElementById('error-apellido').textContent = 'El apellido es requerido.';
        errores = true;
    }
    if (!email) {
        document.getElementById('error-email').textContent = 'El email es requerido.';
        errores = true;
    }
    if (isNaN(monto) || monto <= 0) {
        document.getElementById('error-monto').textContent = 'Monto inválido.';
        errores = true;
    }
    if (isNaN(tasaAnual) || tasaAnual < 0) {
        document.getElementById('error-tasa').textContent = 'Tasa de interés inválida.';
        errores = true;
    }
    if (isNaN(meses) || meses <= 0) {
        document.getElementById('error-meses').textContent = 'Número de meses inválido.';
        errores = true;
    }

    if (errores) return; // Detener el cálculo si hay errores

    // Convertir tasa anual en tasa mensual
    let tasaMensual = tasaAnual / 12 / 100;

    // Calcular el pago mensual usando la fórmula de amortización
    let pagoMensual;
    if (tasaMensual > 0) {
        pagoMensual = monto * (tasaMensual * Math.pow(1 + tasaMensual, meses)) / (Math.pow(1 + tasaMensual, meses) - 1);
    } else {
        pagoMensual = monto / meses;
    }

    // Calcular el pago total y los intereses totales
    let pagoTotal = pagoMensual * meses;
    let interesesTotales = pagoTotal - monto;

    // Mostrar el resultado en la consola
    console.log('Resumen del Préstamo');
    console.log(`Nombre: ${nombre} ${apellido}`);
    console.log(`Correo electrónico: ${email}`);
    console.log(`Monto del préstamo: ${monto.toFixed(2)}`);
    console.log(`Tasa de interés anual: ${tasaAnual.toFixed(2)}%`);
    console.log(`Número de meses: ${meses}`);
    console.log(`Pago mensual: ${pagoMensual.toFixed(2)}`);
    console.log(`Pago total: ${pagoTotal.toFixed(2)}`);
    console.log(`Intereses totales: ${interesesTotales.toFixed(2)}`);

    // Mostrar el resultado en la página
    document.getElementById('resultado').innerHTML = `
        <h2>Resumen del Préstamo</h2>
        <p><strong>Nombre:</strong> ${nombre} ${apellido}</p>
        <p><strong>Monto del préstamo:</strong> ${monto.toFixed(2)}</p>
        <p><strong>Tasa de interés anual:</strong> ${tasaAnual.toFixed(2)}%</p>
        <p><strong>Número de meses:</strong> ${meses}</p>
        <p><strong>Pago mensual:</strong> ${pagoMensual.toFixed(2)}</p>
        <p><strong>Pago total:</strong> ${pagoTotal.toFixed(2)}</p>
        <p><strong>Intereses totales:</strong> ${interesesTotales.toFixed(2)}</p>
    `;

    // Mostrar un mensaje de éxito
    alert('La cotización del préstamo fue exitosa.');
}