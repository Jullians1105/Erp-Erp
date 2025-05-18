document.addEventListener("DOMContentLoaded", () => {
  const contenedorNombre = document.getElementById("usuarioNombre");
  const nombreUsuario = localStorage.getItem("nombreUsuario");

  if (!contenedorNombre) return;

  contenedorNombre.style.cursor = "pointer";

  if (nombreUsuario) {
    const primerNombre = nombreUsuario.split(' ')[0];
    contenedorNombre.innerHTML = `<i class="fa-solid fa-user"></i> ${primerNombre}`;
    contenedorNombre.title = "Ver perfil";

    contenedorNombre.addEventListener("click", () => {
      localStorage.setItem("paginaAnterior", window.location.href);
      window.location.href = "../../editar_perfil/editar_perfil.html";
    });

  } else {
    contenedorNombre.innerHTML = `<i class="fa-solid fa-user"></i> Iniciar Sesión`;
    contenedorNombre.title = "Iniciar sesión";

    contenedorNombre.addEventListener("click", () => {
      localStorage.setItem("paginaAnterior", window.location.href);
      window.location.href = "../../login_pagina/login.html";
    });
  }
});
