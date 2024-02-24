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