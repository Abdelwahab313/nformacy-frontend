#!/usr/bin/env bash

serverIp="100.20.65.60"
sshKey="~/.ssh_keys/nformacy-staging-ui.pem"


if [[ $1 == "saas" ]]; then
    buildScript="npm run build:staging-saas"
    site="whitelabel.nformacy"
else
    buildScript="npm run build:staging-beta"
    site="beta.nformacy"
fi

rm -rf build.zip build/   
$buildScript    
zip -vr build.zip build/

ssh -i $sshKey  ubuntu@$serverIp "sudo rm -rf /var/www/$site/build.zip"

scp -i $sshKey build.zip ubuntu@$serverIp:/var/www/$site

ssh -i $sshKey ubuntu@$serverIp "cd /var/www/$site && unzip build.zip && mv html html-old && mv build html && rm -rf html-old"

