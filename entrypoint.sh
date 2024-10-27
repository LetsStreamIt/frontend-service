#!/bin/sh

find /usr/share/nginx/html -type f -name '*.js' -exec sed -i "s|VITE_PROFILE_SERVICE_HOSTNAME_PLACEHOLDER|${VITE_PROFILE_SERVICE_HOSTNAME}|g" {} \;
find /usr/share/nginx/html -type f -name '*.js' -exec sed -i "s|VITE_PROFILE_SERVICE_PORT_PLACEHOLDER|${VITE_PROFILE_SERVICE_PORT}|g" {} \;
find /usr/share/nginx/html -type f -name '*.js' -exec sed -i "s|VITE_AUTH_SERVICE_HOSTNAME_PLACEHOLDER|${VITE_AUTH_SERVICE_HOSTNAME}|g" {} \;
find /usr/share/nginx/html -type f -name '*.js' -exec sed -i "s|VITE_AUTH_SERVICE_PORT_PLACEHOLDER|${VITE_AUTH_SERVICE_PORT}|g" {} \;
find /usr/share/nginx/html -type f -name '*.js' -exec sed -i "s|VITE_SESSION_SERVICE_HOSTNAME_PLACEHOLDER|${VITE_SESSION_SERVICE_HOSTNAME}|g" {} \;
find /usr/share/nginx/html -type f -name '*.js' -exec sed -i "s|VITE_SESSION_SERVICE_PORT_PLACEHOLDER|${VITE_SESSION_SERVICE_PORT}|g" {} \;
find /usr/share/nginx/html -type f -name '*.js' -exec sed -i "s|VITE_YOUTUBE_API_KEY_PLACEHOLDER|${VITE_YOUTUBE_API_KEY}|g" {} \;

# Start Nginx
exec "$@"
