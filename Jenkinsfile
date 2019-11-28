pipeline {
    agent any

    tools {nodejs 'nodejs'}
    stages {
        stage('installation') {
            steps {
                echo "install node modules "
                sh 'npm install'
            }
        }
        stage('Run test') {
            steps {
                sh 'CI=true react-scripts test'
            }
        }
    }
    post {
        always {
            echo "clean "
        }
    }
}
