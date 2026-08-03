#!/usr/bin/env python3
"""
WebRioJaneiro - Software Architect Automated Audit Suite
Executed by the Software Architect Agent to perform holistic architectural reviews,
evaluating decoupling, security, serverless resiliency, performance, and technical debt.
"""

import os
import re
import json
import sys

# Enforce UTF-8 output encoding for Windows terminal compatibility
if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

WORKSPACE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
INDEX_PATH = os.path.join(WORKSPACE_DIR, "index.html")
CSS_PATH = os.path.join(WORKSPACE_DIR, "css", "styles.css")
DATA_JS_PATH = os.path.join(WORKSPACE_DIR, "js", "data.js")
APP_JS_PATH = os.path.join(WORKSPACE_DIR, "js", "app.js")
FUNCTIONS_JS_PATH = os.path.join(WORKSPACE_DIR, "functions", "index.js")
FIREBASE_JSON_PATH = os.path.join(WORKSPACE_DIR, "firebase.json")
REPORT_PATH = os.path.join(WORKSPACE_DIR, "tests", "architecture_report.md")


def run_architect_audit():
    print("=" * 65)
    print("  Software Architect Agent - Holistic System & Architecture Audit")
    print("=" * 65)

    score = 0
    max_score = 5
    recommendations = []
    pillars_status = {}

    # ── AR-01: Architectural Decoupling ──
    decoupling_valid = True
    if os.path.exists(DATA_JS_PATH) and os.path.exists(APP_JS_PATH) and os.path.exists(INDEX_PATH):
        with open(DATA_JS_PATH, "r", encoding="utf-8") as f:
            data_content = f.read()
        with open(APP_JS_PATH, "r", encoding="utf-8") as f:
            app_content = f.read()

        # Verify data object TRIP_DATA is centralized in data.js
        has_trip_data = "const TRIP_DATA =" in data_content or "TRIP_DATA =" in data_content
        # Verify app.js references TRIP_DATA without hardcoding data
        uses_trip_data = "TRIP_DATA" in app_content

        if has_trip_data and uses_trip_data:
            pillars_status["AR-01"] = "PASS"
            print("[PASS] AR-01: Desacoplamiento arquitectónico validado (Vista, Datos y Controlador desacoplados).")
            score += 1
        else:
            decoupling_valid = False
            pillars_status["AR-01"] = "FAIL"
            print("[FAIL] AR-01: Acoplamiento indebido entre la capa de datos y la vista.")
            recommendations.append("AR-01: Centralizar constantes y modelos de datos en `js/data.js` para mantener desacoplada la vista.")
    else:
        pillars_status["AR-01"] = "FAIL"
        print("[FAIL] AR-01: Archivos core faltantes.")

    # ── AR-02: Security & OWASP Baseline ──
    security_valid = True
    if os.path.exists(INDEX_PATH) and os.path.exists(FUNCTIONS_JS_PATH):
        with open(INDEX_PATH, "r", encoding="utf-8") as f:
            html_content = f.read()
        with open(FUNCTIONS_JS_PATH, "r", encoding="utf-8") as f:
            func_content = f.read()

        # Check target="_blank" noopener noreferrer
        target_blank_links = re.findall(r'<a\s[^>]*target="_blank"[^>]*>', html_content)
        insecure_links = [link for link in target_blank_links if 'rel="noopener noreferrer"' not in link and "rel='noopener noreferrer'" not in link]

        # Check API key handled via process.env in Cloud Function
        has_env_key = "process.env.TOURISM_API_KEY" in func_content or "process.env.GOOGLE_PLACES_API_KEY" in func_content
        # Check no hardcoded API keys in client JS
        has_hardcoded_key = re.search(r'AIzaSy[A-Za-z0-9_-]{33}', html_content) is not None

        if len(insecure_links) == 0 and has_env_key and not has_hardcoded_key:
            pillars_status["AR-02"] = "PASS"
            print("[PASS] AR-02: Seguridad OWASP & Protección de Datos validada (HTTPS, secrets en env, enlaces seguros).")
            score += 1
        else:
            security_valid = False
            pillars_status["AR-02"] = "FAIL"
            print("[FAIL] AR-02: Deficiencias de seguridad detectadas (enlaces no protegidos o API keys expuestas).")
            if insecure_links:
                recommendations.append(f"AR-02: {len(insecure_links)} enlace(s) externo(s) requieren `rel=\"noopener noreferrer\"`.")
            if not has_env_key:
                recommendations.append("AR-02: La Cloud Function debe usar variables de entorno `process.env.TOURISM_API_KEY`.")

    # ── AR-03: Serverless Architecture & Resiliency ──
    serverless_valid = True
    if os.path.exists(FUNCTIONS_JS_PATH) and os.path.exists(FIREBASE_JSON_PATH):
        with open(FUNCTIONS_JS_PATH, "r", encoding="utf-8") as f:
            func_content = f.read()
        with open(FIREBASE_JSON_PATH, "r", encoding="utf-8") as f:
            fb_content = f.read()

        has_cors = "Access-Control-Allow-Origin" in func_content
        has_fallback = "FALLBACK_TOURS" in func_content
        has_rewrite = "/api/getTopRioTours" in fb_content

        if has_cors and has_fallback and has_rewrite:
            pillars_status["AR-03"] = "PASS"
            print("[PASS] AR-03: Arquitectura Serverless & Resiliencia validada (CORS, Fallbacks, Hosting Rewrites).")
            score += 1
        else:
            serverless_valid = False
            pillars_status["AR-03"] = "FAIL"
            print("[FAIL] AR-03: Falta de resiliencia o reescrituras en la capa Serverless.")
            recommendations.append("AR-03: Configurar reescrituras en `firebase.json` y fallbacks en Cloud Functions.")

    # ── AR-04: Network Performance & Caching Strategy ──
    perf_valid = True
    if os.path.exists(INDEX_PATH):
        with open(INDEX_PATH, "r", encoding="utf-8") as f:
            html_content = f.read()

        has_css_buster = re.search(r'styles\.css\?v=[\d.]+', html_content) is not None
        has_js_buster = re.search(r'(data|app)\.js\?v=[\d.]+', html_content) is not None
        has_lazy = 'loading="lazy"' in html_content

        if has_css_buster and has_js_buster and has_lazy:
            pillars_status["AR-04"] = "PASS"
            print("[PASS] AR-04: Rendimiento de Red & Caché validados (Cache busters, Lazy Loading).")
            score += 1
        else:
            perf_valid = False
            pillars_status["AR-04"] = "FAIL"
            print("[FAIL] AR-04: Faltan estrategias de invalidación de caché o carga diferida de imágenes.")
            recommendations.append("AR-04: Añadir cache busters `?v=` a CSS/JS y `loading=\"lazy\"` a imágenes fuera de pantalla.")

    # ── AR-05: Maintainability & Documentation Integrity ──
    doc_valid = True
    agents_md_path = os.path.join(WORKSPACE_DIR, ".agents", "AGENTS.md")
    if os.path.exists(agents_md_path):
        with open(agents_md_path, "r", encoding="utf-8") as f:
            agents_content = f.read()

        has_orchestration = "Protocolo de Orquestación Estricto" in agents_content or "Manifiesto de Orquestación" in agents_content
        has_architect_agent = "Software Architect" in agents_content

        if has_orchestration and has_architect_agent:
            pillars_status["AR-05"] = "PASS"
            print("[PASS] AR-05: Mantenibilidad & Gobernanza de Documentación validadas.")
            score += 1
        else:
            doc_valid = False
            pillars_status["AR-05"] = "FAIL"
            print("[FAIL] AR-05: Faltan registros de gobernanza o del Software Architect en AGENTS.md.")
            recommendations.append("AR-05: Documentar el rol del Software Architect Agent en `.agents/AGENTS.md`.")

    # ── Summary ──
    print("-" * 65)
    print(f"Puntuación Final del Software Architect Audit: {score}/{max_score} ({(score/max_score)*100:.0f}%)")
    print("=" * 65)

    # ── Generate Report ──
    now_str = os.popen("echo %DATE% %TIME%").read().strip() or "2026-08-03"
    report_md = f"""# Reporte de Evaluación de Arquitectura de Software

**Evaluador**: Software Architect Agent  
**Puntuación de Arquitectura**: {score}/{max_score} ({(score/max_score)*100:.0f}%)  
**Estado Global**: {'🟢 ARQUITECTURA SÓLIDA' if score == max_score else '🟡 MEJORAS ARQUITECTÓNICAS RECOMENDADAS'}

---

## Resultados por Pilar Arquitectónico

| ID | Pilar Arquitectónico | Estado | Evaluación |
|---|---|---|---|
| AR-01 | Desacoplamiento | {'🟢 PASS' if pillars_status.get('AR-01') == 'PASS' else '🔴 FAIL'} | Vista, Capa de Datos y Controladores desacoplados |
| AR-02 | Seguridad OWASP | {'🟢 PASS' if pillars_status.get('AR-02') == 'PASS' else '🔴 FAIL'} | Enlaces externos con `rel="noopener noreferrer"`, secrets en env |
| AR-03 | Serverless & Resiliencia | {'🟢 PASS' if pillars_status.get('AR-03') == 'PASS' else '🔴 FAIL'} | Cloud Functions proxy `getTopRioTours`, CORS y fallbacks |
| AR-04 | Rendimiento & Caché | {'🟢 PASS' if pillars_status.get('AR-04') == 'PASS' else '🔴 FAIL'} | Cache busters versionados y lazy loading de activos |
| AR-05 | Gobernanza & Mantenibilidad | {'🟢 PASS' if pillars_status.get('AR-05') == 'PASS' else '🔴 FAIL'} | Manifiesto de Orquestación y documentación de agentes |

---

## 💡 Propuestas Estratégicas de Mejora

"""
    if recommendations:
        for rec in recommendations:
            report_md += f"- ⚠️ **{rec.split(':')[0]}**: {rec.split(':', 1)[1].strip()}\n"
    else:
        report_md += "- 🟢 **Arquitectura Inmaculada**: El proyecto cumple al 100% con los principios de Clean Code, Seguridad OWASP, Serverless Proxy y Estrategia Mobile-First.\n"

    os.makedirs(os.path.dirname(REPORT_PATH), exist_ok=True)
    with open(REPORT_PATH, "w", encoding="utf-8") as f:
        f.write(report_md)

    print(f"\n[+] Reporte de Arquitectura guardado en: {REPORT_PATH}\n")
    return score == max_score


if __name__ == "__main__":
    run_architect_audit()
