#!/bin/bash
set -e

# =============================================
# Deploy script for pentolo-lp-front
# =============================================

COMPOSE_FILE="docker-compose.yml"
PROJECT_NAME="pentolo-lp-front"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

log_info()  { echo -e "${GREEN}[INFO]${NC} $1"; }
log_warn()  { echo -e "${YELLOW}[WARN]${NC} $1"; }
log_error() { echo -e "${RED}[ERROR]${NC} $1"; }

# Check prerequisites
check_prerequisites() {
    if ! command -v docker &> /dev/null; then
        log_error "Docker non è installato."
        exit 1
    fi

    if ! docker compose version &> /dev/null; then
        log_error "Docker Compose non è disponibile."
        exit 1
    fi
}

# Ensure .env file exists
ensure_env() {
    if [ ! -f .env ]; then
        log_warn "File .env non trovato, copio da .env.example..."
        if [ -f .env.example ]; then
            cp .env.example .env
            log_info ".env creato da .env.example. Modificalo se necessario."
        else
            log_warn "Nessun .env.example trovato, creo .env vuoto."
            touch .env
        fi
    fi
}

# Deploy
deploy() {
    log_info "Avvio deploy di ${PROJECT_NAME}..."

    log_info "Build delle immagini Docker..."
    docker compose -f "$COMPOSE_FILE" -p "$PROJECT_NAME" build --no-cache

    log_info "Arresto dei container esistenti..."
    docker compose -f "$COMPOSE_FILE" -p "$PROJECT_NAME" down --remove-orphans

    log_info "Avvio dei container..."
    docker compose -f "$COMPOSE_FILE" -p "$PROJECT_NAME" up -d

    log_info "Pulizia immagini dangling..."
    docker image prune -f

    log_info "Deploy completato! Il frontend è disponibile sulla porta ${EXPOSE_PORT:-8000}."
    docker compose -f "$COMPOSE_FILE" -p "$PROJECT_NAME" ps
}

# Main
check_prerequisites
ensure_env
source .env 2>/dev/null || true
deploy
