#!/bin/bash

# Reemplazar la URL de la API en el archivo app.js
API_URL=${API_URL:-http://localhost:5000}
sed -i "s|http://localhost:5000|$API_URL|g" /usr/share/nginx/html/app.js

# Iniciar Nginx
exec "$@"
