pipeline {
    agent any

    tools { nodejs 'nodejs' }
    stages {
        stage('Build dashboard docker image') {
            steps {
                sh 'docker build -f Dockerfile-prod --tag dashboard:prod .'
            }
        }
        stage('Run dashboard container') {
            steps {
                sh 'docker run -d --name=dashboard -p 3000:80 --rm dashboard:prod'
            }
        }
        stage('Pull the backend code') {
            steps {
                checkout([$class                           : 'GitSCM',
                          branches                         : [[name: 'refs/heads/master']],
                          doGenerateSubmoduleConfigurations: false,
                          extensions                       : [[$class: 'RelativeTargetDirectory', relativeTargetDir: 'carrier-backend']],
                          gitTool                          : 'Default',
                          submoduleCfg                     : [],
                          userRemoteConfigs                : [[credentialsId: 'd63b8d7c-17df-488a-ad2d-b7dacacfcd72', url: 'https://github.com/DevSquads/carrier-backend.git']]
                ])

            }
        }
        stage('Build backend docker images') {
            steps {
                dir('carrier-backend') {
                    sh 'make build_no_cache'
                }
            }
        }
        stage('Run backend docker images') {
            steps {
                dir('carrier-backend') {
                    sh 'make up_detach'
                }
            }
        }
        stage('Loading db seed for test') {
            steps {
                dir('carrier-backend') {
                    sleep 60
                    sh 'make load-seed'
                }
            }
        }
        stage('Run tests') {
            steps {
                sh 'cypress run'
            }
        }
    }
    post {
        always {
            echo 'Deleting all containers'
            sh 'docker container rm -f $(docker container ls -a -q)'
            echo 'Deleting all Volumes'
            sh ' docker volume rm -f $(docker volume ls -q)'
            echo "clean "
        }
        failure {
            mail to: 'moessam@devsquads.com',
                    subject: "Failed Pipeline: ${currentBuild.fullDisplayName}",
                    body: "Something is wrong with ${env.BUILD_URL}"
        }
    }
}
