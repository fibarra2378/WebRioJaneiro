---
name: ui-design-system
description: Skill especializado en la creación de sistemas de diseño visual, tokens CSS, Glassmorphism, temas claro/oscuro, grillas responsivas y micro-animaciones.
---

# UI Design System Skill

Este Skill rige la creación y mantenimiento del **Sistema de Diseño Visual** de la aplicación **WebRioJaneiro**.

## Especificaciones del Sistema de Diseño

### 1. Paleta de Colores y Tokens CSS
```css
:root {
  --bg-primary: #0b132b;
  --bg-secondary: #1c2541;
  --bg-card: rgba(30, 41, 59, 0.7);
  --glass-border: rgba(255, 255, 255, 0.12);
  --glass-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
  
  --text-main: #f8fafc;
  --text-muted: #94a3b8;
  
  --accent-gold: #f59e0b;
  --accent-teal: #06b6d4;
  --accent-emerald: #10b981;
  --accent-crimson: #ef4444;
  --accent-purple: #8b5cf6;
}
```

### 2. Principios de Glassmorphism
- Uso de `backdrop-filter: blur(16px)` para lograr transparencia de cristal.
- Bordes finos de 1px con opacidad reducida (`rgba(255, 255, 255, 0.12)`).
- Elevación de tarjeta al pasar el cursor mediante `transform: translateY(-4px)` y resplandor de sombra cyan (`rgba(6, 182, 212, 0.15)`).

### 3. Layout Responsivo
- Grillas adaptativas fluidas: `grid-template-columns: repeat(auto-fill, minmax(340px, 1fr))`.
- Breakpoints fluidos para adaptarse desde teléfonos móviles de 320px hasta monitores 4K.
