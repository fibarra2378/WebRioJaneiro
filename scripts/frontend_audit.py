#!/usr/bin/env python3
"""
WebRioJaneiro - Frontend Development Automated Auditor
Executed by the Frontend Developer Agent to validate design system tokens, CSS rules, accessibility tags, and JS interactive setup.
"""

import os
import re

WORKSPACE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
INDEX_PATH = os.path.join(WORKSPACE_DIR, "index.html")
CSS_PATH = os.path.join(WORKSPACE_DIR, "css", "styles.css")
APP_JS_PATH = os.path.join(WORKSPACE_DIR, "js", "app.js")

def run_frontend_audit():
    print("=" * 60)
    print("  Frontend Developer Agent - Code & Design Audit")
    print("=" * 60)

    score = 0
    max_score = 5

    # Check 1: Design Tokens in CSS
    with open(CSS_PATH, "r", encoding="utf-8") as f:
        css = f.read()

    tokens = ["--bg-primary", "--accent-gold", "--accent-teal", "--font-main", "backdrop-filter"]
    if all(t in css for t in tokens):
        print("[PASS] FE-01: Sistema de Diseño y Tokens CSS validados correctamente.")
        score += 1
    else:
        print("[FAIL] FE-01: Faltan tokens del sistema de diseño en styles.css.")

    # Check 2: Responsive Media Queries & Flex/Grid
    if "@media" in css and "grid-template-columns" in css:
        print("[PASS] FE-02: Reglas de maquetación responsiva (Grid & Media Queries) validadas.")
        score += 1
    else:
        print("[FAIL] FE-02: Faltan reglas responsivas o grillas adaptativas.")

    # Check 3: HTML Accessibility & Semantics
    with open(INDEX_PATH, "r", encoding="utf-8") as f:
        html = f.read()

    has_nav = "<nav" in html
    has_footer = "<footer" in html
    has_aria = "aria-label" in html

    if has_nav and has_footer and has_aria:
        print("[PASS] FE-03: Semántica HTML5 e indicadores de accesibilidad ARIA validados.")
        score += 1
    else:
        print("[FAIL] FE-03: Faltan etiquetas semánticas o atributos ARIA en index.html.")

    # Check 4: JS Interactive Event Setup
    with open(APP_JS_PATH, "r", encoding="utf-8") as f:
        app_js = f.read()

    js_features = ["addEventListener", "localStorage", "L.map", "speechSynthesis"]
    if all(feat in app_js for feat in js_features):
        print("[PASS] FE-04: Lógica interactiva JS (Eventos, LocalStorage, Leaflet, Voz) validada.")
        score += 1
    else:
        print("[FAIL] FE-04: Faltan características interactivas en app.js.")

    # Check 5: Dark / Light Theme Support
    if 'data-theme' in html and 'setAttribute(\'data-theme\'' in app_js:
        print("[PASS] FE-05: Conmutador de Tema Claro/Oscuro validado en HTML y JS.")
        score += 1
    else:
        print("[FAIL] FE-05: Deficiencia en la implementación del tema claro/oscuro.")

    print("-" * 60)
    print(f"Puntuación Final del Frontend Audit: {score}/{max_score} ({(score/max_score)*100:.0f}%)")
    print("=" * 60)

if __name__ == "__main__":
    run_frontend_audit()
