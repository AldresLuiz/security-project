document.getElementById("showRegisterForm").addEventListener("click", () => {
    document.getElementById("loginContainer").style.display = "none";
    document.getElementById("registerContainer").style.display = "block";
});

document.getElementById("showLoginForm").addEventListener("click", () => {
    document.getElementById("registerContainer").style.display = "none";
    document.getElementById("loginContainer").style.display = "block";
});

document.getElementById("loginForm").addEventListener("submit", async (event) => {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });

        const result = await response.json();

        if (response.ok) {
            document.getElementById("message").textContent = result.message;
            document.getElementById("message").style.color = "green";
        } else {
            document.getElementById("message").textContent = result.message;
            document.getElementById("message").style.color = "red";
        }
    } catch (error) {
        document.getElementById("message").textContent = "Erro ao conectar ao servidor.";
        document.getElementById("message").style.color = "red";
    }
});

document.getElementById("registerForm").addEventListener("submit", async (event) => {
    event.preventDefault();

    const username = document.getElementById("registerUsername").value;
    const password = document.getElementById("registerPassword").value;

    try {
        const response = await fetch("/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });

        const result = await response.json();

        if (response.ok) {
            document.getElementById("registerMessage").textContent = result.message;
            document.getElementById("registerMessage").style.color = "green";
        } else {
            document.getElementById("registerMessage").textContent = result.message;
            document.getElementById("registerMessage").style.color = "red";
        }
    } catch (error) {
        document.getElementById("registerMessage").textContent = "Erro ao conectar ao servidor.";
        document.getElementById("registerMessage").style.color = "red";
    }
});