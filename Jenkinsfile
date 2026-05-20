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
                // نسخ الملف مباشرة إلى المجلد الرئيسي المشترك لسهولة قراءته
                sh 'cp index.html /var/jenkins_home/index.html'
                echo 'Deployment completed successfully.'
            }
        }
    }

    post {
        success {
            echo "Pipeline finished successfully. Application is Live!"
        }
        failure {
            echo "Pipeline execution failed."
        }
    }
}
