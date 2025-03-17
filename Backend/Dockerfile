FROM node:18-alpine

# Crear directorio de trabajo
WORKDIR /usr/src/app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto de los archivos
COPY . .

# Exponer el puerto de la API
EXPOSE 5000

# Iniciar la aplicación
CMD ["node", "server.js"]
