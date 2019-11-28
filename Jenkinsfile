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
                sh 'CI=true ./node_modules/react-scripts/bin/react-scripts.js test "-u"'
            }
        }
    }
    post {
        always {
            echo "clean "
        }
    }
}
