# # Node v14 image for building the site
# FROM node:14 AS builder
# WORKDIR /app
# # Install all dependacies before building for better caching
# COPY /package.json .
# RUN npm install
# # Build the site and move to /build for easier retriaval in runtime
# COPY . .
# RUN npm run release && \
#   mkdir /build && \
#   mv /app/build/release*/public/* /build

# Nginx runtime, alpine-slim for minimal image size
FROM nginx:stable-alpine-slim AS runtime
# Copy nginx configuration so the image is self-sufficient and not dependant on docker-compose
COPY nginx/nginx.conf /etc/nginx/nginx.conf
# # Copy compiled site from the builder
# COPY --from=builder /build /usr/share/nginx/html
COPY dist /usr/share/nginx/html
# Run nginx in attached mode
CMD ["nginx", "-g", "daemon off;"]
