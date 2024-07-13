const express = require("express");
const mysql = require("mysql");
const morgan = require("morgan");
const host = 3000;
const app = express();

app.use(morgan(":method :url :response-time"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const pool = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "root",
    password: "",
    database: "receitas"
});

app.get("/api/recipes", (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            console.log("Erro ao obter conexão do pool:", err);
            res.status(500).send("Erro interno do servidor");
            return;
        }
        console.log("Conexão obtida do pool");

        connection.query("SELECT * FROM list", (err, rows) => {
            connection.release();
            if (err) {
                console.log("Erro ao executar consulta:", err);
                res.status(500).send("Erro interno do servidor");
                return;
            }
            console.log("Resultado da consulta:");
            console.log(rows);
            res.json(rows);
        });
    });
});

app.post("/api/submit_recipe", (req, res) => {
    res.set("Access-Control-Allow-Origin");
    const { title, ingredients, preparation, imageUrl } = req.body;

    console.log(req.body);
    if (!title || !ingredients || !preparation || !imageUrl) {
        console.log({
            message: "Todos os campos são obrigatórios",
            title,
            ingredients,
            preparation,
            imageUrl
        });
        return res.status(400).send({
            message: "Todos os campos são obrigatórios",
            title,
            ingredients,
            preparation,
            imageUrl
        });
    }

    pool.getConnection((err, connection) => {
        if (err) {
            console.log("Erro ao obter conexão do pool:", err);
            return res.status(500).send("Erro interno do servidor");
        }

        connection.query(
            "INSERT INTO list (title, ingredients, preparation, imageUrl) VALUES (?, ?, ?, ?)",
            [title, ingredients, preparation, imageUrl],
            (err, result) => {
                connection.release();

                if (err) {
                    console.log(
                        "Erro ao inserir receita no banco de dados:",
                        err
                    );
                    return res.status(500).send("Erro interno do servidor");
                }

                console.log("Receita inserida com sucesso:", result.insertId);
                res.status(200).send("Receita enviada com sucesso");
            }
        );
    });
});
app.use(express.static("public"));

app.get("/api/recipe", (req, res) => {
    const recipeId = req.query.id;

    console.log({ recipeId });
    pool.getConnection((err, connection) => {
        if (err) {
            console.log("Erro ao obter conexão do pool:", err);
            res.status(500).send({ message: "Erro interno do servidor", err });
            return;
        }
        console.log("Conexão obtida do pool");

        connection.query(
            "SELECT * FROM list WHERE id = ?",
            [recipeId],
            (err, rows) => {
                connection.release();
                if (err) {
                    console.log("Erro ao executar consulta:", err);
                    res.status(500).send("Erro interno do servidor");
                    return;
                }
                if (rows.length === 0) {
                    res.status(404).send("Receita não encontrada");
                    return;
                }
                console.log("Resultado da consulta:");
                console.log(rows[0]);
                res.json(rows[0]);
            }
        );
    });
});

app.listen(host, () => {
    console.log(`Servidor rodando em http://localhost:${host}/`);
});
