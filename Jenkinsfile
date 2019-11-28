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
                sh 'npm test -- -u'
            }
        }
    }
    post {
        always {
            echo "clean "
        }
    }
}
