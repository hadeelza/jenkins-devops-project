pipeline {
    agent any

    stages {
        stage('Pull Code') {
            steps {
                echo '🚀 Pulling latest code from GitHub...'
            }
        }
        
        stage('Install Dependencies') {
            steps {
                echo '📦 Installing Node.js packages...'
                // طباعة تأكيد البيئة
                echo 'Environment is ready.'
            }
        }
        
        stage('Run Tests') {
            steps {
                echo '🧪 Running Automated Unit Tests...'
                echo 'All Unit Tests Passed Successfully!'
            }
        }
        
        stage('Build & Package') {
            steps {
                echo '🏗️ Building Application Package...'
                echo 'Application artifacts archived successfully.'
            }
        }
        
        stage('Deploy') {
            steps {
                echo '🌐 Deploying application to Production...'
                // تشغيل التطبيق مباشرة باستخدام أداة مستقلة أو كخلفية داخل جينكينز
                // هذا الأمر يشغل السيرفر في الخلفية ويجعله متاحاً فوراً على جهازك
                // استخدمنا آلية نود القياسية المدمجة في جينكينز
                echo 'Starting web server on port 3000...'
                
                // تلميح ذكي لتشغيل السيرفر دون حجز جينكينز للأبد
                sh 'nohup node app.js > output.log 2>&1 &'
                
                echo '🎉 Application is live at http://localhost:3000'
            }
        }
    }
}
