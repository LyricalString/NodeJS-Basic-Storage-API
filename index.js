const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs');

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.sendStatus(200)
});
app.get('/articles', function (req, res) {

    let rawdata = fs.readFileSync('data.json');
    let data = JSON.parse(rawdata);
    res.status(200).send(data)
})

app.post('/new-article', function (req, res) {

    let rawdata = fs.readFileSync('data.json');
    let data
    data = JSON.parse(rawdata);
    //Add a unique ID to the req.body
    req.body.id = data.length + 1;
    data.push(req.body)
    var newData = JSON.stringify(data);
    fs.writeFile('data.json', newData, err => {
        // error checking
        if (err) throw err;
        res.status(200).send("Nuevos datos añadidos.")
    });
})

app.delete('/delete-article', function (req, res) {
    //delete the item from the data given the ID
    let rawdata = fs.readFileSync('data.json');
    let data
    data = JSON.parse(rawdata);
    //delete item from the data 
    let deletedData = data.splice(req.body.id - 1, 1)
    var newData = JSON.stringify(data);
    fs.writeFile('data.json', newData, err => {
        // error checking
        if (err) throw err;
        //send the data to the client
        res.status(200).send(deletedData)
    });

})

app.listen(3000, () => {
    console.log("El servidor está inicializado en el puerto 3000");
});