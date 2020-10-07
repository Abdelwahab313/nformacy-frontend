#!/usr/bin/env bash

cypress_path=cypress/integration/
force=$2
YELLOW='\033[1;33m'
GREEN='\033[0;32m'
NC='\033[0m'
staged_tests=$(git diff --stat --name-only --cached cypress/integration)

filtered_tests=''
for test in $staged_tests
do
  if [[ "$test" == *feature ]]
    then
      if [[ "$filtered_tests" == '' ]]
      then
        filtered_tests=$test
      else
          filtered_tests="${filtered_tests},${test}"
      fi
  fi
done

if [[ "$filtered_tests" == '' ]] &&  [[ "${force}" != "force" ]]
then
  echo -e "${GREEN}No e2e tests found related to files changed since last commit.${NC} ${YELLOW}[Ignored e2e tests]${NC}"
  echo -e "${GREEN}Starting unit tests...${NC}"
  npm run test:nowatch
else
  if [[  $BACKEND_PATH ]]
  then
    BACKEND_PATH=$BACKEND_PATH
  elif [ -z "$1" ]
  then
    echo -e "${GREEN}Whats the backend PATH?${NC}"
    read BACKEND_PATH
  else
      BACKEND_PATH=$1
  fi

  cd $BACKEND_PATH

  echo -e "${GREEN}Running e2e tests.${NC} ${YELLOW}[Created and updates e2e files not old ones]${NC}"

  echo -e "${YELLOW}Stopping Backend server...${NC}"
  make sandbox-down &> /dev/null
  echo -e "${YELLOW}Resetting Backend server...${NC}"
  make sandbox-reset &> /dev/null
  echo -e "${YELLOW}Starting Backend server...${NC}"
  make sandbox-up &> /dev/null

  cd - &> /dev/null
  echo -e "${GREEN}Starting unit tests...${NC}"
  if [[ $( lsof -w -n -i tcp:5001) ]]
     then
       if [[ "${force}" != "force" ]]
       then
         npm run test:nowatch & cypress run --spec $filtered_tests
        else
         npm run test:nowatch & cypress run
        fi
  else
    if [[ "${force}" != "force" ]]
       then
          npm run test:nowatch & npm run cy:start &> /dev/null & echo -e "${GREEN}Test server has started to run e2e tests.${NC}" & cypress run --spec $filtered_tests
        else
          npm run test:nowatch & npm run cy:start &> /dev/null & echo -e "${GREEN}Test server has started to run e2e tests.${NC}" & cypress run
        fi
  fi
fi
