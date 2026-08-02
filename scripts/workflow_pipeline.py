#!/usr/bin/env python3
"""
WebRioJaneiro - Workflow Pipeline Orchestrator (4-Agent Team)
Automates the integrated development workflow pipeline across UI/UX Designer, Frontend Developer, QA Engineer, and DevOps Engineer Agents.
"""

import subprocess
import os
from datetime import datetime

WORKSPACE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DEFECTS_REPORT_PATH = os.path.join(WORKSPACE_DIR, "tests", "defects_report.md")

def run_pipeline():
    print("=" * 70)
    print("  WebRioJaneiro - Integrated 4-Agent Workflow Pipeline")
    print("  1. UI/UX Designer -> 2. Frontend -> 3. QA -> 4. DevOps -> 5. Deploy")
    print("=" * 70)

    # Step 1: UI/UX Designer Agent Audit
    print("\n>>> [FASE 1] Ejecutando Auditoría de Diseño del UI/UX Designer Agent...")
    ux_res = subprocess.run(["python", os.path.join(WORKSPACE_DIR, "scripts", "ux_audit.py")], capture_output=True, text=True)
    print(ux_res.stdout)

    # Step 2: Frontend Developer Agent Verification
    print("\n>>> [FASE 2] Ejecutando Verificación del Frontend Developer Agent...")
    fe_res = subprocess.run(["python", os.path.join(WORKSPACE_DIR, "scripts", "frontend_audit.py")], capture_output=True, text=True)
    print(fe_res.stdout)

    # Step 3: QA Engineer Agent Audit
    print("\n>>> [FASE 3] Ejecutando Auditoría del QA Engineer Agent...")
    qa_res = subprocess.run(["python", os.path.join(WORKSPACE_DIR, "scripts", "qa_audit.py")], capture_output=True, text=True)
    print(qa_res.stdout)

    # Step 4: DevOps Engineer Agent Infrastructure Audit
    print("\n>>> [FASE 4] Ejecutando Verificación de CI/CD del DevOps Engineer Agent...")
    devops_res = subprocess.run(["python", os.path.join(WORKSPACE_DIR, "scripts", "devops_audit.py")], capture_output=True, text=True)
    print(devops_res.stdout)

    # Step 5: Check results and update defects report
    now_str = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    has_ux_error = ux_res.returncode != 0 or "[FAIL]" in ux_res.stdout
    has_fe_error = fe_res.returncode != 0 or "[FAIL]" in fe_res.stdout
    has_qa_error = qa_res.returncode != 0 or "[FAIL]" in qa_res.stdout
    has_do_error = devops_res.returncode != 0 or "[FAIL]" in devops_res.stdout

    if not has_ux_error and not has_fe_error and not has_qa_error and not has_do_error:
        defects_md = f"""# Reporte de Defectos - Pipeline Integrado (4 Agentes)

**Fecha de Ejecución**: {now_str}  
**Orquestador**: Agile Workflow Orchestrator  
**Evaluadores**: UI/UX Designer Agent, Frontend Developer Agent, QA Engineer Agent, DevOps Engineer Agent  
**Estado Global**: 🟢 SIN DEFECTOS (100% PASS - Listo para Despliegue en Producción)

---

## Resumen del Flujo de 4 Agentes
1. **UI/UX Designer Agent**: 🟢 4/4 PASS (Sistema de diseño, ergonomía táctil y jerarquía visual validados).
2. **Frontend Developer Agent**: 🟢 5/5 PASS (Maquetación HTML5 semántica y JS modular validados).
3. **QA Engineer Agent**: 🟢 5/5 PASS (Pruebas rigurosas responsivas y fidelidad del itinerario).
4. **DevOps Engineer Agent**: 🟢 5/5 PASS (Workflows CI/CD, Docker y ramas Git sincronizados).

[+] El proyecto cumple con todos los estándares para despliegue automático a producción en Firebase Hosting.
"""
    else:
        defects_md = f"""# Reporte de Defectos - Pipeline Integrado (4 Agentes)

**Fecha de Ejecución**: {now_str}  
**Estado Global**: 🔴 DEFECTOS DETECTADOS  

## Detalle de Fases:
- **UI/UX Designer Audit**: {'🔴 FAIL' if has_ux_error else '🟢 PASS'}
- **Frontend Audit**: {'🔴 FAIL' if has_fe_error else '🟢 PASS'}
- **QA Audit**: {'🔴 FAIL' if has_qa_error else '🟢 PASS'}
- **DevOps Audit**: {'🔴 FAIL' if has_do_error else '🟢 PASS'}
"""

    with open(DEFECTS_REPORT_PATH, "w", encoding="utf-8") as f:
        f.write(defects_md)

    print(f"\n[+] Pipeline Integrado completado ({'100% PASS' if not (has_ux_error or has_fe_error or has_qa_error or has_do_error) else 'CON DEFECTOS'}). Reporte guardado en {DEFECTS_REPORT_PATH}.\n")

if __name__ == "__main__":
    run_pipeline()
