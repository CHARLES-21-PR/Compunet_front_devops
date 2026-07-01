pipeline {
    agent any

    environment {
        // Reemplaza con la IP pública real de tu MV de Frontend
        IP_PROD = '18.116.65.172'
        USER_AWS = 'ubuntu'
        // Credencial SSH guardada en Jenkins
        SSH_CRED_ID = 'aws-pem-front' 
        RUTA_DESTINO = '/var/www/html/compunet-frontend'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Instalar y Compilar Frontend') {
            steps {
                // Instala paquetes de Node y genera la carpeta de producción (dist o build)
                sh 'npm install'
                sh 'npm run build' 
            }
        }

        stage('Desplegar a AWS (Producción)') {
            steps {
                sshagent(credentials: [env.SSH_CRED_ID]) {
                    // Sincroniza únicamente la carpeta compilada (ajusta 'dist' por 'build' si usas Create React App)
                    sh "rsync -avz --delete ./dist/ ${env.USER_AWS}@${env.IP_PROD}:${env.RUTA_DESTINO}"
                }
            }
        }
    }
}