#!/usr/bin/env python3
"""
WebRioJaneiro - DevOps Automated Audit Suite
Executed by the DevOps Engineer Agent to validate CI/CD workflows, Dockerfiles, Git repository branches, and deployment readiness.
"""

import os
import subprocess

WORKSPACE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
WORKFLOW_PATH = os.path.join(WORKSPACE_DIR, ".github", "workflows", "ci-cd.yml")
DOCKERFILE_PATH = os.path.join(WORKSPACE_DIR, "Dockerfile")
GITIGNORE_PATH = os.path.join(WORKSPACE_DIR, ".gitignore")

def run_devops_audit():
    print("=" * 60)
    print("  DevOps Engineer Agent - CI/CD & Infrastructure Audit")
    print("=" * 60)

    score = 0
    max_score = 5

    # Check 1: GitHub Actions CI/CD Workflow
    if os.path.exists(WORKFLOW_PATH):
        with open(WORKFLOW_PATH, "r", encoding="utf-8") as f:
            wf_content = f.read()
        
        has_jobs = "audit-and-test" in wf_content and "docker-build" in wf_content and "deploy-github-pages" in wf_content
        has_branches = "main" in wf_content and "dev" in wf_content

        if has_jobs and has_branches:
            print("[PASS] DO-01: Workflow de CI/CD GitHub Actions (.github/workflows/ci-cd.yml) validado.")
            score += 1
        else:
            print("[FAIL] DO-01: Faltan trabajos o ramas en el workflow de CI/CD.")
    else:
        print("[FAIL] DO-01: No existe el archivo .github/workflows/ci-cd.yml.")

    # Check 2: Dockerfile Integrity
    if os.path.exists(DOCKERFILE_PATH):
        with open(DOCKERFILE_PATH, "r", encoding="utf-8") as f:
            df_content = f.read()
        
        if "nginx:alpine" in df_content and "EXPOSE 80" in df_content:
            print("[PASS] DO-02: Dockerfile de producción Nginx Alpine validado.")
            score += 1
        else:
            print("[FAIL] DO-02: Configuración incompleta en Dockerfile.")
    else:
        print("[FAIL] DO-02: No existe el archivo Dockerfile.")

    # Check 3: Gitignore Coverage
    if os.path.exists(GITIGNORE_PATH):
        with open(GITIGNORE_PATH, "r", encoding="utf-8") as f:
            gi_content = f.read()
        
        if ".DS_Store" in gi_content and "__pycache__" in gi_content:
            print("[PASS] DO-03: Cobertura del archivo .gitignore validada.")
            score += 1
        else:
            print("[FAIL] DO-03: Cobertura incompleta en .gitignore.")
    else:
        print("[FAIL] DO-03: No existe el archivo .gitignore.")

    # Check 4: Git Repository & Branches (dev / main)
    res_branch = subprocess.run(["git", "branch"], cwd=WORKSPACE_DIR, capture_output=True, text=True)
    if res_branch.returncode == 0:
        branches = res_branch.stdout
        has_dev = "dev" in branches
        has_main = "main" in branches
        if has_dev and has_main:
            print("[PASS] DO-04: Estructura de ramas Git (dev y main) validada.")
            score += 1
        else:
            print("[FAIL] DO-04: Faltan ramas dev o main en el repositorio Git.")
    else:
        print("[FAIL] DO-04: El directorio no está inicializado como repositorio Git.")

    # Check 5: Governance & Contributing Guidelines
    contrib_path = os.path.join(WORKSPACE_DIR, "CONTRIBUTING.md")
    pr_template_path = os.path.join(WORKSPACE_DIR, ".github", "PULL_REQUEST_TEMPLATE.md")
    if os.path.exists(contrib_path) and os.path.exists(pr_template_path):
        print("[PASS] DO-05: Guías de contribución (CONTRIBUTING.md) y plantilla de PR validadas.")
        score += 1
    else:
        print("[FAIL] DO-05: Faltan guías de contribución o plantilla de Pull Request.")

    print("-" * 60)
    print(f"Puntuación Final del DevOps Audit: {score}/{max_score} ({(score/max_score)*100:.0f}%)")
    print("=" * 60)

if __name__ == "__main__":
    run_devops_audit()
