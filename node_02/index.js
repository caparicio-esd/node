const path = require('path');
const fs = require('fs');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

/**
 * 
 */
app.use(bodyParser.json())
const pathData = path.resolve(__dirname, "") + "/messages.txt";


/**
 * utils
 */
const getData = () => {
    const data = fs.readFileSync(pathData, "utf8");
    const dataJson = JSON.parse(data);
    return dataJson;
};

const appendMessage = ({message, title}) => {
    const date = new Date();
    const dataJson = getData();
    const index = dataJson.length;

    dataJson.push({
        index,
        title,
        message,
        date
    });

    fs.writeFileSync(pathData, JSON.stringify(dataJson, null, 4));
};

/**
 * routing
 */
app.get('/', (req, res) => {
    const data = getData();
    res.json(data);
});

app.get('/:id', (req, res) => {
    const data = getData();
    const dataItem = data.find(d => d.index == req.params.id);
    res.json(dataItem);
});

app.post('/', (req, res) => {
    appendMessage(req.body);
    res.sendStatus(201)
});


/**
 * 
 */
app.listen(3001, () => {
    console.log("server listening in port 3001");
});