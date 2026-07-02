# 🎮 Portafolio Digital

Este proyecto corresponde a mi portafolio personal como desarrollador. Fue diseñado con una temática inspirada en los videojuegos retro y el estilo cyberpunk, con el objetivo de presentar mis proyectos, habilidades y perfil de una forma visual e interactiva.

---

# 📌 Características principales

* Diseño responsive para diferentes dispositivos.
* Interfaz con temática gamer y efectos visuales.
* Consumo de la API pública de GitHub.
* Visualización automática de repositorios.
* Estadísticas de GitHub.
* Modal para consultar información de cada proyecto.
* Galería interactiva de videojuegos favoritos.
* Animaciones y efectos con CSS.

---

# 📂 Estructura del proyecto

```text
PORTAFOLIO-DIGITAL/
│
├── index.html      # Estructura principal del sitio
├── styles.css      # Estilos, animaciones y diseño visual
├── scripy.js       # Funcionalidad e interacción de la página
└── README.md       # Documentación del proyecto
```

---

# 📄 index.html

Es el archivo principal del proyecto.

Contiene toda la estructura del portafolio, incluyendo:

* Página de inicio (Hero).
* Barra lateral de navegación.
* Sección de proyectos.
* Estadísticas de GitHub.
* Galería de videojuegos.
* Ventanas modales.
* Información de contacto.

Desde este archivo se enlazan los estilos y el archivo JavaScript.

---

# 🎨 styles.css

Este archivo controla toda la apariencia del sitio.

Aquí se encuentran:

* Colores de la interfaz.
* Tipografías.
* Diseño responsive.
* Animaciones.
* Efectos de iluminación.
* Tarjetas de proyectos.
* Botones.
* Modales.
* Barra lateral.

Su función principal es hacer que el portafolio tenga una apariencia moderna con una estética gamer.

---

# ⚙️ scripy.js

Este archivo contiene toda la lógica del proyecto.

Entre sus funciones principales se encuentran:

## Obtención de repositorios

Consume la API de GitHub para obtener automáticamente:

* Repositorios.
* Lenguaje utilizado.
* Estrellas.
* Forks.
* Fecha de actualización.

---

## Estadísticas

Calcula información como:

* Número de repositorios.
* Seguidores.
* Total de estrellas.
* Lenguajes utilizados.

---

## Proyectos

Genera dinámicamente las tarjetas de cada repositorio utilizando la información obtenida desde GitHub.

También permite filtrar proyectos según el lenguaje de programación.

---

## Ventanas modales

Cuando el usuario selecciona un proyecto se abre una ventana donde puede visualizar:

* Nombre.
* Descripción.
* Lenguaje.
* Estadísticas.
* README del repositorio.
* Enlace directo a GitHub.

---

## Galería

Genera automáticamente una galería con videojuegos favoritos utilizando un arreglo de datos.

Cada tarjeta puede abrir una ventana con información adicional.

---

# 🌐 API utilizada

El proyecto utiliza la API pública de GitHub para obtener información del perfil.

Información consultada:

* Perfil del usuario.
* Repositorios públicos.
* README de cada repositorio.
* Estadísticas de los proyectos.

---

# 🛠️ Tecnologías utilizadas

* HTML5
* CSS3
* JavaScript (Vanilla)
* GitHub REST API

---

# 🚀 Cómo ejecutar el proyecto

1. Clonar el repositorio.

```bash
git clone <URL_DEL_REPOSITORIO>
```

2. Abrir la carpeta del proyecto.

3. Ejecutar el archivo **index.html** en un navegador.

No es necesario instalar dependencias ni utilizar un servidor adicional.

---

# 🎯 Objetivo del proyecto

Este portafolio busca presentar de manera organizada mis habilidades, proyectos y experiencia como desarrollador, mostrando información actualizada directamente desde GitHub y ofreciendo una experiencia visual atractiva para quienes visiten el sitio.
