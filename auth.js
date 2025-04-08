import logger from "./logger.js";

export async function Login(username, password, res, db) {
    try {

        var user = await db.get("SELECT * FROM users WHERE username = ?", [
            username
        ]);

        if(user && user.failed_attempts >= 5){
            res.status(403).json({ message: "Usuário bloqueado após 5 tentativas falhas." });
            if(!user.blocked_until){ 
                logger.warn(`Usuário '${username}' bloqueado após 5 tentativas falhas.`)
                await db.run("UPDATE users SET blocked_until = TRUE WHERE username = ?", [
                    username
                ]);
                return
            }
            return;
        }

        user = await db.get("SELECT * FROM users WHERE username = ? AND password = ?", [
            username,
            password
        ]);

        if (user) {
            res.status(200).json({ message: "Login bem-sucedido!" });
            await db.run("UPDATE users SET failed_attempts = 0 WHERE username = ? AND password = ?", [
                username,
                password
            ]);
            logger.info(`Usuário '${username}' fez login com sucesso.`);
            return;
        }
        res.status(401).json({ message: "Credenciais inválidas." });
        await db.run("UPDATE users SET failed_attempts = failed_attempts + 1 WHERE username = ?", [
            username
        ]);
        logger.warn(`Usuário '${username}' falhou no login.`);
    } catch (error) {
        logger.error(`Erro ao fazer login: ${error}`)
        res.status(500).json({ message: "Erro interno do servidor." });
    }
}

export async function Register(username, password, res, db){
    try {
        const existingUser = await db.get("SELECT * FROM users WHERE username = ?", [username]);
        if (existingUser) {
            logger.warn(`Usuário '${username}' já existe, tentativa de registro falhou.`);
            return res.status(400).json({ message: "Usuário já existe." });
        }

        await db.run("INSERT INTO users (username, password) VALUES (?, ?)", [
            username,
            password
        ]);

        res.status(201).json({ message: "Usuário registrado com sucesso!" });
        logger.info(`Usuário '${username}' registrado com sucesso.`);
    } catch (error) {
        logger.error(`Erro ao registrar usuário: ${error}`);
        res.status(500).json({ message: "Erro interno do servidor." });
    }
}