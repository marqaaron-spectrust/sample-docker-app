#!/bin/bash

echo "--------- Python Server Startup Logs -----------"

echo "Exporting VERSION from file"
export VERSION=$(cat /env/version)

echo "Making /usr/src directory"
mkdir -p /usr/src

echo "Making /usr/src/app directory"
mkdir -p /usr/src/app

echo "Making /usr/src/app/static directory"
mkdir -p /usr/src/app/static

echo "Moving build files from /ui/app/dist to /usr/src/app/static"
mv /ui/app/dist/* /usr/src/app/static

echo "Moving Python Web App saul.py from /server/python_config to /usr/src/app"
mv /server/python_config/sampleApp.py /usr/src/app

echo "Bringing Up Python Web App saul.py"
python3 /usr/src/app/sampleApp.py