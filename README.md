# 🚀 UQU DevOps CI/CD Project

Enterprise-grade Continuous Integration and Deployment system powered by Jenkins and Docker.

## 📋 Project Overview

This project demonstrates a complete CI/CD pipeline implementation using Jenkins and Docker for a Node.js web application. It includes automated testing, Docker containerization, and deployment automation.

## ✨ Features

- **Multi-Stage Jenkins Pipeline**: Build, Test, Package, and Deploy stages
- **Automated Testing**: Jest test suite with coverage reporting
- **Docker Containerization**: Multi-stage Docker build for production
- **Interactive Dashboard**: Real-time CI/CD metrics and monitoring
- **Health Checks**: Automated health monitoring endpoints
- **Security Best Practices**: Non-root container, signal handling
- **Failure Handling**: Proper error handling and pipeline abort on test failures
- **GitHub Integration**: Automatic builds on push via webhooks
- **Git Support**: Full Git integration with commit and branch tracking

## 🏗️ Architecture

### Application Structure
```
jenkins-devops-project/
├── src/
│   ├── app.js              # Main Express application
│   └── routes.js           # Route definitions
├── test/
│   └── app.test.js         # Jest test suite
├── index.html              # Interactive dashboard
├── Dockerfile              # Multi-stage Docker build
├── Jenkinsfile             # CI/CD pipeline definition
├── package.json            # Node.js dependencies
├── jest.config.js          # Jest configuration
├── .gitignore              # Git ignore rules
├── README.md               # Project documentation
└── GITHUB_SETUP.md         # GitHub integration guide
```

### API Endpoints

- `GET /` - Main dashboard (HTML)
- `GET /health` - Health check endpoint
- `GET /api/system-info` - System information
- `GET /api/pipeline-status` - Pipeline stages status
- `GET /api/metrics` - Deployment metrics
- `GET /api/build-info` - Build information
- `GET /api/test-results` - Test results summary

## 🛠️ Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0
- Docker
- Jenkins (for CI/CD pipeline)

## 🚀 Quick Start

### Local Development

1. Install dependencies:
```bash
npm install
```

2. Run tests:
```bash
npm test
```

3. Start the application:
```bash
npm start
```

4. Access the dashboard:
```
http://localhost:3000
```

### Docker Deployment

1. Build the Docker image:
```bash
docker build -t uqu-production-app .
```

2. Run the container:
```bash
docker run -d -p 3000:3000 --name uqu-web-service uqu-production-app
```

3. Access the application:
```
http://localhost:3000
```

## 📊 Jenkins Pipeline

The Jenkinsfile defines a multi-stage pipeline:

1. **Code Checkout**: Pull latest code from Git
2. **Install Dependencies**: Install npm packages
3. **Run Unit Tests**: Execute Jest test suite with coverage
4. **Build Docker Image**: Create production Docker image
5. **Security Scan**: Run security checks on the image
6. **Automated Deployment**: Deploy container to production
7. **Smoke Tests**: Verify deployment health

### Pipeline Features

- **Automatic cleanup**: Workspace cleanup after each build
- **Build retention**: Keep only last 10 builds
- **Timeout protection**: 30-minute timeout per build
- **Failure handling**: Stop pipeline on test failures
- **Health verification**: Automated health checks after deployment
- **Timestamps**: Console output with timestamps
- **GitHub Integration**: Automatic builds on push via webhooks

## 🔗 GitHub Integration

The project is configured for automatic Jenkins builds triggered by GitHub pushes:

### Automatic Build Triggers

The Jenkinsfile includes two trigger mechanisms:

1. **GitHub Webhook**: Instant build on push (requires setup)
2. **Poll SCM**: Fallback check every 5 minutes

```groovy
triggers {
    githubPush()           // Webhook trigger
    pollSCM('H/5 * * * *') // Poll every 5 minutes
}
```

### Setup Instructions

See [GITHUB_SETUP.md](./GITHUB_SETUP.md) for detailed instructions on:

- Installing required Jenkins plugins
- Configuring GitHub integration
- Setting up webhooks
- Troubleshooting common issues

### Quick Setup Summary

1. Install GitHub Plugin in Jenkins
2. Configure GitHub credentials in Jenkins
3. Enable "GitHub hook trigger" in Jenkins job
4. Add webhook in GitHub repository settings
5. Push code to trigger automatic build

## 🧪 Testing

The project includes comprehensive test coverage:

- Health check endpoint tests
- API endpoint validation
- Response format verification
- 404 handler testing
- Pipeline stage validation

Run tests with coverage:
```bash
npm test -- --coverage
```

## 🔒 Security Features

- Non-root container user
- Multi-stage Docker build
- Minimal production image
- Signal handling with dumb-init
- Security scanning integration
- Environment variable configuration

## 📈 Monitoring

The interactive dashboard provides real-time metrics:

- Pipeline status and stage durations
- Deployment success rates
- Test coverage and results
- System health information
- Build metadata

## 🎯 Learning Objectives

This project demonstrates:
- Pipeline-as-code with Jenkins
- Docker containerization best practices
- Automated testing integration
- CI/CD workflow implementation
- Failure handling and error management
- Production deployment automation

## 🤝 Contributing

This is an educational project for learning DevOps practices.

## 📄 License

MIT License - UQU DevOps Team

## 🙏 Acknowledgments

- UQU (Umm Al-Qura University)
- Jenkins CI/CD Platform
- Docker Containerization
- Node.js & Express Framework
