---
name: web-performance-a11y
description: Skill especializado en optimización de rendimiento Web (60 FPS, TTI veloz) y accesibilidad universal WCAG AA.
---

# Web Performance & Accessibility (A11y) Skill

Este Skill garantiza que toda solución construida por el **Frontend Developer Agent** sea de alto rendimiento y accesible para todos los usuarios.

## Directivas de Rendimiento
1. **Minimización de Reflows y Repaints**:
   - Agrupar modificaciones al DOM utilizando fragmentos o cadenas de plantilla HTML antes de inyectar.
   - Utilizar propiedades animables por GPU (`transform`, `opacity`) en lugar de recalcular dimensiones (`width`, `height`, `top`, `left`).

2. **Carga Eficiente de Assets**:
   - Imágenes optimizadas en formato PNG/WebP con dimensiones adaptadas.
   - Scripts JavaScript cargados con `defer` o al final del documento para no bloquear el renderizado inicial.

## Directivas de Accesibilidad (WCAG AA)
1. **Semántica y Roles ARIA**:
   - Todos los botones e insumos interactivos deben contar con etiquetas descriptivas (`aria-label`, `title`).
   - Uso de nombres descriptivos en atributos `alt` de todas las imágenes.

2. **Navegación por Teclado**:
   - Todos los componentes (modales, selector de días, conmutador de tema) deben ser totalmente navegables mediante la tecla `Tab` y activables con `Enter` o `Space`.
   - Indicador visual claro en `:focus-visible`.

3. **Síntesis de Voz Web (Web Speech API)**:
   - Uso accesible de la API nativa de audio para reproducir la jerga carioca en portugués brasileño (`pt-BR`).
