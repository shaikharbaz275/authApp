# Authentication App

This is a Node.js authentication app using MySQL for the database and Redis for session management. The project is containerized using Docker.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Getting Started

Follow these instructions to get the project up and running.

### Clone the Repository

```sh
git clone git@github.com:shaikharbaz275/authApp.git
cd authApp

### Build and Run the Containers
docker-compose up --build
