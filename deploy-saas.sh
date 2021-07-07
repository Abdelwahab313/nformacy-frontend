serverIp="18.237.74.26"
sshKey="~/.ssh_keys/saas-beta.pem"

rm -rf build.zip build/       
npm run build:prod
zip -vr build.zip build/

ssh -i $sshKey  ec2-user@$serverIp 'rm -rf frontend/build frontend/build.zip'

scp -i $sshKey build.zip ec2-user@$serverIp:frontend

ssh -i $sshKey ec2-user@$serverIp 'docker stop nformacyUI'       
ssh -i $sshKey ec2-user@$serverIp 'cd frontend && unzip build.zip &&  make deploy-staging'

