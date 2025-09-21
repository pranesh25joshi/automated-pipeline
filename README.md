# automated-pipeline

# Automated Deployment & Monitoring Pipeline

A fully automated **CI/CD pipeline** to build, deploy, and monitor containerized applications on Kubernetes, designed for seamless deployment, health monitoring, and rollback.

## Features

- **Containerized Deployments:** Builds optimized Docker images for your application.
- **Kubernetes Orchestration:** Deploys applications with Pods, Services, and Deployments.
- **Automated Health Checks:** Configured liveness and readiness probes to ensure self-healing.
- **CI/CD Automation:** GitHub Actions automates builds, tests, deployments, and post-deployment health verification.
- **Rollback Support:** Automatic rollback on deployment failures to maintain high availability.
- **Multi-Environment Ready:** Easily extendable for Dev, Staging, and Production environments.

## Tech Stack

- **CI/CD & Automation:** GitHub Actions  
- **Containerization:** Docker  
- **Orchestration:** Kubernetes  
- **Monitoring:** Kubernetes liveness & readiness probes, custom health-check scripts  
- **Version Control:** Git/GitHub
