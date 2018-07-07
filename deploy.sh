#!/bin/bash

# Stops the script, if an error occurred.
set -e

rm -rf node_modules && rm -rf package-lock.json

npm install

serverless deploy
