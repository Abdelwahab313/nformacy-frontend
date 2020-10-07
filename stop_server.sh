C=$(lsof -i tcp:$1 | grep LISTEN)
GREEN='\033[1;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[1;36m'
NC='\033[0m'
PID=$(echo $C | awk '{print $2}')
if [[ -z "$PID" ]]
then
  echo "${RED}No test is server running.${NC} ${YELLOW}[skipped closing test server after commit]${NC}"
else
   echo -e "${BLUE}Stopping test server...${NC}"
    kill -9 $PID
    echo "${GREEN}Stopped node server on port:${NC} ${1} ${YELLOW}[stopped test server after commit]${NC}"
fi
