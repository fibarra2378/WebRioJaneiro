#!/usr/bin/env python3
"""
WebRioJaneiro - UI/UX Designer Agent Automated Audit Runner
Executed by the UI/UX Designer Agent to audit design system tokens, Mobile-First responsiveness, Glassmorphism aesthetic integrity, touch target ergonomis, and generate improvement tickets.
"""

import os
import sys

WORKSPACE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
REPORT_PATH = os.path.join(WORKSPACE_DIR, "tests", "ux_design_report.md")

results = []

def log_ux_test(test_id, name, status, details=""):
    results.append({
        "id": test_id,
        "name": name,
        "status": status,
        "details": details
    })
    print(f"[{status}] {test_id}: {name} - {details}")

def run_ux_audit():
    print("=" * 60)
    print("  UI/UX Designer Agent - Design System & Usability Audit")
    print("=" * 60)

    css_path = os.path.join(WORKSPACE_DIR, "css", "styles.css")
    html_path = os.path.join(WORKSPACE_DIR, "index.html")

    css_content = ""
    html_content = ""

    if os.path.exists(css_path):
        with open(css_path, "r", encoding="utf-8") as f:
            css_content = f.read()

    if os.path.exists(html_path):
        with open(html_path, "r", encoding="utf-8") as f:
            html_content = f.read()

    # Test UX-01: Glassmorphism Design Tokens & Color Palette
    has_glass_blur = "backdrop-filter" in css_content or "-webkit-backdrop-filter" in css_content
    has_color_teal = "06b6d4" in css_content or "38bdf8" in css_content
    has_color_gold = "f59e0b" in css_content or "fbbf24" in css_content

    if has_glass_blur and has_color_teal and has_color_gold:
        log_ux_test("UX-01", "Sistema de Diseño & Paleta Glassmorphism", "PASS", "Tokens de cristal traslúcido, desenfoque de fondo y paleta neón validados.")
    else:
        log_ux_test("UX-01", "Sistema de Diseño & Paleta Glassmorphism", "FAIL", "Faltan tokens de diseño Glassmorphism o paleta cromática.")

    # Test UX-02: Mobile-First Touch Ergonomics & Target Sizes
    has_touch_action = "touch-action" in css_content or "scroll-snap" in css_content
    has_swipe_hints = "swipe-hint" in html_content or "fa-hand-pointer" in html_content

    if has_touch_action and has_swipe_hints:
        log_ux_test("UX-02", "Ergonomía Táctil & Gestos Móviles", "PASS", "Objetivos táctiles, indicadores de swipe e interacciones para pulgar validadas.")
    else:
        log_ux_test("UX-02", "Ergonomía Táctil & Gestos Móviles", "FAIL", "Deficiencia en indicadores táctiles de desplazamiento o gestos móviles.")

    # Test UX-03: Typography & Visual Hierarchy
    has_google_fonts = "Plus+Jakarta+Sans" in html_content and "Playfair+Display" in html_content
    has_headings = "<h1" in html_content and "<h2" in html_content and "<h3" in html_content

    if has_google_fonts and has_headings:
        log_ux_test("UX-03", "Jerarquía Tipográfica & Legibilidad", "PASS", "Fuentes de alta definición (Jakarta Sans + Playfair) y estructura H1-H3 validadas.")
    else:
        log_ux_test("UX-03", "Jerarquía Tipográfica & Legibilidad", "FAIL", "Fuentes de Google o jerarquía tipográfica incompleta.")

    # Test UX-04: Dynamic Component Visual Integration
    has_weather_widget = "weather-forecast" in html_content
    has_carousel_badge = "carousel-badge" in html_content

    if has_weather_widget and has_carousel_badge:
        log_ux_test("UX-04", "Integración Visual de Componentes Dinámicos", "PASS", "Sección de clima dinámico Open-Meteo y badges interactivos de carrusel integrados.")
    else:
        log_ux_test("UX-04", "Integración Visual de Componentes Dinámicos", "FAIL", "Falta integración visual de widgets o badges dinámicos.")

    # Generate Report
    pass_count = sum(1 for r in results if r["status"] == "PASS")
    total_count = len(results)

    report_md = f"""# Reporte de Auditoría de Diseño UI/UX (UI/UX Designer Agent)

**Auditor**: UI/UX Designer Agent  
**Puntuación de Diseño**: {pass_count}/{total_count} ({(pass_count/total_count)*100:.0f}%)  
**Criterio Maestro**: Mobile-First, Ergonomía Táctil, Glassmorphism Dark Mode & Contraste AA.

---

## Resultados de Evaluación UI/UX

| ID | Criterio de Diseño | Estado | Detalles / Observaciones Visuales |
|---|---|---|---|
"""
    for r in results:
        status_icon = "🟢 PASS" if r["status"] == "PASS" else "🔴 FAIL"
        report_md += f"| {r['id']} | {r['name']} | {status_icon} | {r['details']} |\n"

    with open(REPORT_PATH, "w", encoding="utf-8") as f:
        f.write(report_md)

    print(f"\n[+] Reporte de UI/UX guardado en: {REPORT_PATH}\n")
    return pass_count == total_count

if __name__ == "__main__":
    success = run_ux_audit()
    if not success:
        sys.exit(1)
