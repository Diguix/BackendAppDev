const express = require('express');

const app = express();

app.get('/', (req, resp) => {
    return resp.json({message: 'Funcionando'});
});

app.listen(3333);