# 🚀 Quick Start Guide - Run the Project

This guide provides complete step-by-step instructions to run the CI/CD project from scratch.

---

## 📋 Prerequisites

Before starting, ensure you have:

1. **Docker Desktop** installed and running
   - Download from: https://www.docker.com/products/docker-desktop
   - Verify: `docker --version`

2. **Git** installed
   - Download from: https://git-scm.com/downloads
   - Verify: `git --version`

3. **Node.js** installed (for local testing only)
   - Download from: https://nodejs.org
   - Verify: `node --version`

---

## 🎯 Option 1: Run Application Locally (Without Jenkins)

### Step 1: Clone the Repository

```bash
git clone https://github.com/hadeelza/jenkins-devops-project.git
cd jenkins-devops-project
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Run Tests

```bash
npm test
```

### Step 4: Start the Application

```bash
npm start
```

### Step 5: Access the Application

Open your browser and go to:
- **Dashboard:** http://localhost:3000
- **Health Check:** http://localhost:3000/health
- **API Endpoints:** http://localhost:3000/api/*

---

## 🐳 Option 2: Run with Docker (Without Jenkins)

### Step 1: Clone the Repository

```bash
git clone https://github.com/hadeelza/jenkins-devops-project.git
cd jenkins-devops-project
```

### Step 2: Build Docker Image

```bash
docker build -t uqu-production-app:latest .
```

### Step 3: Run Docker Container

```bash
docker run -d -p 3000:3000 --name uqu-web-service uqu-production-app:latest
```

### Step 4: Access the Application

Open your browser and go to:
- **Dashboard:** http://localhost:3000
- **Health Check:** http://localhost:3000/health

### Step 5: Stop the Container

```bash
docker stop uqu-web-service
docker rm uqu-web-service
```

---

## 🤖 Option 3: Run with Jenkins (Complete CI/CD)

### Step 1: Start Jenkins Container

```bash
docker run -d -p 8080:8080 -p 50000:50000 --name jenkins-server -v jenkins_home:/var/jenkins_home -v /var/run/docker.sock:/var/run/docker.sock jenkins/jenkins:lts
```

### Step 2: Wait for Jenkins to Start

Wait 1-2 minutes for Jenkins to fully start.

### Step 3: Get Initial Admin Password

```bash
docker exec jenkins-server cat /var/jenkins_home/secrets/initialAdminPassword
```

Copy the password shown.

### Step 4: Access Jenkins Dashboard

Open your browser and go to:
```
http://localhost:8080
```

### Step 5: Complete Jenkins Setup

1. Paste the initial admin password
2. Click **Install suggested plugins**
3. Wait for plugins to install
4. Create admin user (username, password, name, email)
5. Click **Save and Finish**
6. Click **Start using Jenkins**

### Step 6: Install Node.js in Jenkins Container

```bash
docker exec -it -u 0 jenkins-server bash
apt-get update
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt-get install -y nodejs
exit
```

Verify:
```bash
docker exec jenkins-server node --version  # Should show v18.20.8
docker exec jenkins-server npm --version   # Should show 10.8.2
```

### Step 7: Install Docker CLI in Jenkins Container

```bash
docker exec -it -u 0 jenkins-server bash
apt-get update
apt-get install -y docker.io
usermod -aG docker jenkins
chmod 666 /var/run/docker.sock
exit
```

Verify:
```bash
docker exec jenkins-server docker --version  # Should show Docker version
```

### Step 8: Create Jenkins Job

1. Click **New Item**
2. **Item name:** `jenkins-devops-project`
3. Select **Pipeline**
4. Click **OK**

### Step 9: Configure Jenkins Job

In the **Pipeline** section:

- **Definition:** Select `Pipeline script from SCM`
- **SCM:** Select `Git`
- **Repository URL:** `https://github.com/hadeelza/jenkins-devops-project.git`
- **Branch Specifier:** `*/main`
- **Script Path:** `Jenkinsfile`

Click **Save**

### Step 10: Run the Pipeline

1. Click **Build Now**
2. Wait for the pipeline to complete (approximately 1-2 minutes)
3. Click on the build number to view the console output

### Step 11: Verify the Deployment

After the pipeline succeeds, the application should be running:

```bash
docker ps | grep uqu-web-service
```

Access the application:
- **Dashboard:** http://localhost:3000
- **Health Check:** http://localhost:3000/health

---

## 🔄 Automatic Builds with GitHub

### Option A: Poll SCM (Automatic every 5 minutes)

The Jenkinsfile is already configured with:
```groovy
triggers {
    pollSCM('H/5 * * * *') // Poll every 5 minutes
}
```

Jenkins will automatically check GitHub every 5 minutes and start a build if there are changes.

### Option B: GitHub Webhook (Instant builds)

**Note:** Webhooks don't work with localhost. This is for production environments.

1. Go to GitHub repository → Settings → Webhooks
2. Click **Add webhook**
3. **Payload URL:** `http://YOUR_JENKINS_SERVER_IP:8080/github-webhook/`
4. **Content type:** `application/json`
5. **Events:** Select **Just the push event**
6. Click **Add webhook**

