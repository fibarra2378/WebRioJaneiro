# Production Dockerfile for WebRioJaneiro static web application
FROM nginx:alpine

# Copy web application static files to Nginx web root
COPY . /usr/share/nginx/html

# Expose HTTP port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
