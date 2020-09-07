/* groovylint-disable CompileStatic, NestedBlockDepth */
// Example Jenkins pipeline with Cypress end-to-end tests running in parallel on 2 workers
// Pipeline syntax from https://jenkins.io/doc/book/pipeline/

// Setup:
//  before starting Jenkins, I have created several volumes to cache
//  Jenkins configuration, NPM modules and Cypress binary

// docker volume create jenkins-data
// docker volume create npm-cache
// docker volume create cypress-cache

// Start Jenkins command line by line:
//  - run as "root" user (insecure, contact your admin to configure user and groups!)
//  - run Docker in disconnected mode
//  - name running container "blue-ocean"
//  - map port 8080 with Jenkins UI
//  - map volumes for Jenkins data, NPM and Cypress caches
//  - pass Docker socket which allows Jenkins to start worker containers
//  - download and execute the latest BlueOcean Docker image

// docker run \
//   -u root \
//   -d \
//   --name blue-ocean \
//   -p 8080:8080 \
//   -v jenkins-data:/var/jenkins_home \
//   -v npm-cache:/root/.npm \
//   -v cypress-cache:/root/.cache \
//   -v /var/run/docker.sock:/var/run/docker.sock \
//   jenkinsci/blueocean:latest

// If you start for the very first time, inspect the logs from the running container
// to see Administrator password - you will need it to configure Jenkins via localhost:8080 UI
//    docker logs blue-ocean

pipeline {
  agent any
  tools { nodejs 'nodejs' }
  environment {
    BackendPath = '/var/lib/jenkins/workspace/sandbox-backend'
  }
  stages {
    // first stage installs node dependencies and Cypress binary
    stage('build') {
      parallel {
        stage('Build front end') {
          steps {
            echo "Running build ${env.BUILD_ID} on ${env.JENKINS_URL}"
            sh 'npm ci'
            sh 'rm -rf cypress/screenshots'
            sh 'npm run cy:verify'
            sh 'nohup npm run cy:start &'

          }
        }
        stage('Setup sandbox backend') {
          steps {
            echo '-- Fetch Backend'
            sh "mkdir -p ${env.BackendPath}"
            dir("${env.BackendPath}") {
              git(
                  branch: 'master',
                  credentialsId: 'gitlab_abdo',
                  url: 'https://gitlab.com/devsquads.egy/meddad.git'
                )
            }
            dir("${env.BackendPath}") {
              sh 'make sandbox-build'
              sh 'make sandbox-up'
              // wait for docker to setup
              sh './wait-for-it.sh localhost:3001 -- echo "Sandbox is up"'
              sh 'make sandbox-setup'
            }
          }
        // post { always { junit '**/TEST-*.xml'  } }
        }
      }
    }

    // this stage runs end-to-end tests, and each agent uses the workspace
    // from the previous stage
    stage('cypress run tests') {
      environment {
        // because parallel steps share the workspace they might race to delete
        // screenshots and videos folders. Tell Cypress not to delete these folders
        CYPRESS_trashAssetsBeforeRuns = 'false'
      }

      steps {
        dir("${env.BackendPath}") {
          // wait for npm start to
          sh './wait-for-it.sh localhost:5001 -- echo "Sandbox is up"'
        }
        echo "Running build ${env.BUILD_ID}"
        sh 'npm run cy:run'
      }
    }

    stage('deploy to production') {
      when {
        branch 'production'
      }
      steps {
        // start local server in the background
        // we will shut it down in "post" command block
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
