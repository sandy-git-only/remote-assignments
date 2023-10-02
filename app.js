const express = require('express');
const app = express();
app.listen(3000);
app.get('/healthcheck', (req, res) =>{
    res.send('ok')
})
app.get('/', (req, res) =>{
    res.send('first page')
})