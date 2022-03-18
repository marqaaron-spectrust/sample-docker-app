#!/bin/bash

echo "--------- Base Image Logs -----------"

echo "Installing required packages"
apk add --no-cache python3 py3-pip

echo "Installing required python packages"
  pip install --no-cache-dir -r /server/python_config/requirements.txt

echo "Moving to root directory"
cd /

echo "Changing /build/intermediateImage.sh file to executable"
chmod +x /build/intermediateImage.sh

echo "Changing /server/startup.sh file to executable"
chmod +x /server/startupPython.sh

echo "Creating /env directory and moving to it"
mkdir env && cd /env

echo "Saving VERSION environment variable to text file for later"
echo ${VERSION} > version && chmod +rw version