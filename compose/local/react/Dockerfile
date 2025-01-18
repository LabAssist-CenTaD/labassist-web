# Step 1: Build the React app
FROM node:18-alpine AS build

ARG VITE_API_ENDPOINT
ENV VITE_API_ENDPOINT=${VITE_API_ENDPOINT}

WORKDIR /app

COPY package.json .

RUN npm install

RUN npm list engine.io-client

COPY . .

RUN npm run build

# Step 2: Serve the built files with Nginx
FROM nginx:latest

# Copy the built files from the previous step
COPY --from=build /app/dist /usr/share/nginx/html

# Copy a custom Nginx configuration if needed
COPY ./compose/local/nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Expose the port where Nginx will be listening
EXPOSE 80

# Copy .env file and shell script to container
WORKDIR /usr/share/nginx/html
COPY ./compose/local/react/env.sh .
COPY .env .

# Ensure fonts are available
RUN chmod 644 /usr/share/nginx/html/assets/Aeonik-Regular-CE8GIAc9.woff2

# Make our shell script executable
RUN chmod +x env.sh

# Start Nginx server
CMD ["/bin/sh", "-c", "/usr/share/nginx/html/env.sh && nginx -g \"daemon off;\""]
