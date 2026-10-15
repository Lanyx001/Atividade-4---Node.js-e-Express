const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

let feedbacks = [];
let id = 1;

// Cadastrar feedback
app.post('/feedbacks/enviar', (req, res) => {
    feedbacks.push({
        id: id++,
        nome: req.body.nome,
        comentario: req.body.comentario
    });

    res.redirect('/feedbacks/lista');
});

// Evitar que textos sejam interpretados como HTML
function escapar(texto) {
    return String(texto).replace(/[&<>"']/g, c => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    })[c]);
}

// Listar feedbacks
app.get('/feedbacks/lista', (req, res) => {
    let html = `
        <link rel="stylesheet" href="/style.css">
        <div class="container">
        <h1>Lista de Feedbacks</h1>
    `;

    if (feedbacks.length === 0) {
        html += '<p>Nenhum feedback cadastrado.</p>';
    }

    feedbacks.forEach(f => {
        html += `
            <h3>${escapar(f.nome)}</h3>
            <p>${escapar(f.comentario)}</p>

            <form action="/feedbacks/remover" method="POST">
                <input type="hidden" name="id" value="${f.id}">
                <button type="submit">Remover</button>
            </form>
            <hr>
        `;
    });

    html += '<a href="/">Voltar ao início</a></div>';

    res.send(html);
});

// Remover feedback
app.post('/feedbacks/remover', (req, res) => {
    feedbacks = feedbacks.filter(
        f => f.id !== Number(req.body.id)
    );

    res.redirect('/feedbacks/lista');
});

// Iniciar servidor
app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});
