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
                echo 'Deploying application dynamically to Nginx container...'
                // هذا السطر السحري يفرغ محتوى الملف القديم ويحقن الكود الجديد داخل السيرفر تلقائياً
                sh 'docker exec -u root uqu-live-app sh -c "cat /var/jenkins_home/workspace/uqu-pipeline/index.html > /usr/share/nginx/html/index.html"'
                echo 'Deployment completed successfully.'
            }
        }
    }

    post {
        success {
            echo "Pipeline finished successfully. Application is dynamically updated!"
        }
        failure {
            echo "Pipeline execution failed."
        }
    }
}
