deploy-build-ui:
	echo "********* building docker image"
	docker build -f Dockerfile-prod --tag nformacyui:prod .
	echo "********* running docker image"
	docker run -d --name=nformacyUI -p 80:80 --rm nformacyui:prod

deploy-nginx:
	echo "********* building docker image"
	docker build -f Dockerfile-nginx --tag nformacyui:prod .
	echo "********* running docker image"
	docker run -d --name=nformacyUI -p 80:80 -p 443:443 --rm nformacyui:prod



deploy-staging:
	echo "********* building docker image"
	docker build -f Dockerfile-nginx-staging --tag nformacyui:prod .
	echo "********* running docker image"
	docker run -d --name=nformacyUI -p 80:80 -p 443:443 --rm nformacyui:prod