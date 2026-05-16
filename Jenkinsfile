pipeline {
    agent any

    stages {
        stage('Pull Code') {
            steps {
                echo 'Pulling latest code from GitHub...'
            }
        }
        stage('Install Dependencies') {
            steps {
                echo 'Installing packages...'
            }
        }
        stage('Run Tests') {
            steps {
                echo 'Running Automated Tests...'
            }
        }
        stage('Build & Package') {
            steps {
                echo 'Building Docker Image...'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying application to Production...'
            }
        }
    }
}
