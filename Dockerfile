# Fase de Construcción
FROM node:20 AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . ./
RUN npm run build

# Fase de Servidor
FROM nginx:alpine
COPY --from=build /app/dist/angular15-shopping-cart-add /usr/share/nginx/html
EXPOSE 80