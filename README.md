# Multi-Environment CI/CD Pipeline with Kubernetes

A multi-stage GitHub Actions workflow to automate deployments across separate Dev, Staging, and Production environments using Kubernetes and GitHub Actions.

## Features

- **Multi-Environment Pipeline:** Automated deployments to Dev, Staging, and Production environments.
- **Git-Triggered Workflow:** Pushes to develop and main branches automatically deploy to the correct environment.
- **Kubernetes Namespaces:** Securely isolates Dev, Staging, and Prod resources within a single cluster.
- **Environment Config Management:** Uses GitHub Environments and secrets for secure configuration.
- **Controlled Promotion Process:** Allows for safe testing in Staging before an approved deployment to Production.
- **Containerized Deployments:** Builds optimized Docker images for your application.
- **Automated Health Checks:** Configured liveness and readiness probes to ensure self-healing.
- **Rollback Support:** Automatic rollback on deployment failures to maintain high availability.

## Tech Stack

- **CI/CD & Automation:** GitHub Actions  
- **Containerization:** Docker  
- **Orchestration:** Kubernetes (AKS)  
- **Registry:** GitHub Container Registry (GHCR)
- **Monitoring:** Kubernetes liveness & readiness probes
- **Version Control:** Git/GitHub

## Project Structure

```
express-backend/
│
├── .github/workflows/
│   └── ci-cd.yml          # GitHub Actions workflow definition
│
├── k8s/                   # Kubernetes manifests for each environment
│   ├── dev/
│   │   ├── deployment.yaml
│   │   ├── service.yaml
│   │   └── configmap.yaml
│   ├── staging/
│   │   ├── deployment.yaml
│   │   ├── service.yaml
│   │   └── configmap.yaml
│   └── prod/
│       ├── deployment.yaml
│       ├── service.yaml
│       └── configmap.yaml
│
├── src/
│   └── index.js           # Express application
│
├── Dockerfile
├── package.json
└── README.md
```

## Prerequisites

1. GitHub account with repository
2. Kubernetes cluster (AKS or any other Kubernetes service)
3. GitHub Container Registry (enabled for your account)
4. GitHub repository secrets for Kubernetes access

## Setup Instructions

### 1. Azure Kubernetes Service (AKS) Setup

```bash
# Create resource group
az group create --name my-k8s-group --location eastus

# Create AKS cluster
az aks create --resource-group my-k8s-group --name my-k8s-cluster --node-count 1 --enable-addons monitoring --generate-ssh-keys

# Connect to the cluster
az aks get-credentials --resource-group my-k8s-group --name my-k8s-cluster

# Create namespaces for each environment
kubectl create namespace dev
kubectl create namespace staging
kubectl create namespace prod
```

### 2. GitHub Container Registry Setup

The GitHub Actions workflow is configured to use GitHub Container Registry (GHCR) automatically. No additional setup is needed besides enabling GHCR for your account/organization.

### 3. GitHub Setup

1. Enable GitHub Container Registry for your account or organization
2. Set up GitHub Environments:
   - Go to your repository → Settings → Environments
   - Create three environments: `development`, `staging`, and `production`
   - Add protection rules and approvals to the `staging` and `production` environments
3. Add repository secrets:
   - `KUBE_CONFIG`: Your Kubernetes cluster configuration file (base64-encoded)

### 4. Configure and Run the Workflow

1. Push this code to your GitHub repository
2. GitHub Actions will automatically detect the workflow file in `.github/workflows/ci-cd.yml`
3. The workflow will run based on branch pushes:
   - `develop` branch pushes → Dev environment
   - `main` branch pushes → Staging and then Production (with approval)

## Deployment Flow

1. Push to `develop` branch → Automatically deploys to the Dev environment
2. Push to `main` branch → Automatically deploys to the Staging environment
3. After testing in Staging, approve the deployment to Production
4. The same build artifact is promoted to Production

## Local Development

```bash
# Install dependencies
npm install

# Start the app
npm start

# For development with auto-reload
npm run dev
```

## Docker Build

```bash
# Build the image
docker build -t express-backend:local .

# Run the container
docker run -p 3000:3000 express-backend:local
```
# Testing CI/CD pipeline
# Updated for Docker Hub
