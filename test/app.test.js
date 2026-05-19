const request = require('supertest');
const app = require('../src/app');

describe(' QA Automated Production Tests', () => {
    
    it('Should return 200 OK and HTML for the main dashboard', async () => {
        const res = await request(app).get('/');
        expect(res.statusCode).toEqual(200);
    });

    it('Should return 200 OK and valid JSON for system-info API', async () => {
        const res = await request(app).get('/api/system-info');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('institution', 'UQU');
    });
});