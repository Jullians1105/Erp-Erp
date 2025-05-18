console.log("🔥 login_form.js cargado correctamente");

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formLogin");

  if (!form) {
    console.warn("⚠️ No se encontró el formulario con ID 'formLogin'");
    return;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const correo = document.getElementById("correo").value.trim();
    const password = document.getElementById("password").value.trim();
    const respuesta = document.getElementById("respuesta");

    const formData = new FormData();
    formData.append("correo", correo);
    formData.append("password", password);

    fetch('validar_login.php', {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        if (!res.ok) throw new Error(`❌ Error HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        console.log("✅ Respuesta del servidor:", data);

        if (data.error) {
          respuesta.style.color = "red";
          respuesta.innerText = data.error;
        } else {
          respuesta.style.color = "green";
          respuesta.innerText = "Inicio de sesión exitoso";

          localStorage.setItem("nombreUsuario", data.nombre);
          localStorage.setItem("correoUsuario", data.correo);

          // ✅ Obtener página anterior (o usar hombre.html como fallback)
          const volverA = localStorage.getItem("paginaAnterior") || "../generos/parte_hombre/hombre.html";
          localStorage.removeItem("paginaAnterior"); // opcional: limpiar

          setTimeout(() => {
          const volverA = localStorage.getItem("paginaAnterior") || "../generos/parte_hombre/hombre.html";
          localStorage.removeItem("paginaAnterior");
          console.log(`➡️ Redirigiendo a: ${volverA}`);
          window.location.href = volverA;
        }, 2000);

        }
      })
      .catch((err) => {
        console.error("❌ Error al conectar con el servidor:", err.message);
        respuesta.style.color = "red";
        respuesta.innerText = "Error en la conexión.";
      });
  });
});