---

## 🧪 Testing the Application

### Manual Testing

1. **Health Check:**
   ```bash
   curl http://localhost:3000/health
   ```

2. **System Info API:**
   ```bash
   curl http://localhost:3000/api/system-info
   ```

3. **Pipeline Status API:**
   ```bash
   curl http://localhost:3000/api/pipeline-status
   ```

4. **Dashboard:**
   Open http://localhost:3000 in your browser

### Automated Testing

```bash
npm test
```

Expected output:
```
Test Suites: 1 passed, 1 total
Tests:       10 passed, 10 total
Coverage:    77.77%
```

---

## 🛠️ Troubleshooting

### Jenkins won't start

**Problem:** Container exits immediately

**Solution:**
```bash
docker logs jenkins-server
docker rm jenkins-server
docker run -d -p 8080:8080 -p 50000:50000 --name jenkins-server -v jenkins_home:/var/jenkins_home -v /var/run/docker.sock:/var/run/docker.sock jenkins/jenkins:lts
```

### Pipeline fails on npm install

**Problem:** `npm: not found`

**Solution:**
```bash
docker exec -it -u 0 jenkins-server bash
apt-get update
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt-get install -y nodejs
exit
```

### Pipeline fails on docker build

**Problem:** `docker: command not found`

**Solution:**
```bash
docker exec -it -u 0 jenkins-server bash
apt-get update
apt-get install -y docker.io
usermod -aG docker jenkins
chmod 666 /var/run/docker.sock
exit
```

### Application not accessible

**Problem:** Cannot access http://localhost:3000

**Solution:**
```bash
docker ps | grep uqu-web-service
docker logs uqu-web-service
docker port uqu-web-service
```

If container is not running:
```bash
docker run -d -p 3000:3000 --name uqu-web-service uqu-production-app:latest
```

### Permission denied on docker.sock

**Problem:** `permission denied while trying to connect to the Docker daemon socket`

**Solution:**
```bash
docker exec -it -u 0 jenkins-server bash
chmod 666 /var/run/docker.sock
exit
```

---

## 📊 Project Structure

```
jenkins-devops-project/
├── src/
│   ├── app.js              # Main application
│   └── routes.js           # Routes
├── test/
│   └── app.test.js         # Tests
├── Dockerfile              # Docker configuration
├── Jenkinsfile             # Jenkins pipeline
├── package.json            # Dependencies
├── jest.config.js          # Jest configuration
├── index.html              # Dashboard
└── README.md               # Documentation
```

---

## 🎯 Quick Reference

### Docker Commands

```bash
# Build image
docker build -t uqu-production-app:latest .

# Run container
docker run -d -p 3000:3000 --name uqu-web-service uqu-production-app:latest

# Stop container
docker stop uqu-web-service

# Remove container
docker rm uenkins-web-service

# View logs
docker logs uqu-web-service

# List containers
docker ps
```

### Jenkins Commands

```bash
# Start Jenkins
docker run -d -p 8080:8080 -p 50000:50000 --name jenkins-server -v jenkins_home:/var/jenkins_home -v /var/run/docker.sock:/var/run/docker.sock jenkins/jenkins:lts

# Get password
docker exec jenkins-server cat /var/jenkins_home/secrets/initialAdminPassword

# View logs
docker logs jenkins-server

# Stop Jenkins
docker stop jenkins-server

# Remove Jenkins
docker rm jenkins-server
```

### Application Commands

```bash
# Install dependencies
npm install

# Run tests
npm test

# Start application
npm start

# Stop application
Ctrl + C
```

---

## ✅ Verification Checklist

After completing the setup, verify:

- [ ] Docker Desktop is running
- [ ] Jenkins is accessible at http://localhost:8080
- [ ] Jenkins job is configured
- [ ] Pipeline runs successfully
- [ ] Application is accessible at http://localhost:3000
- [ ] All tests pass (10/10)
- [ ] Docker container is running
- [ ] Health check returns 200 OK

---

## 🎓 Next Steps

Once the project is running:

1. **Modify the code:** Edit `src/app.js` or `index.html`
2. **Commit changes:** `git add . && git commit -m "Your message"`
3. **Push to GitHub:** `git push origin main`
4. **Watch Jenkins build:** Jenkins will automatically start a new build
5. **Verify deployment:** Refresh http://localhost:3000 to see changes

---

## 📚 Additional Resources

- **Jenkins Documentation:** https://www.jenkins.io/doc/
- **Docker Documentation:** https://docs.docker.com/
- **Node.js Documentation:** https://nodejs.org/docs/
- **Jest Documentation:** https://jestjs.io/docs/getting-started

---

## 🆘 Need Help?

If you encounter issues:

1. Check the **Troubleshooting** section above
2. Review Jenkins console output
3. Check Docker container logs
4. Verify all prerequisites are installed

---

**End of Quick Start Guide**
