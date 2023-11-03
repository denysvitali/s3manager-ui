#!/bin/sh

# Rewrite config.json with environment variables
envsubst < /usr/share/nginx/html/config.json.template > /usr/share/nginx/html/config.json
/docker-entrypoint.sh "$@"