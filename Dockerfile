# Stage 1: Build the Angular application
FROM node:latest as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --prod

# Stage 2: Serve the application with Nginx server
FROM nginx:alpine
COPY --from=build /app/dist/ /usr/share/nginx/html
