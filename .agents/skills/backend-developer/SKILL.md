---
name: backend-developer
description: Agente de desarrollo Backend experto en arquitectura de APIs RESTful, integración de servicios externos (Open-Meteo, Firebase, Leaflet), validación de endpoints, seguridad de datos, lógica de negocio server-side/serverless y optimización de peticiones de red.
---

# Backend Developer Skill - WebRioJaneiro

Este Skill establece los estándares de arquitectura, guías de codificación y flujo de trabajo para el **Backend Developer Agent** en la aplicación web **WebRioJaneiro**.

## Principios de Arquitectura Backend

1. **Diseño de APIs & Integración de Servicios Externos**:
   - Todas las integraciones con APIs externas (Open-Meteo, Firebase Hosting, Leaflet Tiles) deben implementar manejo robusto de errores con `try/catch`, reintentos exponenciales y estados de carga/fallback visibles.
   - Los endpoints consumidos deben documentarse con su URL base, parámetros requeridos y formato de respuesta esperado (JSON Schema).
   - Respetar estrictamente las políticas CORS y no exponer claves API sensibles en el código del cliente.

2. **Seguridad por Diseño (OWASP Compliance)**:
   - Aplicar sanitización de inputs en toda interacción usuario-servidor.
   - Todos los enlaces externos deben incluir `rel="noopener noreferrer"` y `target="_blank"`.
   - Validar que las URLs de APIs externas utilicen HTTPS exclusivamente.
   - Prevenir inyección de HTML/XSS sanitizando contenido dinámico antes de inserción en el DOM (`textContent` sobre `innerHTML` para datos de usuario).

3. **Arquitectura de Datos & Estado**:
   - Separación estricta entre la capa de datos (`js/data.js`) y la capa de presentación/controlador (`js/app.js`).
   - Persistencia de estado del cliente mediante `localStorage` con claves versionadas (ej: `rio_packing_checklist_v1`) para evitar colisiones y permitir migraciones futuras.
   - Toda estructura de datos debe estar tipada implícitamente y documentada en el archivo de datos correspondiente.

4. **Optimización de Red & Rendimiento**:
   - Implementar estrategias de caché del lado del cliente para respuestas de APIs externas (ej: clima de Open-Meteo) con TTL configurable.
   - Minimizar peticiones HTTP redundantes agrupando llamadas y utilizando `Promise.all()` cuando sea posible.
   - Aplicar lazy loading (`loading="lazy"`) para recursos pesados y priorizar recursos críticos con `loading="eager"`.

5. **Firebase & Despliegue Serverless**:
   - Mantener la configuración de Firebase Hosting en `firebase.json` con headers de seguridad adecuados (`Cache-Control`, `X-Content-Type-Options`, `X-Frame-Options`).
   - Validar que `.firebaserc` apunte al proyecto correcto (`web-rio-janeiro`).
   - Los servicios de Firebase (Hosting, Functions si aplica) deben configurarse para producción sin exponer configuraciones de desarrollo.

6. **Logging, Monitoreo & Observabilidad**:
   - Implementar logging estructurado en consola para depuración (`console.info`, `console.warn`, `console.error`) con prefijos de módulo.
   - Capturar y reportar errores de API de forma elegante mostrando estados de fallback al usuario en lugar de pantallas rotas.

## Registro de APIs Integradas

| API | Base URL | Parámetros Clave | Uso |
|---|---|---|---|
| Open-Meteo Weather | `https://api.open-meteo.com/v1/forecast` | `latitude`, `longitude`, `current_weather`, `daily`, `timezone` | Widget de clima dinámico y pronóstico de 10 días |
| Leaflet Tile Server | `https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png` | Coordenadas del mapa | Mapa interactivo del itinerario |
| Firebase Hosting | `https://web-rio-janeiro.web.app` | N/A (hosting estático) | Despliegue de producción |

## Workflow de Desarrollo Backend

1. **Validación de Integraciones**:
   - Verificar que todas las APIs externas respondan correctamente (HTTP 200).
   - Confirmar que los esquemas de datos (`js/data.js`) sean consistentes con la presentación (`index.html`).
2. **Seguridad de Enlaces Externos**:
   - Auditar que todos los `<a>` con `target="_blank"` incluyan `rel="noopener noreferrer"`.
3. **Integridad de Configuración Firebase**:
   - Verificar `firebase.json` y `.firebaserc` con la configuración correcta del proyecto.
4. **Auditoría de Backend**:
   - Ejecutar la verificación automatizada:
     ```bash
     python scripts/backend_audit.py
     ```

## Matriz de Verificación Backend

| ID | Módulo | Descripción de la Verificación | Herramienta |
|---|---|---|---|
| BE-01 | APIs Externas | Validez de URLs HTTPS y esquemas de integración | `backend_audit.py` |
| BE-02 | Seguridad | Atributos `noopener noreferrer` en enlaces externos | `backend_audit.py` |
| BE-03 | Firebase Config | Integridad de `firebase.json` y `.firebaserc` | `backend_audit.py` |
| BE-04 | Datos & Estado | Consistencia de esquemas de datos en `js/data.js` | `backend_audit.py` |
| BE-05 | Rendimiento Red | Cache busters, lazy loading y headers de caché | `backend_audit.py` |
