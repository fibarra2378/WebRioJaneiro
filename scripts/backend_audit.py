#!/usr/bin/env python3
"""
WebRioJaneiro - Backend Developer Automated Audit Suite
Executed by the Backend Developer Agent to validate API integrations, security attributes,
Firebase configuration, data schema consistency, and network performance optimizations.
"""

import os
import re
import json

WORKSPACE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
INDEX_PATH = os.path.join(WORKSPACE_DIR, "index.html")
CSS_PATH = os.path.join(WORKSPACE_DIR, "css", "styles.css")
DATA_JS_PATH = os.path.join(WORKSPACE_DIR, "js", "data.js")
APP_JS_PATH = os.path.join(WORKSPACE_DIR, "js", "app.js")
FIREBASE_JSON_PATH = os.path.join(WORKSPACE_DIR, "firebase.json")
FIREBASERC_PATH = os.path.join(WORKSPACE_DIR, ".firebaserc")
REPORT_PATH = os.path.join(WORKSPACE_DIR, "tests", "backend_report.md")


def run_backend_audit():
    print("=" * 60)
    print("  Backend Developer Agent - API, Security & Data Audit")
    print("=" * 60)

    score = 0
    max_score = 5
    findings = []

    # ── BE-01: External API URLs & HTTPS Validation ──
    api_urls_valid = True
    if os.path.exists(APP_JS_PATH):
        with open(APP_JS_PATH, "r", encoding="utf-8") as f:
            app_content = f.read()

        # Check Open-Meteo integration
        has_open_meteo = "api.open-meteo.com" in app_content
        has_https_api = "https://api.open-meteo.com" in app_content

        if has_open_meteo and has_https_api:
            findings.append("[OK] Open-Meteo API integrada via HTTPS.")
        else:
            api_urls_valid = False
            findings.append("[WARN] Open-Meteo API no detectada o no usa HTTPS.")

    if os.path.exists(INDEX_PATH):
        with open(INDEX_PATH, "r", encoding="utf-8") as f:
            html_content = f.read()

        # Check Leaflet tile source HTTPS
        has_leaflet_https = "https://{s}.tile.openstreetmap.org" in html_content or "https://unpkg.com/leaflet" in html_content
        if has_leaflet_https:
            findings.append("[OK] Leaflet tiles/library cargadas via HTTPS.")
        else:
            api_urls_valid = False
            findings.append("[WARN] Leaflet no detectado via HTTPS.")

    if api_urls_valid:
        print("[PASS] BE-01: URLs de APIs externas validadas (HTTPS, Open-Meteo, Leaflet).")
        score += 1
    else:
        print("[FAIL] BE-01: Problemas con URLs de APIs externas.")

    # ── BE-02: Security Attributes on External Links ──
    if os.path.exists(INDEX_PATH):
        with open(INDEX_PATH, "r", encoding="utf-8") as f:
            html_content = f.read()

        # Find all <a> tags with target="_blank"
        target_blank_links = re.findall(r'<a\s[^>]*target="_blank"[^>]*>', html_content)
        insecure_links = []
        for link in target_blank_links:
            if 'rel="noopener noreferrer"' not in link and "rel='noopener noreferrer'" not in link:
                insecure_links.append(link[:80])

        if len(insecure_links) == 0 and len(target_blank_links) > 0:
            print(f'[PASS] BE-02: Seguridad de enlaces externos validada ({len(target_blank_links)} enlaces con noopener noreferrer).')
            score += 1
        elif len(target_blank_links) == 0:
            print("[PASS] BE-02: Sin enlaces externos target=_blank detectados (N/A).")
            score += 1
        else:
            print(f"[FAIL] BE-02: {len(insecure_links)} enlace(s) sin rel='noopener noreferrer'.")
    else:
        print("[FAIL] BE-02: index.html no encontrado.")

    # ── BE-03: Firebase Configuration Integrity ──
    firebase_valid = True
    if os.path.exists(FIREBASE_JSON_PATH):
        with open(FIREBASE_JSON_PATH, "r", encoding="utf-8") as f:
            try:
                fb_config = json.load(f)
                has_hosting = "hosting" in fb_config
                has_public = has_hosting and fb_config["hosting"].get("public") is not None
                has_headers = has_hosting and "headers" in fb_config["hosting"]

                if has_hosting and has_public:
                    findings.append(f'[OK] firebase.json: hosting.public = "{fb_config["hosting"]["public"]}".')
                else:
                    firebase_valid = False
                    findings.append("[WARN] firebase.json: falta configuración de hosting.public.")

                if has_headers:
                    findings.append("[OK] firebase.json: headers de seguridad configurados.")
                else:
                    findings.append("[INFO] firebase.json: sin headers de caché/seguridad personalizados.")

            except json.JSONDecodeError:
                firebase_valid = False
                findings.append("[ERROR] firebase.json: JSON inválido.")
    else:
        firebase_valid = False
        findings.append("[WARN] firebase.json no encontrado.")

    if os.path.exists(FIREBASERC_PATH):
        with open(FIREBASERC_PATH, "r", encoding="utf-8") as f:
            try:
                rc_config = json.load(f)
                project_id = rc_config.get("projects", {}).get("default", "N/A")
                if project_id != "N/A":
                    findings.append(f'[OK] .firebaserc: proyecto = "{project_id}".')
                else:
                    firebase_valid = False
                    findings.append("[WARN] .firebaserc: no se encontró proyecto por defecto.")
            except json.JSONDecodeError:
                firebase_valid = False
                findings.append("[ERROR] .firebaserc: JSON inválido.")
    else:
        firebase_valid = False
        findings.append("[WARN] .firebaserc no encontrado.")

    if firebase_valid:
        print("[PASS] BE-03: Configuración de Firebase Hosting validada (firebase.json + .firebaserc).")
        score += 1
    else:
        print("[FAIL] BE-03: Problemas en configuración de Firebase.")

    # ── BE-04: Data Schema Consistency (js/data.js) ──
    data_valid = True
    if os.path.exists(DATA_JS_PATH):
        with open(DATA_JS_PATH, "r", encoding="utf-8") as f:
            data_content = f.read()

        required_schemas = [
            ("TRIP_DATA", "TRIP_DATA"),
            ("generalInfo", "generalInfo"),
            ("itineraryDays", "itineraryDays"),
            ("baseOfOperations", "baseOfOperations"),
            ("nearbyServices", "nearbyServices"),
            ("guideTips", "guideTips"),
            ("topRioTours", "topRioTours"),
        ]

        for schema_name, pattern in required_schemas:
            if pattern not in data_content:
                data_valid = False
                findings.append(f"[WARN] data.js: esquema '{schema_name}' no encontrado.")

        if data_valid:
            findings.append(f"[OK] data.js: {len(required_schemas)} esquemas de datos validados.")
    else:
        data_valid = False
        findings.append("[WARN] js/data.js no encontrado.")

    if data_valid:
        print("[PASS] BE-04: Consistencia de esquemas de datos en data.js validada.")
        score += 1
    else:
        print("[FAIL] BE-04: Inconsistencias en esquemas de datos.")

    # ── BE-05: Network Performance (Cache Busters, Lazy Loading, Headers) ──
    perf_valid = True
    if os.path.exists(INDEX_PATH):
        with open(INDEX_PATH, "r", encoding="utf-8") as f:
            html_content = f.read()

        # Check cache busters on CSS/JS
        has_css_buster = re.search(r'styles\.css\?v=[\d.]+', html_content) is not None
        has_js_buster = re.search(r'(data|app)\.js\?v=[\d.]+', html_content) is not None
        has_lazy = 'loading="lazy"' in html_content
        has_eager = 'loading="eager"' in html_content

        if has_css_buster and has_js_buster:
            findings.append("[OK] Cache busters detectados en CSS y JS.")
        else:
            perf_valid = False
            findings.append("[WARN] Faltan cache busters en activos CSS/JS.")

        if has_lazy and has_eager:
            findings.append("[OK] Estrategia de lazy/eager loading implementada.")
        else:
            perf_valid = False
            findings.append("[WARN] Faltan atributos loading='lazy'/'eager' en imágenes.")

    if os.path.exists(FIREBASE_JSON_PATH):
        with open(FIREBASE_JSON_PATH, "r", encoding="utf-8") as f:
            fb_raw = f.read()
        if "Cache-Control" in fb_raw:
            findings.append("[OK] Headers de Cache-Control configurados en firebase.json.")
        else:
            findings.append("[INFO] Sin headers Cache-Control personalizados en firebase.json.")

    if perf_valid:
        print("[PASS] BE-05: Optimización de rendimiento de red validada (cache busters, lazy loading).")
        score += 1
    else:
        print("[FAIL] BE-05: Problemas de optimización de rendimiento de red.")

    # ── Summary ──
    print("-" * 60)
    print(f"Puntuación Final del Backend Audit: {score}/{max_score} ({(score/max_score)*100:.0f}%)")
    print("=" * 60)

    # ── Write Report ──
    report_md = f"""# Backend Developer Agent - Reporte de Auditoría

**Puntuación**: {score}/{max_score} ({(score/max_score)*100:.0f}%)

## Hallazgos Detallados
"""
    for finding in findings:
        report_md += f"- {finding}\n"

    os.makedirs(os.path.dirname(REPORT_PATH), exist_ok=True)
    with open(REPORT_PATH, "w", encoding="utf-8") as f:
        f.write(report_md)

    print(f"\n[+] Reporte de Backend guardado en: {REPORT_PATH}\n")


if __name__ == "__main__":
    run_backend_audit()
