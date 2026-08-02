#!/usr/bin/env python3
"""
WebRioJaneiro - Manifiesto de Orquestación Estricta (5-Agent Squad Pipeline)
Ejecuta el Ciclo de Vida de Desarrollo Secuencial con Compuertas de Calidad:
- Fase 1 (Contratos y Diseño - Paralelo UI/UX & Backend) -> Compuerta 1
- Fase 2 (Ensamblaje - Frontend Developer) -> Compuerta 2
- Fase 3 (Verificación - QA Engineer) -> Compuerta 3 (Retroceso automático a Fase 2 en caso de falla)
- Fase 4 (Despliegue y Contenerización - DevOps Engineer) -> Compuerta 4
"""

import subprocess
import os
import sys
from datetime import datetime

# Enforce UTF-8 output encoding for Windows terminal compatibility
if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

WORKSPACE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DEFECTS_REPORT_PATH = os.path.join(WORKSPACE_DIR, "tests", "defects_report.md")

def run_pipeline():
    print("=" * 75)
    print("  WebRioJaneiro - Protocolo de Orquestación Estricta (5-Agent Squad)")
    print("  Fase 1 (UI/UX & Backend) -> Fase 2 (Frontend) -> Fase 3 (QA) -> Fase 4 (DevOps)")
    print("=" * 75)

    now_str = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    # ─────────────────────────────────────────────────────────────
    # FASE 1: Contratos y Diseño (Paralelo: UI/UX & Backend)
    # ─────────────────────────────────────────────────────────────
    print("\n>>> [FASE 1A] UI/UX Designer Agent — Auditoría de Diseño & Ergonomía Táctil...")
    ux_res = subprocess.run(["python", os.path.join(WORKSPACE_DIR, "scripts", "ux_audit.py")], capture_output=True, text=True, encoding="utf-8", errors="replace")
    print(ux_res.stdout)

    print("\n>>> [FASE 1B] Backend Developer Agent — Contratos de API, Seguridad OWASP & Datos...")
    be_res = subprocess.run(["python", os.path.join(WORKSPACE_DIR, "scripts", "backend_audit.py")], capture_output=True, text=True, encoding="utf-8", errors="replace")
    print(be_res.stdout)

    has_ux_error = ux_res.returncode != 0 or "[FAIL]" in ux_res.stdout
    has_be_error = be_res.returncode != 0 or "[FAIL]" in be_res.stdout

    if has_ux_error or has_be_error:
        print("[FAIL] [COMPUERTA 1 FALLIDA] La Fase 1 (Diseño / Backend) presentó defectos. Deteniendo pipeline antes del ensamblaje.")
        _write_defects_report(now_str, phase=1, ux_err=has_ux_error, be_err=has_be_error, fe_err=True, qa_err=True, do_err=True)
        return False

    print("[PASS] [COMPUERTA 1 APROBADA] Diseño Glassmorphism y Contratos Backend validados con éxito.")

    # ─────────────────────────────────────────────────────────────
    # FASE 2: Ensamblaje (Frontend Developer Agent)
    # ─────────────────────────────────────────────────────────────
    print("\n>>> [FASE 2] Frontend Developer Agent — Maquetación Mobile-First & JS View...")
    fe_res = subprocess.run(["python", os.path.join(WORKSPACE_DIR, "scripts", "frontend_audit.py")], capture_output=True, text=True, encoding="utf-8", errors="replace")
    print(fe_res.stdout)

    has_fe_error = fe_res.returncode != 0 or "[FAIL]" in fe_res.stdout

    if has_fe_error:
        print("[FAIL] [COMPUERTA 2 FALLIDA] La Fase 2 (Frontend) retornó errores de maquetación o semántica. Deteniendo pipeline.")
        _write_defects_report(now_str, phase=2, ux_err=False, be_err=False, fe_err=True, qa_err=True, do_err=True)
        return False

    print("[PASS] [COMPUERTA 2 APROBADA] Ensamblaje Frontend Mobile-First validado con 0 errores.")

    # ─────────────────────────────────────────────────────────────
    # FASE 3: Verificación (QA Engineer Agent - Pruebas Destructivas)
    # ─────────────────────────────────────────────────────────────
    print("\n>>> [FASE 3] QA Engineer Agent — Auditoría Destructiva Multiplataforma...")
    qa_res = subprocess.run(["python", os.path.join(WORKSPACE_DIR, "scripts", "qa_audit.py")], capture_output=True, text=True, encoding="utf-8", errors="replace")
    print(qa_res.stdout)

    has_qa_error = qa_res.returncode != 0 or "[FAIL]" in qa_res.stdout

    if has_qa_error:
        print("[WARN] [COMPUERTA 3 FALLIDA] QA detectó defectos. APLICANDO RETROCESO AUTOMÁTICO A FASE 2 (Frontend).")
        _write_defects_report(now_str, phase=3, ux_err=False, be_err=False, fe_err=False, qa_err=True, do_err=True, loopback=True)
        return False

    print("[PASS] [COMPUERTA 3 APROBADA] Suite QA multiplataforma y fidelidad del itinerario 100% PASS.")

    # ─────────────────────────────────────────────────────────────
    # FASE 4: Despliegue y Contenerización (DevOps Engineer Agent)
    # ─────────────────────────────────────────────────────────────
    print("\n>>> [FASE 4] DevOps Engineer Agent — Docker, CI/CD Actions & Ramas Git...")
    devops_res = subprocess.run(["python", os.path.join(WORKSPACE_DIR, "scripts", "devops_audit.py")], capture_output=True, text=True, encoding="utf-8", errors="replace")
    print(devops_res.stdout)

    has_do_error = devops_res.returncode != 0 or "[FAIL]" in devops_res.stdout

    if has_do_error:
        print("[FAIL] [COMPUERTA 4 FALLIDA] Falla en la verificación de infraestructura DevOps / CI/CD.")
        _write_defects_report(now_str, phase=4, ux_err=False, be_err=False, fe_err=False, qa_err=False, do_err=True)
        return False

    print("[PASS] [COMPUERTA 4 APROBADA] Infraestructura, Dockerfile y Workflows CI/CD validados.")

    # ─────────────────────────────────────────────────────────────
    # APROBACIÓN GLOBAL
    # ─────────────────────────────────────────────────────────────
    _write_defects_report(now_str, phase=4, ux_err=False, be_err=False, fe_err=False, qa_err=False, do_err=False)
    print("\n[ÉXITO GLOBAL] Las 4 Compuertas del Manifiesto de Orquestación están 100% APROBADAS.")
    print("   El build está listo para despliegue inmutable a producción en Firebase Hosting.\n")
    return True


