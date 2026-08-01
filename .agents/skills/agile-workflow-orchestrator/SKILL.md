---
name: agile-workflow-orchestrator
description: Skill de orquestación del flujo de trabajo estándar entre el Frontend Developer Agent y el QA Engineer Agent para ciclo de cambios, desarrollo, auditoría y resolución de defectos.
---

# Agile Workflow Orchestrator Skill

Este Skill rige la secuencia estandarizada de trabajo entre los agentes del proyecto para cualquier solicitud de cambio, desarrollo de nueva funcionalidad o refactorización.

## Protocolo Paso a Paso del Workflow

### 1. Entrada de Cambio (Change Request)
Cualquier solicitud de modificación inicia un ciclo formal de trabajo:
- **Analista / Orquestador**: Documenta el objetivo y alcance en la UI o lógica.

### 2. Fase de Desarrollo (Frontend Developer Agent)
- **Acción**: Aplica los cambios necesarios en `index.html`, `css/styles.css`, `js/data.js` o `js/app.js`.
- **Verificación Interna**:
  ```bash
  python scripts/frontend_audit.py
  ```
- **Entregable**: Código listo para revisión de QA.

### 3. Fase de Pruebas y Auditoría (QA Engineer Agent)
- **Acción**: Realiza pruebas integrales y ejecuta la suite automatizada:
  ```bash
  python scripts/qa_audit.py
  ```
- **Evaluación**:
  - Si pasa todas las pruebas (100% PASS): Emite `tests/qa_report.md` de aprobación final.
  - Si detecta errores: Genera `tests/defects_report.md` detallando ID, severidad, síntoma y archivo afectado.

### 4. Ciclo de Resolución de Defectos (Defect Fix Loop)
- **Frontend Developer Agent**: Inspecciona `tests/defects_report.md`, soluciona la falla y re-ejecuta `frontend_audit.py`.
- **QA Engineer Agent**: Re-audita con `qa_audit.py` y confirma el cierre del reporte de defectos.

## Plantilla del Reporte de Defectos (`tests/defects_report.md`)

```markdown
# Reporte de Defectos Detectados - QA Audit

**Fecha**: YYYY-MM-DD  
**Reportado Por**: QA Engineer Agent  
**Estado**: 🔴 PENDIENTE DE CORRECCIÓN / 🟢 RESUELTO  

| Defecto ID | Severidad | Componente | Descripción del Fallo | Solución Propuesta |
|---|---|---|---|---|
| DEF-01 | CRITICAL / MAJOR / MINOR | Archivo / Módulo | Descripción clara del comportamiento erróneo | Acción requerida por el Frontend Developer |
```
