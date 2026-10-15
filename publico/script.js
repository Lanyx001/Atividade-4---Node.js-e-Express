const formulario = document.querySelector('form');

formulario.addEventListener('submit', function(event) {
    const confirmar = confirm('Deseja enviar seu feedback?');

    if (!confirmar) {
        event.preventDefault();
    }
});