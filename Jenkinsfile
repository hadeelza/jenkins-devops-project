pipeline {
    agent any

    stages {
        stage('Code Checkout') {
            steps {
                echo 'Pulling latest source code from Git repository...'
                checkout scm
            }
        }

        stage('Automated Deployment') {
            steps {
                echo 'Deploying application to web server production environment...'
                // هذا الأمر يضمن كتابة الملف وتحديثه مباشرة في مسار العرض بدون الحاجة لاستدعاء أمر دوكر المعزول
                sh 'mkdir -p /var/jenkins_home/war && cp index.html /var/jenkins_home/war/index.html'
                echo 'Deployment completed successfully.'
            }
        }
    }

    post {
        success {
            echo "Pipeline finished successfully. Application v1.1.0 is Live!"
        }
        failure {
            echo "Pipeline execution failed. Check console output for debugging."
        }
    }
}
