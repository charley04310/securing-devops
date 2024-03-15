# Securing DevOps

- **Authors:** Charley GEOFFROY & Sylvain Pierrot
- **Année:** 2023/2024
- **Matière:** Securing DevOps
- **Supervised by:** M. Sureau Florian

This repository contains the source code for the polytech project "Securing DevOps".

- Deﬁne a subject, with existing code
- Setup repository(ies)
- Taking into consideration each step of security we discussed, create
  pipelines, analysis tools, reports… that apply best practices.
- Write a report demonstrating your understanding of DevSecOps practices

It must include:

- Explanation of each step
- Reason why you did these steps
- Your understanding of the results (security elements)

## Table of contents

- Developpers: project life cycle
- External dependencies

## Requirements

- [Docker](https://www.docker.com/)
- [Pre-commit](https://pre-commit.com/)

## Threat Schema : Where am I most vulnerable to attacks?

<img src="./docs/assets/threat_model.png" alt="Threat model" width="100%"/>

### Threat entities

**Actor**

- HTTP Client (HTTP Request and Response): Represents a user or system making requests and receiving responses over the HTTP protocol.
- MQTT Client (TCP Publication): Represents a IOT devices or system sending messages over the MQTT protocol using TCP.

**Exposed Service**

- Reverse Proxy: Acts as a gateway exposed to the internet, handling all incoming traffic and forwarding it to the appropriate services.

**Trusted Boundary (Local Network)**

- NestJS API: A Node.js-based API running on the local network, providing various functionalities.
- MQTT Broker: Manages the MQTT communication within the local network, handling message publications and subscriptions.
- PostgreSQL Database: A relational database used to store and retrieve data securely within the local network.

In this threat model, the HTTP and MQTT clients interact with the system through a reverse proxy, which serves as the entry point for all traffic.

## Threats list

Peut etre plus granulaire dans le details

**Threats to HTTP Client (HTTP Request and Response):**

- Cross-Site Scripting (XSS): Malicious scripts are injected into the HTTP request, which is then executed by the HTTP client's browser.

- SQL Injection: If the HTTP client interacts with the NestJS API in a way that involves database queries, an attacker might attempt to inject malicious SQL code.

**Threats to MQTT Client (TCP Publication):**

- Unauthorized Access: An attacker gains access to the MQTT broker by exploiting vulnerabilities in the MQTT client's connection.

- Denial of Service (DoS): An attacker overwhelms the MQTT broker with a high volume of TCP publications, causing it to become unresponsive.

- Spoofing: An unauthorized entity intercepts and monitors MQTT messages, potentially exposing sensitive information.

**Threats to Reverse Proxy (Exposed Service):**

- DDoS Attacks: The reverse proxy may be targeted with a Distributed Denial of Service attack, rendering it unable to handle legitimate traffic.

- Inadequate Authentication and Authorization: If not properly configured, the reverse proxy might allow unauthorized access to the internal services.

- Protocol-Based Attacks: An attacker exploits weaknesses in the protocols (HTTP, MQTT) handled by the reverse proxy.

## Securing CI pipeline

### Github pre-commit hooks

La première étape de la pipeline CI est de s'assurer que le code source est propre et respecte les conventions de code. Lors de l'intégration d'un nouveau collaborateur, il est crucial de s'assurer que son environnement de développement soit configuré de manière identique à celui des autres membres de l'équipe. Ce processus ne peut pas être automatisé ou versionné, et il doit être réalisé indépendamment pour chaque développeur lors de l'unboarding.
Pour cela, nous utilisons le tool [pre-commit](https://pre-commit.com/hooks.html) qui permet déclencher des hooks avant chaque commit. Dans notre cas, nous utilisons [les hooks suivants](./.pre-commit-config.yaml):

- no-commit-to-branch
- check-merge-conflict
- check-symlinks
- detect-private-key

Nous avons décidé d'utiliser ces hooks pour éviter les erreurs humaines et les fuites de données sensibles. Par exemple, le hook `detect-private-key` permet de détecter les clés privées qui pourraient être accidentellement commitées. De plus, le hook `no-commit-to-branch` permet de s'assurer que les commits ne sont pas effectués directement sur la branche principale, ce qui permet de forcer l'utilisation des pull requests. Enfin, le hook `check-merge-conflict` permet de détecter les conflits de merge avant de commiter.

Un exemple de hook `no-commit-to-branch`:

<img src="./docs/assets/pre-commit.png" alt="Pre-commit" width="100%"/>

Nous pourrions pousser la sécurité plus loin en intégrant des hooks personnalisés pour vérifier si un fichier d'envirronement est présent.

Editer le fichier `.git/hooks/pre-commit` pour ajouter les hooks suivants:

```bash
#!/bin/sh
# Find .env files in the staged changes
ENV_FILES=$(git diff --cached --name-only --diff-filter=AM | grep '\.env$')

if [ -n "$ENV_FILES" ]; then
  echo "Error: Committing .env files is not allowed."
  echo "The following .env files were found in your changes:"
  echo "$ENV_FILES"
  exit 1
fi

exit 0
```

### Continuous Integration (CI)

- **Snyk:** Snyk is used to scan the application for vulnerabilities in the dependencies and Docker images. Snyk also pushing the results to the GitHub repository available in the Security tab.

- ESLint: ESLint is used to enforce code quality and best practices in the application's source code.

### Dockerfile security

- Container is running as non-root user (build)
- Container is running with minimal privileges (build)
- Container is running with ressource limits (runtime)
- Container is running with minimal system calls (runtime)

### Kernel security

- **Seccomp:** Seccomp is used to define the system calls that the container is allowed to make. This reduces the attack surface by preventing the container from making unnecessary system calls.

## Development security

### API security : DTO

Data transfer object (DTO) validation is performed using class-validator and class-transformer. This ensures that the data received by the API is validated and transformed according to the defined rules.

### Github security

- 2FA developpers
- Protect main branch
- Require pull request reviews before merging
- Require status checks to pass before merging
