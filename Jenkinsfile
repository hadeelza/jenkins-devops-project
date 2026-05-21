pipeline {
    agent any

    environment {
        IMAGE_NAME = 'uqu-production-app'
        CONTAINER_NAME = 'uqu-web-service'
        PORT = '3000'
        NODE_ENV = 'production'
    }

    options {
        // Keep only last 10 builds to save disk space
        buildDiscarder(logRotator(numToKeepStr: '10'))
        // Timeout after 30 minutes
        timeout(time: 30, unit: 'MINUTES')
        // Add timestamps to console output
        timestamps()
    }

    triggers {
        // GitHub webhook trigger (requires GitHub Plugin and webhook setup in GitHub)
        githubPush()
        // Poll SCM every 5 minutes as fallback
        pollSCM('H/5 * * * *')
    }

    stages {
        stage('1. Code Checkout') {
            steps {
                echo '📥 Pulling latest source code from Git Repository...'
                checkout scm
                sh 'git rev-parse HEAD > GIT_COMMIT'
                sh 'git rev-parse --abbrev-ref HEAD > GIT_BRANCH'
                script {
                    env.GIT_COMMIT = readFile('GIT_COMMIT').trim()
                    env.GIT_BRANCH = readFile('GIT_BRANCH').trim()
                }
            }
        }
        
        stage('2. Install Dependencies') {
            steps {
                echo '📦 Installing application dependencies...'
                sh 'npm install'
            }
        }
        
        stage('3. Run Unit Tests') {
            steps {
                echo '🧪 Executing Automated Unit Tests...'
                script {
                    try {
                        sh 'npm test -- --coverage'
                        echo '✅ All tests passed successfully!'
                    } catch (Exception e) {
                        echo '❌ Tests failed! Stopping pipeline.'
                        error('Unit tests failed. Pipeline aborted.')
                    }
                }
            }
            post {
                always {
                    // Publish test results if available
                    junit '**/test-results/junit.xml'
                    // Publish coverage report if available
                    publishHTML([
                        allowMissing: false,
                        alwaysLinkToLastBuild: true,
                        keepAll: true,
                        reportDir: 'coverage',
                        reportFiles: 'index.html',
                        reportName: 'Coverage Report'
                    ])
                }
            }
        }
        
        stage('4. Build Docker Image') {
            steps {
                echo '🐳 Building Production Docker Image...'
                script {
                    dockerImage = docker.build("${IMAGE_NAME}:${env.BUILD_NUMBER}", ".")
                    dockerImage.tag("${IMAGE_NAME}:latest")
                }
            }
        }
        
        stage('5. Security Scan') {
            steps {
                echo '🔒 Running security scan on Docker image...'
                script {
                    try {
                        sh "docker scan ${IMAGE_NAME}:${env.BUILD_NUMBER} || true"
                    } catch (Exception e) {
                        echo '⚠️ Security scan failed or not available, continuing...'
                    }
                }
            }
        }
        
        stage('6. Automated Deployment') {
            steps {
                echo '🚀 Deploying New Version to Production Server...'
                script {
                    try {
                        echo '🛑 Stopping existing container...'
                        sh "docker stop ${CONTAINER_NAME} || true"
                        sh "docker rm ${CONTAINER_NAME} || true"
                        echo '✅ Old container removed successfully.'
                    } catch (Exception e) {
                        echo 'ℹ️ No previous container running. Proceeding to fresh install...'
                    }
                }
        
                echo '🏃 Starting new container...'
                sh "docker run -d -p ${PORT}:3000 --name ${CONTAINER_NAME} --restart unless-stopped ${IMAGE_NAME}:${env.BUILD_NUMBER}"
                
                echo '⏳ Waiting for application to be healthy...'
                sleep(10)
                
                echo '🔍 Verifying deployment...'
                script {
                    def response = sh(
                        script: "curl -f http://localhost:${PORT}/health || exit 1",
                        returnStatus: true
                    )
                    if (response != 0) {
                        error('Health check failed! Deployment verification unsuccessful.')
                    }
                    echo '✅ Health check passed!'
                }
                
                echo "🎉 Deployment Successful! App is live at http://localhost:${PORT}"
            }
        }
        
        stage('7. Smoke Tests') {
            steps {
                echo '🧪 Running smoke tests on deployed application...'
                script {
                    sh "curl -f http://localhost:${PORT}/ > /dev/null"
                    sh "curl -f http://localhost:${PORT}/api/system-info > /dev/null"
                    sh "curl -f http://localhost:${PORT}/health > /dev/null"
                    echo '✅ All smoke tests passed!'
                }
            }
        }
    }
    
    post {
        always {
            echo '🧹 Cleaning up Jenkins Workspace...'
            cleanWs()
        }
        success {
            echo '✅ Pipeline Finished Successfully. All stages passed!'
            script {
                // Send notification (example)
                // emailext subject: "Jenkins Build Success: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                //          body: "Build successful. View at ${env.BUILD_URL}",
                //          to: "team@example.com"
            }
        }
        failure {
            echo '❌ Pipeline Failed. Check the logs above to find the bug!'
            script {
                // Send notification (example)
                // emailext subject: "Jenkins Build Failed: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                //          body: "Build failed. View at ${env.BUILD_URL}",
                //          to: "team@example.com"
            }
        }
        unstable {
            echo '⚠️ Pipeline Unstable. Some tests may have failed.'
        }
    }
}
