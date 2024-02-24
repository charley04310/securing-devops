# Securing DevOps

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

## Threat Schema

<img src="./docs/assets/threat_model.png" alt="Threat model" width="100%"/>

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

**Threats to HTTP Client (HTTP Request and Response):**

- Cross-Site Scripting (XSS): Malicious scripts are injected into the HTTP request, which is then executed by the HTTP client's browser.

- SQL Injection: If the HTTP client interacts with the NestJS API in a way that involves database queries, an attacker might attempt to inject malicious SQL code.

**Threats to MQTT Client (TCP Publication):**

- Unauthorized Access: An attacker gains access to the MQTT broker by exploiting vulnerabilities in the MQTT client's connection.

- Denial of Service (DoS): An attacker overwhelms the MQTT broker with a high volume of TCP publications, causing it to become unresponsive.

- Clandestine eavesdropping: An unauthorized entity intercepts and monitors MQTT messages, potentially exposing sensitive information.

**Threats to Reverse Proxy (Exposed Service):**

- DDoS Attacks: The reverse proxy may be targeted with a Distributed Denial of Service attack, rendering it unable to handle legitimate traffic.

- Inadequate Authentication and Authorization: If not properly configured, the reverse proxy might allow unauthorized access to the internal services.

- Protocol-Based Attacks: An attacker exploits weaknesses in the protocols (HTTP, MQTT) handled by the reverse proxy.

## MQTT credentials

The MQTT credentials are stored in the `mosquitto/config/passwd` file.
To generate a new password file, use the following command:

```bash
sudo mosquitto_passwd -c ./mosquitto/config/password.passwd app
```

## Container security

- version is specified for each IMAGE
- container is running as non-root user
- container is running with minimal privileges
- container is running with minimal capabilities
- container is running with minimal system calls

## Data transfer object (DTO)

All data transfer objects (DTO) are defined in the `dto` package. They are used to transfer/control the data between the different layers of the application.
