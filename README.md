# Portafolio Virtual — Yeison Pallares

Sitio web personal para mostrar mis proyectos, mi formación y mis repositorios de GitHub. Construido con HTML, CSS y JavaScript puros, sin frameworks ni dependencias de build.

## Estructura del proyecto

```
portafolio-yeison/
├── index.html   → contenido y estructura del sitio
├── style.css    → estilos, paleta de colores y modo oscuro
├── script.js    → interactividad (tema, menú, scroll, GitHub)
└── README.md
```

## Qué se implementó

### Diseño y layout
- Barra lateral fija con foto/avatar, nombre, rol, ubicación y navegación por secciones.
- Contenido principal a la derecha, dividido en secciones: Inicio, Sobre mí, Formación, Proyectos, GitHub y Contacto.
- Proyectos presentados como entradas numeradas en orden cronológico, con su fecha, descripción y tecnologías usadas.
- Paleta de colores cálida (tonos cobre y ámbar sobre fondo crema/marrón), con tipografías Fraunces, Work Sans y JetBrains Mono.
- Diseño totalmente responsive: en pantallas pequeñas la barra lateral se convierte en un menú deslizable activado con un botón hamburguesa.

### Modo oscuro
- Botón para alternar entre modo claro y oscuro desde la barra lateral.
- La preferencia elegida se guarda en el navegador (`localStorage`), así que se mantiene al volver a entrar.
- Si no hay preferencia guardada, el sitio detecta automáticamente si el sistema operativo usa modo oscuro.

### Navegación
- Scroll suave al hacer clic en los enlaces del menú.
- La sección visible en pantalla se resalta automáticamente en el menú mientras se hace scroll (usando `IntersectionObserver`).
- El menú móvil se cierra solo al seleccionar una sección.

### Repositorios de GitHub en vivo
- La sección "GitHub" consulta la API pública de GitHub (`api.github.com/users/ypd651/repos`) y muestra los 6 repositorios más recientes con su nombre, descripción, lenguaje principal y estrellas.
- Como se actualiza en cada carga del sitio, cualquier proyecto nuevo que subas a GitHub aparece automáticamente aquí, sin tener que editar el código del portafolio.
- Si la consulta falla (por ejemplo, sin conexión), se muestra un mensaje alternativo con un enlace directo al perfil de GitHub.

### Accesibilidad
- Estados de foco visibles para navegación por teclado.
- Etiquetas `aria-label` y `aria-expanded` en los botones de tema y menú móvil.
- Animaciones reducidas automáticamente si el usuario tiene activada la preferencia `prefers-reduced-motion`.

## Cómo verlo localmente

Solo abre `index.html` en el navegador. No requiere instalación ni servidor.

## Cómo publicarlo (GitHub Pages)

1. Sube esta carpeta a un repositorio de tu GitHub (por ejemplo, `portafolio`).
2. Entra a **Settings → Pages** del repositorio.
3. En "Source", selecciona la rama `main` y la carpeta `/root`.
4. Guarda: tu sitio quedará publicado en `https://ypd651.github.io/portafolio`.

## Pendientes / ideas para después

- Reemplazar el avatar con iniciales por una foto real.
- Añadir enlaces a LinkedIn u otras redes cuando estén disponibles.
- Sumar nuevos proyectos a la sección "Proyectos" a medida que se completen.
