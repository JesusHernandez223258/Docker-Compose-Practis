const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");
const signInForm = document.querySelector(".sign-in-form");
const signUpForm = document.querySelector(".sign-up-form");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});

// URL de la API - será reemplazada por la variable de entorno en el entrypoint.sh
const API_URL = "http://localhost:5000";

// Manejar el envío del formulario de login
signInForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = signInForm.querySelector('input[type="text"]').value;
  const password = signInForm.querySelector('input[type="password"]').value;

  try {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
      // Guardar el token en localStorage
      localStorage.setItem("token", data.token);
      alert("¡Inicio de sesión exitoso!");
      // Redirigir a la página principal o dashboard
      // window.location.href = 'dashboard.html';
    } else {
      alert(data.msg || "Error al iniciar sesión");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Error de conexión");
  }
});

// Manejar el envío del formulario de registro
signUpForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = signUpForm.querySelector('input[type="text"]').value;
  const email = signUpForm.querySelector('input[type="email"]').value;
  const password = signUpForm.querySelector('input[type="password"]').value;

  try {
    const response = await fetch(`${API_URL}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      // Guardar el token en localStorage
      localStorage.setItem("token", data.token);
      alert("¡Registro exitoso!");
      // Redirigir o mostrar mensaje
      container.classList.remove("sign-up-mode");
    } else {
      alert(data.msg || "Error al registrarse");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Error de conexión");
  }
});

// Función para verificar si la API está disponible
async function checkApiStatus() {
  try {
    const response = await fetch(`${API_URL}/api/test`);
    const data = await response.json();
    console.log("Estado de la API:", data.msg);
  } catch (error) {
    console.error("API no disponible:", error);
  }
}

// Verificar estado de la API al cargar la página
document.addEventListener("DOMContentLoaded", checkApiStatus);
