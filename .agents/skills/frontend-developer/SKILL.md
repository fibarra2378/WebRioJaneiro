---
name: frontend-developer
description: Agente de desarrollo Front End experto en arquitectura Web UI, HTML5 semántico, JavaScript ES6+ modular, integración de componentes interactivos y diseño adaptativo.
---

# Frontend Developer Skill - WebRioJaneiro

Este Skill establece los estándares de arquitectura, guías de codificación y flujo de trabajo para el **Frontend Developer Agent** en la aplicación web **WebRioJaneiro**.

## Principios de Arquitectura Front End
1. **Clean Code & Modularidad Vanilla ES6+**:
   - Separación estricta de responsabilidades entre vista (`index.html`), estilos (`css/styles.css`), datos de aplicación (`js/data.js`) y controlador interactivo (`js/app.js`).
   - Evitar contaminación del scope global encapsulando la lógica en controladores de módulo y delegación de eventos.

2. **Diseño Visual de Alto Impacto (Glassmorphism UI)**:
   - Implementar superficies traslúcidas con `backdrop-filter: blur()`, bordes sutiles con transparencia `rgba()` y sombras proyectadas suaves.
   - Proveer conmutador dinámico entre Modo Oscuro (`data-theme="dark"`) y Modo Claro (`data-theme="light"`) con almacenamiento persistente en `localStorage`.

3. **Interacciones Fluidas & Micro-animaciones**:
   - Efectos de respuesta táctil y visual al pasar el cursor (`:hover`, `:focus-visible`, `:active`).
   - Transiciones aceleradas por hardware (`transform: translateY()`, `opacity`) para un rendimiento de 60 FPS en el renderizado del hilo principal.

4. **Persistencia y Datos Dinámicos**:
   - Gestión de estado cliente con `localStorage` para guardar atracciones favoritas y preferencias de tema.
   - Integración fluida con librerías externas (Leaflet.js para mapas) y APIs web nativas (`SpeechSynthesis` para voz en Portugués).

## Workflow de Desarrollo Front End
1. **Estructura HTML5 Semántica**:
   - Uso obligatorio de etiquetas `<nav>`, `<header>`, `<main>`, `<section>`, `<article>`, `<footer>` y encabezados ordenados jerárquicamente (`<h1>` único, `<h2>`, `<h3>`).
2. **Definición del Sistema de Diseño (CSS Tokens)**:
   - Mantener todas las variables en `:root` (`--bg-primary`, `--accent-teal`, `--font-main`, `--radius-md`).
3. **Controlador y Delegación de Eventos (JS)**:
   - Utilizar delegación de eventos (`document.addEventListener('click')`) para listas dinámicas (tarjetas, botones de modal, reproducción de voz).
