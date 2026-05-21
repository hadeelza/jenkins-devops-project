const request = require('supertest');
const app = require('../src/app');

describe('UQU DevOps CI/CD Application Tests', () => {
    
    describe('Health Check Endpoint', () => {
        it('Should return 200 OK and health status', async () => {
            const res = await request(app).get('/health');
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('status', 'healthy');
            expect(res.body).toHaveProperty('timestamp');
            expect(res.body).toHaveProperty('uptime');
        });
    });

    describe('Main Dashboard Endpoint', () => {
        it('Should return 200 OK and HTML for the main dashboard', async () => {
            const res = await request(app).get('/');
            expect(res.statusCode).toEqual(200);
            expect(res.headers['content-type']).toContain('text/html');
        });
    });

    describe('System Info API', () => {
        it('Should return 200 OK and valid JSON for system-info API', async () => {
            const res = await request(app).get('/api/system-info');
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('project');
            expect(res.body).toHaveProperty('institution', 'UQU');
            expect(res.body).toHaveProperty('engine');
            expect(res.body).toHaveProperty('orchestration');
            expect(res.body).toHaveProperty('version');
        });
    });

    describe('Pipeline Status API', () => {
        it('Should return 200 OK and pipeline stages information', async () => {
            const res = await request(app).get('/api/pipeline-status');
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('stages');
            expect(res.body).toHaveProperty('overallStatus');
            expect(res.body).toHaveProperty('totalDuration');
            expect(Array.isArray(res.body.stages)).toBe(true);
        });

        it('Should have all required pipeline stages', async () => {
            const res = await request(app).get('/api/pipeline-status');
            const stageNames = res.body.stages.map(s => s.name);
            expect(stageNames).toContain('Code Checkout');
            expect(stageNames).toContain('Install Dependencies');
            expect(stageNames).toContain('Run Unit Tests');
            expect(stageNames).toContain('Build Docker Image');
            expect(stageNames).toContain('Automated Deployment');
        });
    });

    describe('Deployment Metrics API', () => {
        it('Should return 200 OK and deployment metrics', async () => {
            const res = await request(app).get('/api/metrics');
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('totalDeployments');
            expect(res.body).toHaveProperty('successfulDeployments');
            expect(res.body).toHaveProperty('failedDeployments');
            expect(res.body).toHaveProperty('averageBuildTime');
            expect(res.body).toHaveProperty('uptime');
        });
    });

    describe('Build Info API', () => {
        it('Should return 200 OK and build information', async () => {
            const res = await request(app).get('/api/build-info');
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('buildNumber');
            expect(res.body).toHaveProperty('buildId');
            expect(res.body).toHaveProperty('branch');
            expect(res.body).toHaveProperty('commit');
            expect(res.body).toHaveProperty('jenkinsUrl');
        });
    });

    describe('Test Results API', () => {
        it('Should return 200 OK and test results', async () => {
            const res = await request(app).get('/api/test-results');
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('totalTests');
            expect(res.body).toHaveProperty('passed');
            expect(res.body).toHaveProperty('failed');
            expect(res.body).toHaveProperty('skipped');
            expect(res.body).toHaveProperty('coverage');
            expect(res.body).toHaveProperty('duration');
        });
    });

    describe('404 Handler', () => {
        it('Should return 404 for non-existent routes', async () => {
            const res = await request(app).get('/non-existent-route');
            expect(res.statusCode).toEqual(404);
            expect(res.body).toHaveProperty('error', 'Not Found');
            expect(res.body).toHaveProperty('message');
        });
    });

    describe('API Response Formats', () => {
        it('Should return JSON content-type for API endpoints', async () => {
            const endpoints = [
                '/api/system-info',
                '/api/pipeline-status',
                '/api/metrics',
                '/api/build-info',
                '/api/test-results',
                '/health'
            ];

            for (const endpoint of endpoints) {
                const res = await request(app).get(endpoint);
                expect(res.headers['content-type']).toContain('application/json');
            }
        });
    });
});
