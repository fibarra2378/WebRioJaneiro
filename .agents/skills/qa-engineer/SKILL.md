---
name: qa-engineer
description: Agente especializado en Control de Calidad (QA Engineer) para auditar la web de Río de Janeiro, verificar enlaces, responsividad, accesibilidad WCAG, sintaxis HTML/CSS/JS y fidelidad del itinerario.
---

# QA Engineer Skill - WebRioJaneiro

Este Skill define el rol, matriz de pruebas y herramientas de automatización del **QA Engineer** asignado a la web **WebRioJaneiro**.

## Responsabilidades del QA Engineer
1. **Auditoría de Funcionalidad y UI**:
   - Probar interactividad: selector de días de itinerario, filtro de categorías, taller de caipirinha, calculadora de presupuesto y mapa interactivo Leaflet.
   - Probar reproductor de voz de síntesis de habla (SpeechSynthesis API) para la jerga carioca en portugués.
   - Verificar la conmutación de temas (Modo Claro / Modo Oscuro) y persistencia en `localStorage`.

2. **Auditoría de Responsividad y Cross-Browser**:
   - Inspeccionar la navegación en pantallas móviles (320px - 480px), tablets (768px - 1024px) y escritorios (1200px+).
   - Validar que no existan desbordamientos horizontales (`overflow-x`) ni solapamientos de texto.

3. **Auditoría de Contenido y Fidelidad al PDF**:
   - Verificar que cada día del itinerario (Día 1 a Día 5) contenga exactamente las actividades, recomendaciones gastronómicas, lugares y horarios especificados en el documento "Itinerario Enriquecido: Río de Janeiro - 4 Amigos (Agosto 2026)".
   - Validar que la base de operaciones sea **Rua Ministro Viveiros de Castro, 75 ap 901 - Copacabana, Posto 2**.

4. **Ejecución de Pruebas Automatizadas**:
   - Ejecutar el script automatizado de auditoría QA:
     ```bash
     python scripts/qa_audit.py
     ```
   - Revisar el informe generado en `tests/qa_report.md`.

## Matriz de Pruebas (Test Cases)

| ID | Módulo | Descripción del Test | Criterio de Aceptación |
|---|---|---|---|
| TC-01 | Servidor | Servidor HTTP Activo | Respuesta HTTP 200 OK en `http://localhost:8000/` |
| TC-02 | Recursos | Verificación de Imágenes | Existencia de las 8 imágenes en `assets/images/` |
| TC-03 | HTML | Validez y Accesibilidad | Presencia de etiquetas alt, semantic HTML5 y sin IDs duplicados |
| TC-04 | CSS | Sistema de Diseño | Variables CSS de colores, breakpoints responsivos y glassmorphism |
| TC-05 | JS / Datos | Fidelidad del Itinerario | Presencia de las actividades clave de los 5 días en `TRIP_DATA` |
| TC-06 | Mapa | Leaflet.js | Inicialización correcta del mapa con marcadores geolocalizados |
| TC-07 | Presupuesto | Calculadora | Cálculo exacto de gastos para 1 o 4 personas en BRL y USD |
