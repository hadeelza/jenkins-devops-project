const express = require('express');
const path = require('path');
const app = express();

// Serve static files
app.use(express.static(path.join(__dirname, '../')));

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

// Main dashboard endpoint - serves the HTML page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
});

// API: System Information
app.get('/api/system-info', (req, res) => {
    res.status(200).json({
        project: "Automated CI/CD System",
        institution: "UQU",
        engine: "Node.js",
        orchestration: "Jenkins & Docker Containers",
        environment: "Production-Grade",
        version: "2.0.0",
        buildDate: new Date().toISOString()
    });
});

// API: Pipeline Status
app.get('/api/pipeline-status', (req, res) => {
    res.status(200).json({
        stages: [
            { name: 'Code Checkout', status: 'completed', duration: '2s' },
            { name: 'Install Dependencies', status: 'completed', duration: '15s' },
            { name: 'Run Unit Tests', status: 'completed', duration: '8s' },
            { name: 'Build Docker Image', status: 'completed', duration: '45s' },
            { name: 'Automated Deployment', status: 'completed', duration: '10s' }
        ],
        overallStatus: 'success',
        totalDuration: '80s'
    });
});

// API: Deployment Metrics
app.get('/api/metrics', (req, res) => {
    res.status(200).json({
        totalDeployments: 42,
        successfulDeployments: 40,
        failedDeployments: 2,
        averageBuildTime: '75s',
        uptime: '99.9%',
        lastDeployment: new Date().toISOString()
    });
});

// API: Get Build Info
app.get('/api/build-info', (req, res) => {
    res.status(200).json({
        buildNumber: process.env.BUILD_NUMBER || '42',
        buildId: process.env.BUILD_ID || 'jenkins-42',
        branch: process.env.GIT_BRANCH || 'main',
        commit: process.env.GIT_COMMIT || 'abc123',
        jenkinsUrl: process.env.JENKINS_URL || 'http://localhost:8080'
    });
});

// API: Test Results
app.get('/api/test-results', (req, res) => {
    res.status(200).json({
        totalTests: 15,
        passed: 15,
        failed: 0,
        skipped: 0,
        coverage: '95%',
        duration: '8s'
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        error: 'Not Found',
        message: 'The requested resource was not found on this server'
    });
});

module.exports = app;

if (require.main === module) {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`🚀 Production Server running on port ${PORT}`);
        console.log(`📊 Dashboard available at http://localhost:${PORT}`);
        console.log(`🔍 Health check at http://localhost:${PORT}/health`);
    });
}
