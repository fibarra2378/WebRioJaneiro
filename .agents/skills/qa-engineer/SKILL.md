---
name: qa-engineer
description: Agente especializado en Control de Calidad (QA Engineer) para auditar la web de Río de Janeiro con máxima rigurosidad en estilos visuales, responsividad multiplataforma (Android, iOS, Windows, Mac), accesibilidad WCAG y fidelidad del itinerario.
---

# QA Engineer Skill - WebRioJaneiro (Auditoría Rigurosa Multiplataforma)

Este Skill define el rol, matriz de pruebas de alta rigurosidad y herramientas de automatización del **QA Engineer Agent** para la web **WebRioJaneiro**.

## Directivas de Alta Rigurosidad en Verificación de Estilos

El **QA Engineer Agent** debe validar de manera estricta que la interfaz gráfica sea impecable en 4 entornos clave:

1. **📱 Android (Samsung Galaxy / Chrome - Viewport 360px a 412px)**:
   - **Barra de Navegación Flotante (`.navbar`)**: Debe mantenerse dentro de los límites del viewport (sin desbordamiento hacia la derecha). Los enlaces en `.nav-links` deben desplazarse horizontalmente de forma suave sin mostrar barras de desplazamiento antiestéticas.
   - **Tarjetas Glassmorphism (`.glass-card`)**: Todo texto largo (direcciones, URLs) debe romperse adecuadamente (`overflow-wrap: anywhere; word-break: normal;`) sin salirse del borde del contenedor.
   - **Carrusel e Imágenes**: `.carousel-wrapper` debe ser 100% elástico y no exceder los márgenes de la pantalla.

2. **📱 iOS (iPhone / Safari Mobile - Viewport 375px a 430px)**:
   - Respetar áreas seguras (*Safe Area Insets*).
   - Renderizado limpio de efectos de desfoque de cristal (`backdrop-filter: blur()`).
   - Botones e íconos interactivos con un tamaño táctil mínimo de 44px x 44px (*Touch Targets*).

3. **💻 Windows (Chrome, Edge, Firefox - Viewport 1280px a 1920px+)**:
   - Maquetación fluida en grillas de 2, 3 y 4 columnas.
   - Preservación de la regla de centrado flotante de la barra de navegación (`transform: translateX(-50%)`).

4. **💻 Mac (Safari / Chrome Desktop)**:
   - Renderizado nítido de fuentes web (Google Fonts Inter / Outfit).
   - Transiciones de hover suaves (60 FPS) sin parpadeo (*flicker*) ni saltos de posición.

---

## Ejecución de Auditoría Automatizada Rigurosa

El agente de QA ejecuta la suite de comprobación automatizada:

```bash
python scripts/qa_audit.py
```

El script evalúa:
- **TC-01**: Integridad de Assets e Imágenes (15/15 archivos).
- **TC-02**: Auditoría Semántica, Meta Viewport y Accesibilidad HTML5/ARIA.
- **TC-03**: Auditoría de CSS Responsivo Multiplataforma (Breakpoints de Android/iOS 480px, Tablet 768px y Desktop 1024px, desbordamientos, touch targets).
- **TC-04**: Fidelidad del Itinerario PDF (4 Amigos).
- **TC-05**: Verificación de Servidor Web HTTP 200.

El reporte consolidado de calidad se genera automáticamente en `tests/qa_report.md`.
