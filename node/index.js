const express = require('express');
const app = express();
const port = 3000;
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};

const mysql = require('mysql');
const connection = mysql.createConnection(config);

connection.connect((error) => {
    if (error) throw error;
    
    const queryCreateTable = "CREATE TABLE IF NOT EXISTS people (id int NOT NULL auto_increment PRIMARY KEY, name varchar(255))"
    connection.query(queryCreateTable, (error, res) => {
        if (error) throw error;

        const queryInsert = "INSERT INTO people(name) VALUES('Junio')"
        connection.query(queryInsert);
    });    
});

app.get('/', (req, res) => {
    let text = "<h1>Full Cycle Rocks!</h1>";

    const querySelect = "SELECT * FROM people";
    connection.query(querySelect, (error, result) => {
        result.forEach(el => {
            text += `<p>${el.name}</p>`
        });
        res.send(text);
    });
});

app.listen(port, () => {
    console.log('Rodando na porta ' + port);
});