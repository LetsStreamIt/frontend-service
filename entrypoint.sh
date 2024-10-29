#!/bin/sh

find /usr/share/nginx/html -type f -name '*.js' -exec sed -i "s|VITE_YOUTUBE_API_KEY_PLACEHOLDER|${VITE_YOUTUBE_API_KEY}|g" {} \;

envsubst '\
    \${PROFILE_SERVICE_HOSTNAME} \${PROFILE_SERVICE_PORT} \
    \${AUTH_SERVICE_HOSTNAME} \${AUTH_SERVICE_PORT} \
    \${SESSION_SERVICE_HOSTNAME} \${SESSION_SERVICE_PORT} \
    \${YOUTUBE_API_KEY}' < /etc/nginx/conf.d/nginx.conf.template > /etc/nginx/nginx.conf

# Start Nginx
exec "$@"
