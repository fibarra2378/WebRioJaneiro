---
name: interactive-components
description: Skill enfocado en la construcción e integración de componentes UI interactivos avanzados: ventanas modales, itinerarios en pestañas, buscadores con filtro, calculadoras y mapas Leaflet.
---

# Interactive Components Skill

Este Skill define las pautas para construir los **Componentes UI Interáctivos** de la plataforma web.

## Componentes Clave

1. **Navegador de Itinerario en Pestañas (Day Explorer)**:
   - Permite conmutar instantáneamente entre los 5 días del itinerario oficial sin recargar la página.
   - Despliega cronogramas hora por hora, alternativas de fútbol/playas y menús recomendados.

2. **Ventana Modal de Detalle (Modal Dialog)**:
   - Fondo con desenfoque dinámico (`backdrop-filter: blur(12px)`).
   - Inyección limpia de contenido HTML para consejos del carioca, recomendaciones de seguridad y horarios.
   - Cierre interactivo mediante botón de cierre, clic en el fondo o tecla `Escape`.

3. **Laboratorio de Caipirinha y Calculadora de Presupuesto**:
   - Maceración y combinación interactiva de licores, frutas y endulzantes.
   - Calculadora dinámica que convierte presupuesto estimado entre Reales (R$) y Dólares (USD) para 1 o 4 amigos.

4. **Integración con Leaflet.js**:
   - Inicialización de mapa centrado en Copacabana (`[-22.9644, -43.1762]`).
   - Renderizado de 14 marcadores geolocalizados con ventanas emergentes (popups) de información contextual.
