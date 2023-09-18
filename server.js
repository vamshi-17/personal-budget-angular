const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');

app.use('/', express.static('public'));


app.get('/hello', (req, res) => {
    res.send('Hello World!');
});

app.get('/budget', (req, res) => {
    fs.readFile('temp_data.json','utf8',(err,data) => {
        if(err) {
            console.error(err);
            return res.status(500).send('Error reading budget data');
        }
        const budget = JSON.parse(data);
        res.json(budget);
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});