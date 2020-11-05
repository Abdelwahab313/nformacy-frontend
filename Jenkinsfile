pipeline {
  agent any
  tools { nodejs 'nodejs' }
  environment {
    BackendPath = '/var/lib/jenkins/workspace/sandbox-backend'
  }
  stages {
    // first stage build both front end and backend code
    stage('build') {
      parallel {
        stage('Build front end') {
          steps {
            sh 'rm -rf cypress/screenshots'
            echo "Building Front end code"
            sh 'npm i -g serve'
            sh 'npm ci'
            sh 'npm run cy:verify'
            sh 'REACT_APP_ENV=e2e npm run build'
            sh 'nohup serve -s build -l 5001 &'

            dir("${env.BackendPath}") {
              // wait for npm start to
              sh './wait-for-it.sh localhost:5001 -- echo "Sandbox is up"'
            }
          }
        }
        stage('Setup sandbox backend') {
          steps {
            echo '-- Fetch Backend'
            sh "mkdir -p ${env.BackendPath}"
            // get port for jenkins nor ro be built
            dir("${env.BackendPath}") {
              git(
                  branch: 'master',
                  credentialsId: 'gitlab_abdo',
                  url: 'https://gitlab.com/devsquads.egy/meddad.git'
                )
            }
            echo '-- Build Backend sandbox'
            dir("${env.BackendPath}") {
              sh 'make sandbox-build'
              sh 'make sandbox-reset'
              sh 'make sandbox-up'
              // wait for docker to load
              sh './wait-for-it.sh localhost:3001 -- echo "Sandbox is up"'
            }
          }
        }
      }
    }

    // this stage runs end-to-end tests, and each agent uses the workspace
    stage('cypress run tests') {
      environment {
        // because parallel steps share the workspace they might race to delete
        // screenshots and videos folders. Tell Cypress not to delete these folders
        CYPRESS_trashAssetsBeforeRuns = 'false'
      }

      steps {
        echo "Running e2e Front end tests"
        sh 'npm run cy:ci'
      }
    }

    stage('deploy to production') {
      when {
        branch 'production'
      }
      steps {
        echo '---------------------> deployment <<<++++++++++++++++++'
      }
    }
  }

  post {
    always {
      junit 'cypress/results/*.xml'
      script {
          if (fileExists('cypress/screenshots')) {
              archiveArtifacts artifacts: 'cypress/screenshots/**/*.png'
          }
      }

      echo 'stop server'
      dir("${env.BackendPath}") {
        sh 'make sandbox-down'
      }
    }
  }
}
