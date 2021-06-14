
rm -rf build.zip build/       
npm run build:prod
zip -vr build.zip build/

ssh -i ~/.ssh_keys/frontend_nformacy.pem  ec2-user@52.40.51.201 'rm -rf frontend/build frontend/build.zip'

scp -i ~/.ssh_keys/frontend_nformacy.pem build.zip ec2-user@52.40.51.201:frontend

ssh -i ~/.ssh_keys/frontend_nformacy.pem  ec2-user@52.40.51.201 'docker stop nformacyUI'       
ssh -i ~/.ssh_keys/frontend_nformacy.pem  ec2-user@52.40.51.201 'cd frontend && unzip build.zip &&  make deploy-nginx'

