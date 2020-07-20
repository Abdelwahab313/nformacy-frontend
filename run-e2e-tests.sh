#!/usr/bin/env bash

if [[  $BACKEND_PATH ]]
then
  BACKEND_PATH=$BACKEND_PATH
elif [ -z "$1" ]
then
  echo "Whats the backend PATH?"
  read BACKEND_PATH
else
    BACKEND_PATH=$1
fi

cd $BACKEND_PATH

make sandbox-down
make sandbox-reset
make sandbox-up

cd -

if [[ $( lsof -w -n -i tcp:5001) ]]
then
  npm test & npm run cy:run
else
  npm test & npm run cy:start & npm run cy:run
fi

