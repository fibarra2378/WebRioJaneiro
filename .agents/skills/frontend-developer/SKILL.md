---
name: frontend-developer
description: Agente de desarrollo Front End experto en arquitectura Web UI Mobile-First, HTML5 semántico, JavaScript ES6+ modular, integración de componentes interactivos y diseño adaptativo.
---

# Frontend Developer Skill - WebRioJaneiro (Estrategia Mobile-First)

Este Skill establece los estándares de arquitectura, guías de codificación y flujo de trabajo para el **Frontend Developer Agent** en la aplicación web **WebRioJaneiro**.

## Principios de Arquitectura Front End

1. **Estrategia Obligatoria Mobile-First**:
   - Todo componente UI, barra de navegación, tarjeta o sección se maqueta e implementa primeramente para dispositivos móviles (Android / iOS con viewports de 360px a 430px).
   - Adaptación progresiva mediante *Media Queries* para pantallas de escritorio (`@media (min-width: 851px)`).
   - Uso de `min-width: 0`, `box-sizing: border-box` y `overflow-wrap: anywhere` en todos los contenedores flexibles para prevenir cualquier desbordamiento o truncamiento de texto.

2. **Clean Code & Modularidad Vanilla ES6+**:
   - Separación estricta de responsabilidades entre vista (`index.html`), estilos (`css/styles.css`), datos de aplicación (`js/data.js`) y controlador interactivo (`js/app.js`).
   - Evitar contaminación del scope global encapsulando la lógica en controladores de módulo y delegación de eventos.

3. **Diseño Visual de Alto Impacto (Glassmorphism UI)**:
   - Implementar superficies traslúcidas con `backdrop-filter: blur()`, bordes sutiles con transparencia `rgba()` y sombras proyectadas suaves.
   - Conmutador dinámico entre Modo Oscuro (`data-theme="dark"`) y Modo Claro (`data-theme="light"`) con almacenamiento persistente en `localStorage`.

4. **Interacciones Fluidas & Micro-animaciones**:
   - Efectos de respuesta táctil y visual al pasar el cursor o pulsar (`:hover`, `:active`, `:focus-visible`).
   - Transiciones aceleradas por hardware (`transform`, `opacity`) a 60 FPS.

5. **Persistencia y Datos Dinámicos**:
   - Gestión de estado cliente con `localStorage`.
   - Integración con Leaflet.js para mapas geolocalizados y SpeechSynthesis API para audio en portugués.

## Workflow de Desarrollo Front End
1. **Estructura HTML5 Semántica Mobile-First**:
   - Uso obligatorio de etiquetas `<nav>`, `<header>`, `<main>`, `<section>`, `<article>`, `<footer>` con jerarquía de títulos válida.
2. **Sistema de Diseño (CSS Tokens & Mobile Overrides)**:
   - Mantener variables globales en `:root` y reglas móviles por defecto.
3. **Auditoría de Desarrollo**:
   - Ejecutar la verificación de código:
     ```bash
     python scripts/frontend_audit.py
     ```
