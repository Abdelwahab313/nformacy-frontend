

deploy-beta:
	echo "********* building docker image"
	docker build -f Dockerfile-nginx-beta --tag nformacyui:prod .
	echo "********* running docker image"
	docker run -d --name=nformacyUI -p 80:80 -p 443:443 --rm nformacyui:prod



deploy-whitelabel:
	echo "********* building docker image"
	docker build -f Dockerfile-nginx-whitelabel --tag nformacyui:prod .
	echo "********* running docker image"
	docker run -d --name=nformacyUI -p 80:80 -p 443:443 --rm nformacyui:prod