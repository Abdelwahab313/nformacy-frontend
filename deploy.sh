
rm -rf build.zip build/       
npm run build:prod
zip -vr build.zip build/

ssh -i ~/ssh_keys/frontend-machine.pem  ec2-user@35.161.116.65 'rm -rf frontend/build frontend/build.zip'

scp -i ~/ssh_keys/frontend-machine.pem build.zip ec2-user@35.161.116.65:frontend

ssh -i ~/ssh_keys/frontend-machine.pem  ec2-user@35.161.116.65 'docker stop nformacyUI'       
ssh -i ~/ssh_keys/frontend-machine.pem  ec2-user@35.161.116.65 'cd frontend && unzip build.zip &&  make deploy-nginx'

