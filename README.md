####Note: Before running locally do the following command in order for the prehook to work**
##### `export BACKEND_PATH="your/local/path/to/medad_backend"`
## For running the application in docker

### `Build and run docker image in production mode`

run command

`$ docker build -f Dockerfile-prod --tag dashboard:prod .`

`$ docker run -d --name=dashboard -p 80:80 --rm dashboard:prod`

### `Build and run docker image in development mode`

run command

`$docker build -f Dockerfile-dev --tag dashboard:dev .`

`$docker run -v ${PWD}:/app -v /app/node_modules -p 80:3000 --rm dashboard:dev`

## Deployment


* `ssh root@68.183.110.10`

###### Backend
* `cd Application/medad-backend`
* `git pull`
* `make destroy`
* `make build-no-cache`
* `make up-detach`
* `make db-reset`

###### Frontend
* `cd Application/medad-frontend`
* `git pull`
* `docker stop dashboard`
* `make deploy-prod`



## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm cy:run`

Launches cucmber tests.

### `npm lint`

Launches the eslint code check.

### `npm format`

Launches prettier code formation.

### `npm build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.



### To set up the IDE properly
 we use absolute import you can check this [Link](https://medium.com/hackernoon/absolute-imports-with-create-react-app-4c6cfb66c35d)
