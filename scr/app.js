const express = require('express');
const app = express();

// ممر ترحيبي رئيسي لواجهة النظام
app.get('/', (req, res) => {
    res.status(200).send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>UQU DevOps Production System</title>
            <style>
                body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f7f6; color: #333; text-align: center; padding: 50px; }
                .container { background: white; padding: 40px; border-radius: 10px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); display: inline-block; max-width: 60px0px; }
                h1 { color: #8C1D40; }  
                .status { display: inline-block; padding: 10px 20px; background-color: #2ecc71; color: white; border-radius: 20px; font-weight: bold; margin-top: 20px; }
                .version { color: #7f8c8d; font-size: 0.9em; margin-top: 10px; }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>UQU Enterprise DevOps Pipeline 🚀</h1>
                <p>This application was compiled, tested, and deployed fully automatically using Jenkins & Docker.</p>
                <div class="status">SYSTEM STATUS: LIVE & STABLE</div>
                <div class="version">Application Version: 1.1.0 (Production)</div>
            </div>
        </body>
        </html>
    `);
});

 
app.get('/api/system-info', (req, res) => {
    res.status(200).json({
        project: "Automated CI/CD System",
        institution: "UQU",
        engine: "Node.js",
        orchestration: "Jenkins & Docker Containers",
        environment: "Production-Grade"
    });
});

module.exports = app;

 
if (require.main === module) {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`🚀 Production Server running on port ${PORT}`);
    });
}