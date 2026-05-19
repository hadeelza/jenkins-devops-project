pipeline {
    agent any

    environment {
        CONTAINER_NAME = 'uqu-live-app'
        PORT = '3000'
    }

    stages {
        stage('Code Checkout') {
            steps {
                echo 'Pulling latest source code from Git repository...'
                checkout scm
            }
        }

        stage('Automated Deployment') {
            steps {
                echo 'Updating production environment dynamically...'
                script {
                    try {
                        sh "docker stop ${CONTAINER_NAME}"
                        sh "docker rm ${CONTAINER_NAME}"
                        echo "Previous container removed successfully."
                    } catch (Exception e) {
                        echo "No active container found. Proceeding with fresh installation."
                    }
                    
                    sh "docker run -d -p ${PORT}:80 --name ${CONTAINER_NAME} nginx:alpine"
                    sh "docker cp index.html ${CONTAINER_NAME}:/usr/share/nginx/html/index.html"
                }
                echo "Deployment completed successfully."
            }
        }
    }

    post {
        success {
            echo "Pipeline finished successfully. Application is live at http://localhost:${PORT}"
        }
        failure {
            echo "Pipeline execution failed. Check console output for debugging."
        }
    }
}
