import sqlite3 from "sqlite3";
import { open } from "sqlite";
import logger from "./logger.js";

export async function initializeDatabase() {
    const db = await open({
        filename: "./data.db",
        driver: sqlite3.Database,
    });

    await db.exec(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username VARCHAR(45) UNIQUE NOT NULL,
            password VARCHAR(40) NOT NULL,
            failed_attempts INT8 DEFAULT 0,
            blocked_until BOOLEAN DEFAULT FALSE
        )
    `);

    logger.info("Banco de dados inicializado com sucesso.");

    return db;
}