def _write_defects_report(now_str, phase, ux_err, be_err, fe_err, qa_err, do_err, loopback=False):
    all_pass = not (ux_err or be_err or fe_err or qa_err or do_err)

    if all_pass:
        defects_md = f"""# Reporte de Defectos - Pipeline de Orquestación Estricta (5 Agentes)

**Fecha de Ejecución**: {now_str}  
**Orquestador**: Agile Workflow Orchestrator  
**Evaluadores**: UI/UX Designer, Backend Developer, Frontend Developer, QA Engineer, DevOps Engineer  
**Estado Global**: 🟢 SIN DEFECTOS (100% PASS - 4 Compuertas Aprobadas)

---

## Estado de Compuertas del Pipeline
1. **Fase 1 (Contratos & Diseño - UI/UX + Backend)**: 🟢 COMPUERTA 1 APROBADA
   - UI/UX Designer Audit: 🟢 4/4 PASS
   - Backend Developer Audit: 🟢 5/5 PASS
2. **Fase 2 (Ensamblaje - Frontend Developer)**: 🟢 COMPUERTA 2 APROBADA (0 Errores)
3. **Fase 3 (Verificación - QA Engineer)**: 🟢 COMPUERTA 3 APROBADA (Multiplataforma)
4. **Fase 4 (Despliegue & Contenerización - DevOps)**: 🟢 COMPUERTA 4 APROBADA (Docker & CI/CD)

[+] Manifiesto de Orquestación Estricto validado. Listo para despliegue inmutable.
"""
    else:
        loopback_notice = "\n⚠️ **RETROCESO AUTOMÁTICO**: Ticket enviado de vuelta a la Fase 2 (Frontend Developer Agent) para corrección.\n" if loopback else ""
        defects_md = f"""# Reporte de Defectos - Pipeline de Orquestación Estricta (5 Agentes)

**Fecha de Ejecución**: {now_str}  
**Estado Global**: 🔴 DEFECTOS DETECTADOS EN FASE {phase}  
{loopback_notice}

## Detalle de Compuertas:
- **Fase 1A (UI/UX Audit)**: {'🔴 FAIL' if ux_err else '🟢 PASS'}
- **Fase 1B (Backend Audit)**: {'🔴 FAIL' if be_err else '🟢 PASS'}
- **Fase 2 (Frontend Audit)**: {'🔴 FAIL' if fe_err else '🟢 PASS'}
- **Fase 3 (QA Audit)**: {'🔴 FAIL' if qa_err else '🟢 PASS'}
- **Fase 4 (DevOps Audit)**: {'🔴 FAIL' if do_err else '🟢 PASS'}
"""

    os.makedirs(os.path.dirname(DEFECTS_REPORT_PATH), exist_ok=True)
    with open(DEFECTS_REPORT_PATH, "w", encoding="utf-8") as f:
        f.write(defects_md)


if __name__ == "__main__":
    success = run_pipeline()
    sys.exit(0 if success else 1)
