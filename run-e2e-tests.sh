#!/usr/bin/env bash

BACKEND_PATH="/Users/devsquads/projects/medad/medad-server"

cd $BACKEND_PATH

make sandbox-down
make sandbox-reset
make sandbox-up
