# 🔗 GitHub & Jenkins Integration Guide

## 📋 Overview
This guide explains how to set up automatic Jenkins builds triggered by GitHub pushes.

## 🚀 Setup Instructions

### Step 1: Install Required Jenkins Plugins

1. Open Jenkins Dashboard
2. Go to **Manage Jenkins** → **Plugins**
3. Install these plugins:
   - **GitHub Plugin**
   - **Git Plugin**
   - **GitHub Branch Source Plugin** (optional, for advanced features)

### Step 2: Configure Jenkins GitHub Integration

1. Go to **Manage Jenkins** → **Configure System**
2. Scroll to **GitHub** section
3. Click **Add GitHub Server**
4. Configure:
   - **Name**: GitHub
   - **API URL**: `https://api.github.com`
   - **Credentials**: Add GitHub Personal Access Token
     - Generate token at: https://github.com/settings/tokens
     - Required scopes: `repo`, `admin:repo_hook`
5. Click **Test connection** to verify
6. Save configuration

### Step 3: Configure Jenkins Job

1. Create or edit your Pipeline job
2. In **Build Triggers** section, check:
   - ✅ **GitHub hook trigger for GITScm polling**
3. In **Pipeline** section:
   - **Definition**: Pipeline script from SCM
   - **SCM**: Git
   - **Repository URL**: Your GitHub repository URL
   - **Script Path**: Jenkinsfile
4. Save the job

### Step 4: Configure GitHub Webhook

1. Go to your GitHub repository
2. Click **Settings** → **Webhooks**
3. Click **Add webhook**
4. Configure:
   - **Payload URL**: `http://YOUR_JENKINS_URL/github-webhook/`
     - Example: `http://jenkins.example.com:8080/github-webhook/`
     - For local Jenkins: Use ngrok or similar tunneling service
   - **Content type**: `application/json`
   - **Secret**: (Optional) Add a secret for security
5. In **Which events would you like to trigger this webhook?**:
   - ✅ **Just the push event**
   - Or select specific events as needed
6. Click **Add webhook**

### Step 5: Test the Integration

1. Make a small change to your code
2. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Test webhook trigger"
   git push origin main
   ```
3. Check Jenkins:
   - The build should start automatically
   - You'll see a new build in the job's build history

## 🔧 Alternative: Poll SCM (Fallback)

If webhooks don't work, Jenkins can poll GitHub periodically:

The Jenkinsfile already includes:
```groovy
triggers {
    pollSCM('H/5 * * * *')  // Check every 5 minutes
}
```

This checks for changes every 5 minutes and triggers a build if new commits are found.

## 🌐 Local Jenkins with GitHub (Using ngrok)

If running Jenkins locally:

1. Install ngrok: https://ngrok.com/
2. Expose Jenkins:
   ```bash
   ngrok http 8080
   ```
3. Use the ngrok URL in GitHub webhook:
   - Payload URL: `https://RANDOM.ngrok.io/github-webhook/`

## 🔒 Security Best Practices

1. **Use HTTPS** for production Jenkins
2. **Add webhook secret** in GitHub and configure in Jenkins
3. **Restrict Jenkins access** with authentication
4. **Use GitHub branch protection** for main branch
5. **Limit webhook events** to necessary ones only

## 📊 Verify Webhook Delivery

1. In GitHub repository → Settings → Webhooks
2. Click on your webhook
3. Scroll to **Recent Deliveries**
4. You can see:
   - Response status (200 = success)
   - Request payload
   - Response details

## 🐛 Troubleshooting

### Webhook not triggering builds:

1. **Check Jenkins logs**:
   - Manage Jenkins → System Log
   - Look for GitHub webhook errors

2. **Verify webhook URL**:
   - Ensure URL ends with `/github-webhook/`
   - Check Jenkins is accessible from GitHub

3. **Check GitHub webhook delivery**:
   - View recent deliveries in GitHub webhook settings
   - Look for error responses

4. **Verify Jenkins plugin**:
   - Ensure GitHub Plugin is installed
   - Check plugin version is up to date

5. **Test with Poll SCM**:
   - If webhook fails, pollSCM will still work as fallback

### Build starts but fails:

1. **Check Jenkins console output** for errors
2. **Verify Jenkins has access to GitHub** (credentials)
3. **Ensure Jenkins can run Docker** (if using Docker)

## 📝 Jenkinsfile Triggers Explained

```groovy
triggers {
    // GitHub webhook trigger - instant build on push
    githubPush()
    
    // Poll SCM fallback - checks every 5 minutes
    pollSCM('H/5 * * * *')
}
```

- `githubPush()`: Triggers build immediately when GitHub sends webhook
- `pollSCM('H/5 * * * *')`: Checks for changes every 5 minutes (Cron syntax)

## 🎯 Best Practices

1. **Use webhooks** for instant feedback
2. **Keep pollSCM** as fallback for reliability
3. **Monitor webhook deliveries** in GitHub
4. **Test integration** before production use
5. **Document your setup** for team reference

## 📚 Additional Resources

- [Jenkins GitHub Plugin Documentation](https://plugins.jenkins.io/github/)
- [GitHub Webhooks Documentation](https://docs.github.com/en/developers/webhooks-and-events/webhooks)
- [Jenkins Pipeline Syntax](https://www.jenkins.io/doc/book/pipeline/syntax/)
