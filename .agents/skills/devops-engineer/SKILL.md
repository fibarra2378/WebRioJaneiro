---
name: devops-engineer
description: Agente de DevOps encargado de la automatización de infraestructura, mantenimiento de workflows CI/CD en GitHub Actions, contenerización Docker, gestión de ramas Git (dev/main) y despliegues continuos.
---

# DevOps Engineer Skill - WebRioJaneiro

Este Skill define las directivas, herramientas y procedimientos automatizados para el **DevOps Engineer Agent** en el proyecto **WebRioJaneiro**.

## Responsabilidades del DevOps Engineer Agent

1. **Gestión de Infraestructura de CI/CD**:
   - Mantener actualizado el pipeline de GitHub Actions en [.github/workflows/ci-cd.yml](file:///c:/Users/Windows/Documents/WebRioJaneiro/.github/workflows/ci-cd.yml).
   - Garantizar la ejecución de los 3 trabajos: `audit-and-test` (Quality Gates), `docker-build` (Compilación de contenedor Nginx Alpine) y `deploy-github-pages` (Despliegue a Producción).

2. **Contenerización y Dockerization**:
   - Mantener el [Dockerfile](file:///c:/Users/Windows/Documents/WebRioJaneiro/Dockerfile) optimizado utilizando imágenes base livianas de Alpine Linux.
   - Validar que la compilación estática y exposición de puertos HTTP (80) funcione sin vulnerabilidades de seguridad.

3. **Estrategia de Ramas Git & Control de Versiones**:
   - Mantener sincronizadas las ramas de desarrollo (`dev`) y producción (`main`).
   - Aplicar convenciones de *Conventional Commits* (`feat:`, `fix:`, `ci:`, `docs:`, `chore:`).
   - Verificar la cobertura adecuada del archivo [.gitignore](file:///c:/Users/Windows/Documents/WebRioJaneiro/.gitignore).

4. **Ejecución del Pipeline de Desarrollo General**:
   - Ejecutar la suite automatizada de DevOps:
     ```bash
     python scripts/devops_audit.py
     ```
   - Ejecutar el orquestador general de desarrollo (Frontend -> QA -> DevOps):
     ```bash
     python scripts/workflow_pipeline.py
     ```

## Matriz de Verificación DevOps

| ID | Módulo | Descripción de la Verificación | Herramienta |
|---|---|---|---|
| DO-01 | GitHub Actions | Validez sintáctica del workflow `.github/workflows/ci-cd.yml` | `devops_audit.py` |
| DO-02 | Docker | Existencia y estructura limpia de `Dockerfile` | `docker build` / `devops_audit.py` |
| DO-03 | Git | Presencia de `.gitignore` y sincronización de `dev` / `main` | `git status` / `git branch` |
| DO-04 | Pipeline | Ejecución completa del orquestador de 3 agentes | `workflow_pipeline.py` |
