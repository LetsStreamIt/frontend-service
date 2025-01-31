# Frontend Service

![CI status](https://github.com/letsstreamit/frontend-service/actions/workflows/dispatcher.yml/badge.svg)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
![Version](https://img.shields.io/github/v/release/letsstreamit/frontend-service?style=plastic)

[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=LetsStreamIt_frontend-service&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=LetsStreamIt_frontend-service)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=LetsStreamIt_frontend-service&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=LetsStreamIt_frontend-service)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=LetsStreamIt_frontend-service&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=LetsStreamIt_frontend-service)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=LetsStreamIt_frontend-service&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=LetsStreamIt_frontend-service)
[![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=LetsStreamIt_frontend-service&metric=sqale_index)](https://sonarcloud.io/summary/new_code?id=LetsStreamIt_frontend-service)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=LetsStreamIt_frontend-service&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=LetsStreamIt_frontend-service)

Frontend Service is responsible to manage the frontend of the Web application.

Through the website the user can:

- Authenticate to the system, by registering and login to it thanks to the [`auth-service`](https://github.com/LetsStreamIt/auth-service);
- Create and/or join a Youtube streaming session and interact with the corresponding video and chat, by using [`session-service`](https://github.com/LetsStreamIt/session-service);
- Navigate to the profile page and get public user information, thanks to the [`profile-service`](https://github.com/LetsStreamIt/profile-service);

## Technologies

[![Node.js](https://img.shields.io/badge/Vue.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://vuejs.org/)
[![Socket.IO](https://img.shields.io/badge/Socket.IO-25c2a0?style=for-the-badge&logo=socketdotio&logoColor=white)](https://socket.io/)

### Infrastructure

[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://docker.com)

### DevOps

[![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)](https://github.com/features/actions)
[![Semantic Release](https://img.shields.io/badge/Semantic_Release-494949?style=for-the-badge&logo=semantic-release&logoColor=white)](https://semantic-release.gitbook.io/)
[![Semantic Versioning](https://img.shields.io/badge/Semantic_Versioning-333333?style=for-the-badge&logo=semver&logoColor=white)](https://semver.org/)
[![Conventional Commits](https://img.shields.io/badge/Conventional_Commits-FE5196?style=for-the-badge&logo=conventionalcommits&logoColor=white)](https://www.conventionalcommits.org/en/v1.0.0/)
[![Renovate](https://img.shields.io/badge/RenovateBot-1A1F6C?style=for-the-badge&logo=renovate&logoColor=white)](https://renovatebot.com/)
[![SonarCloud](https://img.shields.io/badge/SonarCloud-F3702A?style=for-the-badge&logo=sonarcloud&logoColor=white)](https://sonarcloud.io/)

### Documentation

[![Typedoc](https://img.shields.io/badge/Typedoc-2ECE53?style=for-the-badge&logo=readthedocs&logoColor=white)](https://typedoc.org/)

## Usage

In order to run it, specify the following environment variables:

| Variable                   | Description                         |
| -------------------------- | ----------------------------------- |
| `SESSION_SERVICE_HOSTNAME` | The hostname of the session service |
| `SESSION_SERVICE_PORT`     | The port of the session service     |
| `PROFILE_SERVICE_HOSTNAME` | The hostname of the profile service |
| `PROFILE_SERVICE_PORT`     | The port of the profile service     |
| `AUTH_SERVICE_HOSTNAME`    | The hostname of the auth service    |
| `AUTH_SERVICE_PORT`        | The port of the auth service        |
| `AKKA_LICENSE_KEY`         | The license key for Akka            |

The frontend service can be deployed through a Docker container:

1. Create a `env.list` file specifying the environment variable values, as example:

   ```plaintext
   PROFILE_SERVICE_HOSTNAME="localhost"
   PROFILE_SERVICE_PORT=3001
   AUTH_SERVICE_HOSTNAME="localhost"
   AUTH_SERVICE_PORT=3000
   SESSION_SERVICE_HOSTNAME="localhost"
   SESSION_SERVICE_PORT=4000
   ```

2. Run the docker container, by substituting `LOCAL_PORT` with your preferred port:

   ```bash
   docker run --env-file -p LOCAL_PORT:80 ./env.list ghcr.io/letsstreamit/frontend-service:main
   ```

   If the other services are running in localhost, add the option `--network host` to let the service contact them.

## Contributing

If you want to contribute to the project, please read the [CONTRIBUTING.md](./CONTRIBUTING.md) file.

## License

Frontend Service is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## Authors

- Luca Fabri ([w-disaster](https://github.com/w-disaster))
- Simone Ceredi ([sceredi](https://github.com/sceredi))
