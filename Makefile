
deploy-prod:
	echo "********* building docker image"
	docker build -f Dockerfile-prod --tag dashboard:prod .
	echo "********* running docker image"
	docker run -d --name=dashboard -p 80:80 --rm dashboard:prod

dev-image:
	echo "********* building docker image"
	docker build -f Dockerfile-dev --tag dashboard:dev .
	echo "********* running docker image"
	docker run -v ${pwd}:/app -v /app/node_modules -p 80:3000 --rm dashboard:dev
	