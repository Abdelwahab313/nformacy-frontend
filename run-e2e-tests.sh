#!/usr/bin/env bash

while [ $# -gt 0 ]; do
  case "$1" in
  --BACKEND_PATH=*)
    BACKEND_PATH="${1#*=}"
    ;;
  --FORCE=*)
    force=true
    ;;
  *)
    echo "${1#*=}"
    printf "***************************\n"
    printf "* Error: Invalid argument.*\n"
    printf "***************************\n"
    exit 1
    ;;
  esac
  shift
done

cypress_path=cypress/integration/
YELLOW='\033[1;33m'
RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m'
if [[ "$filtered_tests" == '' ]] && [[ "${force}" != true ]]; then
  staged_tests=$(git diff --stat --name-only --cached $cypress_path)

  filtered_tests=''
  for test in $staged_tests; do
    if [[ "$test" == *feature ]]; then
      if [[ "$filtered_tests" == '' ]]; then
        filtered_tests=$test
      else
        filtered_tests="${filtered_tests},${test}"
      fi
    fi
  done
fi
if [[ "$filtered_tests" == '' ]] && [[ "${force}" != true ]]; then
  echo -e "${GREEN}No e2e tests found related to files changed since last commit.${NC} ${YELLOW}[Ignored e2e tests]${NC}"
else
  if [[ $BACKEND_PATH ]]; then
    BACKEND_PATH=$BACKEND_PATH
  elif [ -z "$1" ]; then
    echo -e "${GREEN}Whats the backend PATH?${NC}"
    read BACKEND_PATH
  fi

  cd $BACKEND_PATH || { echo -e "${RED}Wrong backend path supplied!${NC}"; exit 1;}
  echo $(pwd)

  if [[ "${force}" == true ]]; then
    echo -e "${GREEN}Running e2e tests.${NC} ${RED}[All e2e tests since force parameter is passed to the script]${NC}"
  else
    echo -e "${GREEN}Running e2e tests.${NC} ${YELLOW}[Only Created and updated e2e files since that last commit]${NC}"
  fi
  echo -e "${YELLOW}Stopping Backend server...${NC}"
  make sandbox-down &>/dev/null || { echo -e "${RED}Wrong backend path supplied!${NC}"; exit 1;}
  echo -e "${YELLOW}Resetting Backend server...${NC}"
  make sandbox-reset &>/dev/null || { echo -e "${RED}Something went wrong while trying to reset backend container!${NC}"; exit 1;}
  echo -e "${YELLOW}Starting Backend server...${NC}"
  make sandbox-up &>/dev/null || { echo -e "${RED}Something went wrong while trying to start backend container!${NC}"; exit 1;}

  cd - &>/dev/null

  if [[ $(lsof -w -n -i tcp:5001) ]]; then
    if [[ "${force}" != true ]]; then
      cypress run --spec $filtered_tests
    else
      cypress run
    fi
  else
    if [[ "${force}" != true ]]; then
      npm run cy:start &>/dev/null &
      echo -e "${GREEN}Test server has started to run e2e tests.${NC}" &
      cypress run --spec $filtered_tests
    else
      npm run cy:start &>/dev/null &
      echo -e "${GREEN}Test server has started to run e2e tests.${NC}" &
      cypress run
    fi
  fi
fi
