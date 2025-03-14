const express = require('express');
const app = express();
const port = 3000;


app.get('/', (req, res) => {
    res.redirect('/test');
});

app.get('/test', (req, res) => {
    res.json({
        message: 'Express is working Kobe Bryan ma nigga'
        });
});

app.listen(port, () => {
    console.log(`server is running at http://localhost:${port}`);
});