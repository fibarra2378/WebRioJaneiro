#!/usr/bin/env python3
"""
WebRioJaneiro - Script de Configuración Inicial de Git y Ramas (dev / main)
Ejecuta la inicialización local del repositorio Git, creación de ramas dev y main, commit convencional e instrucciones para conectar con GitHub.
"""

import subprocess
import os

WORKSPACE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

def run_cmd(cmd):
    print(f"Executing: {' '.join(cmd)}")
    res = subprocess.run(cmd, cwd=WORKSPACE_DIR, capture_output=True, text=True)
    if res.returncode == 0:
        print(f"[OK] Output: {res.stdout.strip()}")
    else:
        print(f"[ERROR] ({res.returncode}): {res.stderr.strip()}")
    return res

def setup_git():
    print("=" * 65)
    print("  Configuración de Repositorio Git e Integración CI/CD")
    print("=" * 65)

    # 1. Git Init
    run_cmd(["git", "init"])

    # 2. Configurar rama actual como 'dev'
    run_cmd(["git", "checkout", "-b", "dev"])

    # 3. Add all files
    run_cmd(["git", "add", "."])

    # 4. Commit inicial con convención de commits
    commit_msg = "feat: inicializar portal WebRioJaneiro con workflow CI/CD, ramas dev y main"
    run_cmd(["git", "commit", "-m", commit_msg])

    # 5. Crear la rama 'main' a partir de 'dev'
    run_cmd(["git", "branch", "main"])

    print("\n" + "=" * 65)
    print("  ✅ Repositorio Git Local e Estructura de Ramas Configurados:")
    print("  - Rama Actual de Trabajo: dev")
    print("  - Rama de Producción: main")
    print("=" * 65)
    print("\n📌 PASOS FINALES PARA SUBIR A TU REPOSITORIO EN GITHUB:")
    print("1. Crea un nuevo repositorio en GitHub (ej: 'WebRioJaneiro').")
    print("2. Ejecuta los siguientes comandos en tu terminal:")
    print("   git remote add origin https://github.com/TU_USUARIO/WebRioJaneiro.git")
    print("   git push -u origin dev")
    print("   git push -u origin main")
    print("\n🚀 ¡Los Workflows de GitHub Actions en .github/workflows/ci-cd.yml ejecutarán el pipeline automáticamente!")
    print("=" * 65)

if __name__ == "__main__":
    setup_git()
