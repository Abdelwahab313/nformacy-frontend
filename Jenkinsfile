pipeline {
    agent any

    tools {nodejs 'nodejs'}
    stages {
        stage('install npm packages') {
                steps {
                          sh 'npm i'
                    }
                }
         stage('start npm server if not running') {
                 steps {
                           sh './node_modules/.bin/pm2 start npm -- stop'
                           sh './node_modules/.bin/pm2 start npm -- start'
                     }
                 }
        stage('installation') {
            steps {
                    checkout([$class: 'GitSCM',
                                    branches: [[name: 'refs/heads/master']],
                                    doGenerateSubmoduleConfigurations: false,
                                    extensions: [[$class: 'RelativeTargetDirectory', relativeTargetDir: 'carrier-backend']],
                                    gitTool: 'Default',
                                    submoduleCfg: [],
                                    userRemoteConfigs: [[credentialsId: 'd63b8d7c-17df-488a-ad2d-b7dacacfcd72', url: 'https://github.com/DevSquads/carrier-backend.git']]
                                    ])

            }
        }
       stage('build backend docker images') {
        steps {
                dir('carrier-backend') {
                    sh 'docker-compose build --no-cache'
                    sh 'docker-compose up -d'
                    sh 'make load-seed'
                }
            }
        }
       stage('run tests') {
        steps {
                  sh 'pwd'
                  sh './node_modules/.bin/cypress run test'
            }
        }
    }
    post {
        always {
            echo "clean "
        }
    }
}
