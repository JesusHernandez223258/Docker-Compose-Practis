FROM nginx:alpine

# Eliminar la configuración predeterminada de Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copiar todos los archivos del frontend
COPY . /usr/share/nginx/html/

# Configuración adicional de Nginx para SPA
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponer el puerto 80
EXPOSE 80

# Comando para sustituir la URL de la API en tiempo de ejecución
RUN apk add --no-cache bash
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Iniciar nginx
ENTRYPOINT ["/entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]