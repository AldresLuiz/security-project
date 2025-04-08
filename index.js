import express from "express";
import path from "path";
import { Login , Register} from "./auth.js";
import { fileURLToPath } from "url";
import { initializeDatabase } from "./database.js";
import logger from "./logger.js";

const app = express();
const port = 8080;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "www")));
app.use(express.json());

let db;
initializeDatabase().then((database) => {
    db = database;
});

app.post("/login", (req, res) => {
    const { username, password } = req.body;
    Login(username, password, res, db);
});

app.post("/register", async (req, res) => {
    const { username, password } = req.body;
    Register(username, password, res, db)
});

app.listen(port, () => {
    logger.info(`Servidor rodando em: http://localhost:${port}`);
});